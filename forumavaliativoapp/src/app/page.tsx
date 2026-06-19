import { auth } from "@/shared/lib/auth";
import { headers } from "next/dist/server/request/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  } else {
    redirect("/produtos");
  }
}
