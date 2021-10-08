import {FC} from 'react'

type Props = {
  searchString: string
}

const SearchContent: FC<Props> = ({searchString}) => {

  return (
    <div>
      {searchString}
    </div>
  )
}

export {SearchContent}
