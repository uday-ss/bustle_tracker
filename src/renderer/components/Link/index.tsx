import { Link as MUILink, LinkProps as LinkBaseType } from '@mui/material'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { remote } = window

const BS_PORTAL = ''
export interface LinkProps extends LinkBaseType {
  // eslint-disable-next-line react/require-default-props
  to?: string
}

export const Link = (props: LinkProps) => {
  const { to = '' } = props
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MUILink onClick={() => remote.shell.openExternal(`${BS_PORTAL + to}`)} {...props} />
}
