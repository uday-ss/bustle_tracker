import React from 'react'

import { loginContents } from 'renderer/contents/screens/login'
import { Message, Wrapper } from './index.styled'

function Footer() {
  return (
    <Wrapper>
      <Message>{loginContents.letsStart}</Message>
    </Wrapper>
  )
}

export default Footer
