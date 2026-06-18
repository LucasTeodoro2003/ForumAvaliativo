"use server";

import { revalidatePath } from "next/cache";
import { User } from "../../../prisma/generate/client";
import { prisma } from "./prisma";

export default async function CreateProducts(
  formProducts: FormData,
  user: User,
) {
  try {
    await prisma.products.create({
      data: {
        category: formProducts.get("categoria")?.toString() || "",
        description: formProducts.get("descricao")?.toString() || "",
        name: formProducts.get("nome")?.toString() || "",
        valor: formProducts.get("valor")?.toString() || "",
        userid: user.id,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Erro ao criar Produtos", error);
    throw new Error("Erro ao criar Produtos");
  }
}
