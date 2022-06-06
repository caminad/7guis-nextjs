import '@picocss/pico'

export function Wrapper(props: { children: React.ReactNode }) {
  return <main className="container">{props.children}</main>
}
