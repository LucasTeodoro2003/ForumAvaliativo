"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { User } from "../../../../prisma/generate/client";

interface CreateProductFormProps {
  user: User;
}

export default function CreateProductForm({ user }: CreateProductFormProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    const formProducts = new FormData();

    formProducts.append("nome", nome);
    formProducts.append("descricao", descricao);
    formProducts.append("categoria", categoria);
    formProducts.append("valor", valor);

    if (image) {
      formProducts.append("image", image);
    }

    console.log({
      nome,
      descricao,
      categoria,
      valor,
      image,
    });

    try {
      await CreateProductForm(formProducts, user);
    } catch (err) {
      console.error("Erro ao criar Produto", err);
      toast.error("Erro ao criar Produto!");
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <h1 className="text-2xl font-bold">Cadastrar Produto</h1>

          <FieldGroup>
            <Field>
              <FieldLabel>Nome</FieldLabel>
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome do produto"
                required
              />
            </Field>

            <Field>
              <FieldLabel>Descrição</FieldLabel>
              <Input
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição do produto"
                required
              />
            </Field>

            <Field>
              <FieldLabel>Categoria</FieldLabel>
              <Input
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                placeholder="Categoria"
                required
              />
            </Field>

            <Field>
              <FieldLabel>Valor</FieldLabel>
              <Input
                type="number"
                step="0.01"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="0,00"
                required
              />
            </Field>

            <Field>
              <FieldLabel>Imagem</FieldLabel>

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Field>

            {preview && (
              <div className="space-y-2">
                <Badge variant="secondary">Pré-visualização</Badge>

                <Image
                  src={preview}
                  alt="Imagem do produto"
                  width={250}
                  height={250}
                  className="rounded-lg object-cover border"
                />
              </div>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? "Cadastrar Produto" : <Spinner />}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
