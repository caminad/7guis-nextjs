export interface ActionWithoutPayload<Type extends string> {
  readonly type: Type
}
export interface Action<Type extends string, Payload> {
  readonly type: Type
  readonly payload: Payload
}
export function Action<Type extends string>(
  type: Type
): ActionWithoutPayload<Type>
export function Action<Type extends string, Payload>(
  type: Type,
  payload: Payload
): Action<Type, Payload>
export function Action(type: string, payload?: unknown) {
  if (typeof payload === 'undefined') {
    return { type }
  }
  return { type, payload }
}
