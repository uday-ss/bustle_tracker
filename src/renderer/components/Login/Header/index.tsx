import LoginBustleIcon from '../../../../../assets/images/loginBustleIcon.png'
import { Wrapper, Image } from './index.styled'

function Header() {
  return (
    <Wrapper>
      <Image src={LoginBustleIcon} alt='logo' />
    </Wrapper>
  )
}

export default Header
