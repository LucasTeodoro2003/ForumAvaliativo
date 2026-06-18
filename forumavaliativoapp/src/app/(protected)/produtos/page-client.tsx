"use client";

import { Card, CardContent } from "@/shared/components/ui/card";
import { Products, User } from "../../../../prisma/generate/client";
import MenuBarProducts from "../../../components/ui/products/menuProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/navigation";

interface ProductsPageClientProps {
  user: User;
  products: Products[];
}

export default function ProductsPageClient({
  user,
  products,
}: ProductsPageClientProps) {
  const router = useRouter();
  return (
    <>
      <div className="">
        <MenuBarProducts />
      </div>
      <div>
        {products.length !== 0 ? (
          products.map((produto) => (
            <>
              <Card className="w-full max-w-md" key={produto.id}>
                <CardContent className="space-y-3 p-6">
                  <h2 className="text-xl font-semibold">{produto.name}</h2>

                  <p className="text-sm text-muted-foreground">
                    {produto.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{produto.category}</Badge>

                    <span className="text-lg font-bold">
                      R$ {Number(produto.valor).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
              ;
            </>
          ))
        ) : (
          <div>Nenhum Produto Cadastrado</div>
        )}
      </div>
      <div>
        <Button onClick={() => router.push("/criarProdutos")}>
          Cadastrar Produto +
        </Button>
      </div>
    </>
  );
}
