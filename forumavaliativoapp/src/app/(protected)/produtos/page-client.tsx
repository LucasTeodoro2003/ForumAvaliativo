"use client";

import { Card, CardContent } from "@/shared/components/ui/card";
import { Products, User } from "../../../../prisma/generate/client";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/shared/components/ui/spinner";
import { SquareArrowRightEnterIcon } from "lucide-react";
import { authClient } from "@/shared/lib/auth-client";

interface ProductsPageClientProps {
  user: User;
  products: Products[];
}

export default function ProductsPageClient({
  user,
  products,
}: ProductsPageClientProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleCreate() {
    setLoading(true);
    try {
      router.replace("/criarProdutos");
    } catch (error) {
      toast.error("Erro ao redicionar");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await authClient.signOut();
      toast.success("Logout realizado com sucesso");
      router.replace("/login");
    } catch (error) {
      toast.error("Erro ao deslogar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between p-6 md:p-10 w-full max-w-4xl mx-auto bg-black text-white">
        <div className="text-lg font-semibold mr-7">
          Bem vindo(a), {user.name}!
        </div>
        <Button
          className="bg-red-600 text-black hover:bg-red-300"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <SquareArrowRightEnterIcon className="mr-2 h-4 w-4" />
              Sair
            </>
          )}
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 p-6 md:p-10">
        {products.length !== 0 ? (
          products.map((produto) => (
            <Card className="w-full max-w-md" key={produto.id}>
              <CardContent className="flex items-center gap-4 p-6">
                <img
                  src={produto.image || "/produtos.jpeg"}
                  alt={produto.name}
                  className="size-16 rounded-full object-cover shrink-0"
                />

                <div className="flex-1 grid gap-1">
                  <h2 className="text-lg font-semibold leading-tight">
                    {produto.name}
                  </h2>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {produto.description}
                  </p>

                  <div className="flex items-center gap-3 pt-1">
                    <Badge
                      variant="outline"
                      className="text-xs bg-blue-700 text-white"
                    >
                      {produto.category}
                    </Badge>
                    <span className="text-base font-bold">
                      R$ {Number(produto.valor).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>Nenhum Produto Cadastrado</div>
        )}
      </div>
      <div className="flex items-center justify-center p-6 md:p-10">
        <Button onClick={handleCreate} disabled={loading}>
          {loading ? <Spinner /> : "Cadastrar Produto +"}
        </Button>
      </div>
    </>
  );
}
