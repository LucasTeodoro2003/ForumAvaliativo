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
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export function LoginForm({
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

    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: (ctx) => {
          router.replace("/produtos");
          toast.success("Sessão iniciada com Sucesso!");
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error("Erro ao iniciar sessão", {
            description: ctx.error.message,
          });
          console.error(ctx.error.message);
          // alert(ctx.error.message);
          setLoading(false);
        },
      },
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSignIn}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Bem-vindo!</h1>
                <p className="text-balance text-muted-foreground">
                  Entre com Email e Senha para Continuar
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  name="email"
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
                <Button type="submit" disabled={loading}>{!loading ? "Entrar" : <Spinner className="h-6"/>}</Button>
              </Field>
              <FieldDescription className="text-center">
                Não tem conta? <Link href={"/cadastro"} prefetch replace>Cadastre-se</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/produtos.jpeg"
              alt="ImageHome"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
