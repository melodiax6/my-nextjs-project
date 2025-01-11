
import Recipes from './Recipes';

type Params = {
  searchParams: {[key: string]: string}
}


export default function Page({searchParams}: Params) {
  return (
   <Recipes kind={searchParams.kind ?? null} />
  );
}
