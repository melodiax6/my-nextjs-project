import { Suspense } from 'react';
import Recipes from './Recipes';

export default function Page() {
  return (
    <Suspense>
      <Recipes />
    </Suspense>
  );
}
