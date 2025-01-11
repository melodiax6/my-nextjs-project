
import Recipes from './Recipes';


export default function Page({params}: {params: {kind: "meat"| "sweet"|"vege"}}) {

  return (
   <Recipes kind={params.kind} />
  );
}
