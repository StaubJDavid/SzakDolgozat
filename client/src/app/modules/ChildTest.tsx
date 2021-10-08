import {FC} from 'react'

type Props = {
  passedFc: any
}

const ChildTest: FC<Props> = ({passedFc}) => {

  return (
    <div>
      <button onClick={() => passedFc(1)}>1</button>
      <button onClick={() => passedFc(2)}>2</button>
      <button onClick={() => passedFc(3)}>3</button>
    </div>
  )
}

export {ChildTest}
