"use server";

import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProdutosPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
        id: session.user.id
    }
  })

  const products = await prisma.products.findMany({
    where: {
        userid: user?.id
    }
  })

  
}
