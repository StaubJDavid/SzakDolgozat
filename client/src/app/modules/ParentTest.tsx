import {FC} from 'react'
import { ChildTest } from './ChildTest';

type Props = {
  className: string
}

const ParentTest: FC = () => {
  function handleSearch(page:number) {
    console.log(`How many children has to die: ${page}`);
  }

  return (
    <div>
      <ChildTest passedFc={handleSearch} />
    </div>
  )
}

export {ParentTest}
