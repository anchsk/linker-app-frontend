import React from 'react'

import { ReactComponent as X } from '../../assets/images/X.svg'

const Icon = ({ variant }) => {
  return <>{variant === 'close' && <X />}</>
}

export default Icon
