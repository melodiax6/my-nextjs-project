
import Recipes from './Recipes';


export default async function Page({params}: {params: {kind?: "meat"| "sweet"|"vege"}}) {
  return (
   <Recipes kind={params.kind ?? null} />
  );
}
