export interface Action<Type extends string, Payload = undefined> {
  readonly type: Type
  readonly payload: Payload
}
export function Action<Type extends string>(type: Type): Action<Type>
export function Action<Type extends string, Payload>(
  type: Type,
  payload: Payload
): Action<Type, Payload>
export function Action(
  type: string,
  payload?: unknown
): Action<string, unknown> {
  return { type, payload }
}
