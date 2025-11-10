import LieuComposant from "@/components/ui/lieuxComponent";
import { prisma } from "@/lib/db";

export default async function Page() {
  const lieu = await prisma.lieux.findFirst({});
  if (!lieu) {
    return <div>Aucun lieu trouvé</div>;
  }
  const lieuPlain = {
    ...lieu,
    latitude: lieu.latitude.toNumber(),
    longitude: lieu.longitude.toNumber(),
  };
  const apiKey = process.env.API_KEY_MAPS;
  if(!apiKey){
    return (
      <>
      <h1>pas de token</h1>
      </>
    )
  }

  return (
    <>
      <LieuComposant lieu={lieuPlain || null} apiKey={apiKey } />
    </>
  );
}
