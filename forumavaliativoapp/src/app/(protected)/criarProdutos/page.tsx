"use server";

import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CreateProductFormClient from "./page-client";
import { User } from "../../../../prisma/generate/client";

export default async function CriarProdutosPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }
  

  const user = (await prisma.user.findUnique({
    where: {
      id: session.user.id || "",
    },
  })) as User;

  return <CreateProductFormClient user={user} />;
}