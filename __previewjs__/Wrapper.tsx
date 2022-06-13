import '../styles/main.scss'

interface WrapperProps {
  readonly children: React.ReactNode
}
export function Wrapper(props: WrapperProps) {
  return <main>{props.children}</main>
}
