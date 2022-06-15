import '../styles/main.scss'

interface WrapperProps {
  readonly children: React.ReactNode
}
// ts-prune-ignore-next
export function Wrapper(props: WrapperProps) {
  return <main>{props.children}</main>
}
