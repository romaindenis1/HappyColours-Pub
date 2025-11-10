// app/formules/page.tsx
import Formule from "@/components/ui/formule";
import { formules } from "@/generated/prisma";
import { prisma } from "@/lib/db";

export default async function Page() {
  const rows = await prisma.formules.findMany({ orderBy: { id: "asc" } });
  const formules: formules[] = JSON.parse(JSON.stringify(rows));
  return <Formule formules={formules} />;
}
