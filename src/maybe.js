/* @flow */

/*::
import type {Maybe} from "./maybe.flow"
*/


export const map = /*::<a, b>*/
  (f/*:(a:a) => b*/, a/*:Maybe<a>*/)/*:Maybe<b>*/ =>
  ( a == null
  ? null
  : f(a)
  );

export const chain = /*::<a, b>*/
  (then/*:(a:a) => Maybe<b>*/, a/*:a*/)/*:Maybe<b>*/ =>
  ( a == null
  ? null
  : then(a)
  );

export const withDefault = /*::<a>*/
  (fallback/*:a*/, a/*:Maybe<a>*/)/*:a*/ =>
  ( a == null
  ? fallback
  : a
  );

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
