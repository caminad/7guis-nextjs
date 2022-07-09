export interface Person {
  readonly _id: number
  readonly givenName: string
  readonly familyName: string
}
export function Person(): Person {
  return {
    _id: -1,
    givenName: '',
    familyName: '',
  }
}
Person.test = function (p: Person, s: string): boolean {
  return (
    p.familyName.toLocaleLowerCase().includes(s.toLocaleLowerCase()) ||
    p.givenName.toLocaleLowerCase().includes(s.toLocaleLowerCase())
  )
}
Person.cmp = function (a: Person, b: Person): number {
  return (
    a.familyName.localeCompare(b.familyName) ||
    a.givenName.localeCompare(b.givenName)
  )
}
