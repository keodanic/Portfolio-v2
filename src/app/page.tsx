import { redirect } from "next/navigation";

// Redireciona para o locale padrão (pt)
export default function RootPage() {
  redirect("/en");
}
