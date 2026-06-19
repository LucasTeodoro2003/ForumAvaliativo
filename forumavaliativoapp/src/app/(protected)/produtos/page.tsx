"use server";

import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProductsPageClient from "./page-client";
import { User } from "../../../../prisma/generate/client";

export default async function ProdutosPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = (await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  })) as User;

  const products = await prisma.products.findMany({
    where: {
      userid: user?.id,
    },
  });

  return <ProductsPageClient products={products} user={user} />;
}
