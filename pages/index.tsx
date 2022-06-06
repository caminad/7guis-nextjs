import type { NextPage } from 'next'
import Head from 'next/head'
import Counter from '../components/Counter'
import FlightBooker from '../components/FlightBooker'
import TemperatureConverter from '../components/TemperatureConverter'

function ExtLink(props: { href: string; children: React.ReactNode }) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  )
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>7GUIs in Next.js</title>
      </Head>

      <main>
        <header>
          <h1>
            <ExtLink href="https://eugenkiss.github.io/7guis/">7GUIs</ExtLink>{' '}
            built with <ExtLink href="https://nextjs.org">Next.js</ExtLink> and{' '}
            <ExtLink href="https://picocss.com">Pico.css</ExtLink>
          </h1>
        </header>

        <section>
          <h2>Counter</h2>
          <Counter />
          <p>
            <ExtLink href="https://eugenkiss.github.io/7guis/tasks#counter">
              Counter task
            </ExtLink>
          </p>
        </section>

        <section>
          <h2>Temperature Converter</h2>
          <TemperatureConverter />
          <p>
            <ExtLink href="https://eugenkiss.github.io/7guis/tasks#temp">
              Temperature Converter task
            </ExtLink>
          </p>
        </section>

        <section>
          <h2>Flight Booker</h2>
          <FlightBooker />
          <p>
            <ExtLink href="https://eugenkiss.github.io/7guis/tasks#flight">
              Flight Booker task
            </ExtLink>
          </p>
        </section>
      </main>

      <footer>
        <p>
          <ExtLink href="https://github.com/caminad/7guis-nextjs">
            Source code
          </ExtLink>
        </p>
      </footer>
    </>
  )
}

export default Home
