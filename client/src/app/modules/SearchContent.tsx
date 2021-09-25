/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, FC} from 'react'

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
