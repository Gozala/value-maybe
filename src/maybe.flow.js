/* @flow */

export type Nothing
  = void
  | null

export type Just <value>
  = value

export type Maybe <value>
  = Nothing
  | Just<value>

export type map = <a, b>
  (f:(a:a) => b, a:Maybe<a>) => Maybe<b>

export type withDefault = <a>
  (fallback:a, a:Maybe<a>) => Maybe<a>

export type oneOf = <a>
  (options:Array<Maybe<a>>) =>
  Maybe<a>

export type chain = <a, b>
  (a:Maybe<a>, then:(a:Maybe<a>) => Maybe<b>) =>
  Maybe<b>
