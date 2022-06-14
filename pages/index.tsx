import Head from 'next/head'
import CircleDrawer from '../components/CircleDrawer/CircleDrawer'
import Counter from '../components/Counter/Counter'
import Crud from '../components/Crud/Crud'
import FlightBooker from '../components/FlightBooker/FlightBooker'
import TemperatureConverter from '../components/TemperatureConverter/TemperatureConverter'
import Timer from '../components/Timer/Timer'

const ext = { target: '_blank', rel: 'noreferrer' } as const

export default function Home() {
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
            <a href="https://eugenkiss.github.io/7guis/" {...ext}>
              7GUIs
            </a>{' '}
            tasks built with{' '}
            <a href="https://nextjs.org" {...ext}>
              Next.js
            </a>{' '}
            and{' '}
            <a href="https://picocss.com" {...ext}>
              Pico.css
            </a>
          </h1>
        </header>

        <section id="counter">
          <h2>Counter</h2>
          <Counter />
          <p>
            <a href="https://eugenkiss.github.io/7guis/tasks#counter" {...ext}>
              Counter task
            </a>
          </p>
        </section>

        <section id="temp">
          <h2>Temperature Converter</h2>
          <TemperatureConverter />
          <p>
            <a href="https://eugenkiss.github.io/7guis/tasks#temp" {...ext}>
              Temperature Converter task
            </a>
          </p>
        </section>

        <section id="flight">
          <h2>Flight Booker</h2>
          <FlightBooker />
          <p>
            <a href="https://eugenkiss.github.io/7guis/tasks#flight" {...ext}>
              Flight Booker task
            </a>
          </p>
        </section>

        <section id="timer">
          <h2>Timer</h2>
          <Timer />
          <p>
            <a href="https://eugenkiss.github.io/7guis/tasks#timer" {...ext}>
              Timer task
            </a>
          </p>
        </section>

        <section id="crud">
          <h2>CRUD</h2>
          <Crud />
          <p>
            <a href="https://eugenkiss.github.io/7guis/tasks#crud" {...ext}>
              CRUD task
            </a>
          </p>
        </section>

        <section id="circle">
          <h2>Circle Drawer</h2>
          <CircleDrawer />
          <p>
            <a href="https://eugenkiss.github.io/7guis/tasks#circle" {...ext}>
              Circle Drawer task
            </a>
          </p>
        </section>
      </main>

      <footer>
        <p>
          <a href="https://github.com/caminad/7guis-nextjs" {...ext}>
            Source code
          </a>
        </p>
      </footer>
    </>
  )
}
