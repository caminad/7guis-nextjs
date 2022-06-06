import '../styles/main.scss'

export function Wrapper(props: { children: React.ReactNode }) {
  return <main>{props.children}</main>
}
