
import Recipes from './Recipes';

type Params = {
  params: {kind?: string}
}


export default function Page({params}: Params) {
  return (
   <Recipes kind={params.kind ?? null} />
  );
}
