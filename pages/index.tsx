import type { NextPage } from 'next'
import Head from 'next/head'
import Counter from '../components/Counter'

const ExternalLink = (props: { href: string; children: React.ReactNode }) => (
  <a
    href={props.href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:underline"
  >
    {props.children}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block h-5 w-5 align-top"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
    </svg>
  </a>
)

const Heading = (props: { children: React.ReactNode }) => (
  <h1 className="border-b pb-1 text-center text-3xl font-bold">
    {props.children}
  </h1>
)

const SubHeading = (props: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold">{props.children}</h2>
)

const Home: NextPage = () => {
  return (
    <main className="flex flex-col gap-4 p-4">
      <Head>
        <title>7GUIs in Next.js</title>
      </Head>

      <Heading>
        <ExternalLink href="https://eugenkiss.github.io/7guis/">
          7GUIs
        </ExternalLink>{' '}
        in Next.js
      </Heading>

      <SubHeading>
        <ExternalLink href="https://eugenkiss.github.io/7guis/tasks#counter">
          Counter
        </ExternalLink>
      </SubHeading>

      <Counter />
    </main>
  )
}

export default Home
