
import Recipes from './Recipes';

type Params = {
  params: {kind?: "meat"| "sweet"|"vege"}
}


export default function Page({params}: Params) {
  return (
   <Recipes kind={params.kind ?? null} />
  );
}
