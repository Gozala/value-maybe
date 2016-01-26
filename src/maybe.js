/* @flow */

/*::
import type {Maybe, Just, Nothing} from "./maybe"
export type {Maybe, Just, Nothing}
*/

export const nothing =
  ()/*:Nothing*/ =>
  null


export const just = /*::<a>*/
  (value/*:a*/)/*:Just<a>*/ =>
  value

export const isNothing = /*::<a>*/
  (value/*:Maybe<a>*/)/*:boolean*/ =>
  ( value == null
  ? true
  : false
  )

export const isJust = /*::<a>*/
  (value/*:Maybe<a>*/)/*:boolean*/ =>
  ( value == null
  ? false
  : true
  )

export const withDefault = /*::<a>*/
  (fallback/*:a*/, a/*:Maybe<a>*/)/*:a*/ =>
  ( a == null
  ? fallback
  : a
  )


export const map = /*::<a, b>*/
  (f/*:(a:a) => b*/, a/*:Maybe<a>*/)/*:Maybe<b>*/ =>
  ( a == null
  ? a
  : f(a)
  )

export const chain = /*::<a, b>*/
  (a/*:a*/, then/*:(a:a) => Maybe<b>*/)/*:Maybe<b>*/ =>
  ( a == null
  ? a
  : then(a)
  )

export const oneOf = /*::<a>*/
  (maybes/*:Array<Maybe<a>>*/)/*:Maybe<a>*/ => {
    const count = maybes.length
    let index = 0
    while (index < count) {
      const a = maybes[index]
      if (a != null) {
        return a
      }
      index = index + 1
    }
    return null
  }
