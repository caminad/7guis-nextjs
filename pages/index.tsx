import type { NextPage } from 'next'
import Head from 'next/head'
import CircleDrawer from '../components/CircleDrawer'
import Counter from '../components/Counter'
import Crud from '../components/Crud'
import FlightBooker from '../components/FlightBooker'
import TemperatureConverter from '../components/TemperatureConverter'
import Timer from '../components/Timer'

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
        <title>7GUIs</title>
        <meta
          name="description"
          content="7GUIs tasks built with Next.js and Pico.css"
        />
      </Head>

      <main>
        <header>
          <h1>
            <ExtLink href="https://eugenkiss.github.io/7guis/">7GUIs</ExtLink>{' '}
            tasks built with{' '}
            <ExtLink href="https://nextjs.org">Next.js</ExtLink> and{' '}
            <ExtLink href="https://picocss.com">Pico.css</ExtLink>
          </h1>
        </header>

        <section id="counter">
          <h2>Counter</h2>
          <Counter />
          <p>
            <ExtLink href="https://eugenkiss.github.io/7guis/tasks#counter">
              Counter task
            </ExtLink>
          </p>
        </section>

        <section id="temp">
          <h2>Temperature Converter</h2>
          <TemperatureConverter />
          <p>
            <ExtLink href="https://eugenkiss.github.io/7guis/tasks#temp">
              Temperature Converter task
            </ExtLink>
          </p>
        </section>

        <section id="flight">
          <h2>Flight Booker</h2>
          <FlightBooker />
          <p>
            <ExtLink href="https://eugenkiss.github.io/7guis/tasks#flight">
              Flight Booker task
            </ExtLink>
          </p>
        </section>

        <section id="timer">
          <h2>Timer</h2>
          <Timer />
          <p>
            <ExtLink href="https://eugenkiss.github.io/7guis/tasks#timer">
              Timer task
            </ExtLink>
          </p>
        </section>

        <section id="crud">
          <h2>CRUD</h2>
          <Crud />
          <p>
            <ExtLink href="https://eugenkiss.github.io/7guis/tasks#crud">
              CRUD task
            </ExtLink>
          </p>
        </section>

        <section id="circle">
          <h2>Circle Drawer</h2>
          <CircleDrawer />
          <p>
            <ExtLink href="https://eugenkiss.github.io/7guis/tasks#circle">
              Circle Drawer task
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
