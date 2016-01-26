# value-maybe [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]


This library provides facilities for managing optionals - situations where a value may be absent. Meaning:

  - There is a value, and it equals `x`.

or

  - There isn’t a value at all

In JS optionals (`null` and `undefined`) are ubiquitous and there for [flow][] type checker takes a creative approach (thas is very similar to [Swift's][Optionals in Swift]) at defining [maybe][flow maybe] type (as found in many functional languages) for handling optionals.

This library take's flow's definition of "Maybe" type and provides implementations for set APIs typically available for values of maybe type.

## Definition

#### `just` / `nothing`

You can think of optional values as `just(x)` or `nothing()` and that is why library exports `just` & `nothing` functions. Their existence is purely symbolic and serves nothing else but to communicate optional type of the value:

```js
Maybe.just(5) // => 5
Maybe.nothing() // => null
```

P.S: Obviously you could have used `5` and `null` (or `undefined`) instead.

### `isJust` / `isNothing`

```js
Maybe.isJust(null) // => false
Maybe.isJust(undefined) // => false
Maybe.isJust(0) // => true

Maybe.isNothing(null) // => true
Maybe.isNothing(undefined) // => true
Maybe.isNothing(0) // => false
```

#### `withDefault`

`withDefault` can be used to cast optional `value` into a guaranteed value by providing a default in case `value` is absent.

```js
Maybe.withDefault(100, Maybe.just(42)) // => 42
Maybe.withDefault(100, Maybe.nothing()) // => 100
```

#### `map`

`map` can be used to apply a function to optional `value` if it is available one. If `value` is `Nothing`, it will just propagate through:

```js
Maybe.map(x => x + 1, Maybe.nothing()) // => null
Maybe.map(x => x + 1, null) // => null
Maybe.map(x => x + 1, Maybe.just(5)) // => 6
Maybe.map(text => text.toUpperCase(), 'hello') // => 'HELLO'
```

#### `oneOf`

`oneOf` maybe used to pick the first maybe that actually has a `value`. Useful when you want to try a couple different things, but there is no default value:

```js
Maybe.oneOf([ Maybe.nothing(), Maybe.just(42), Maybe.just(71) ]) // =>  42
Maybe.oneOf([ Maybe.nothing(), Maybe.nothing(), Maybe.just(71) ]) // => 71
Maybe.oneOf([ Maybe.nothing(), Maybe.nothing(), Maybe.nothing() ]) // => null
```

#### `chain`

`chain` can be used to chain together multiple computations that return optional value:

```js
const readField = (name, record) =>
  ( record.hasOwnPropertyName(name)
  ? Maybe.just(record[name])
  : Maybe.nothing
  )

const readPath = ([first, ...rest], record) =>
  ( entries.length === 0
  ? record
  : readField(filst, record)
    .chain(record => readPath(rest, record))
  )

readPath
  ( ["Users", "gozala", "Documents"]
  , {"Users": {"gozala": {"Documents": ["maybe.js"]}}}
  ); // => ["maybe.js"]

readPath
  ( ["Users", "Dave", "stuff"]
  , {"Users": {"gozala": {"Documents": ["maybe.js"]}}}
  ); // => null
```


## Install

    npm install value-maybe

## Prior Art

- [Maybe in Haskell][]
- [Maybe in Elm][]
- [Option in Rust][]
- [Optionals in Swift][]

[npm-url]: https://npmjs.org/package/value-maybe
[npm-image]: https://img.shields.io/npm/v/value-maybe.svg?style=flat

[travis-url]: https://travis-ci.org/Gozala/value-maybe
[travis-image]: https://img.shields.io/travis/Gozala/value-maybe.svg?style=flat

[gitter-url]: https://gitter.im/Gozala/value-maybe?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg

[flow]:http://flowtype.org
[flow maybe]:http://flowtype.org/docs/nullable-types.html#_

[Option in Rust]:https://doc.rust-lang.org/std/option/
[Maybe in Elm]:http://package.elm-lang.org/packages/elm-lang/core/3.0.0/Maybe
[Maybe in Haskell]:http://learnyouahaskell.com/a-fistful-of-monads#getting-our-feet-wet-with-maybe
[Optionals in Swift]:https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID330
