"use client";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/shared/components/ui/spinner";

export function CreateLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const email = form.get("email")?.toString() || "";
    const password = form.get("password")?.toString() || "";
    const name = form.get("name")?.toString() || "";

    const { data, error } = await authClient.signUp.email(
      {
        email: email.toString(),
        password,
        name,
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          toast.success("Criado com sucesso!");
          router.replace("/");
          setLoading(false);
        },
        onError: (ctx: any) => {
          const error = ctx.error.message;
          let messageErro = "";
          if (error.includes("User already exists")) {
            messageErro = "Email já cadastrado!";
          } else if (error.includes("Password")) {
            messageErro = "Senha muito curta!";
          } else {
            messageErro = "Erro desconhecido";
          }
          toast.error("Erro ao criar conta!", { description: messageErro });
          setLoading(false)
        },
      },
    );
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <Card className="overflow-hidden p-0 w-full">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8" onSubmit={handleSignIn}>
            <FieldGroup className="w-full">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Cadastre-se</h1>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Digite seu email"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="name">Nome</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Digite seu nome"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                </div>
                <Input id="password" type="password" name="password" required />
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>
                  {" "}
                  {!loading ? "Entrar" : <Spinner />}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
