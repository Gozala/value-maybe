/* @flow */

import test from "tape"
import * as Maybe from ".."


test("nothing", test => {
  test.isEqual
  ( Maybe.nothing()
  , null
  )

  test.end()
})

test("just", test => {
  test.isEqual
  ( Maybe.just(14)
  , 14
  )

  const foo = { bar: 1 }
  test.isEqual
  ( Maybe.just(foo)
  , foo
  )

  test.end()
})

test("isNothing", test => {
  test.isEqual
  ( Maybe.isNothing(null)
  , true
  )
  test.isEqual
  ( Maybe.isNothing(void(0))
  , true
  )

  test.isEqual
  ( Maybe.isNothing(false)
  , false
  )

  test.isEqual
  ( Maybe.isNothing('')
  , false
  )

  test.isEqual
  ( Maybe.isNothing(0)
  , false
  )

  test.end()
})

test("isJust", test => {
  test.isEqual
  ( Maybe.isJust(null)
  , false
  )
  test.isEqual
  ( Maybe.isJust(void(0))
  , false
  )

  test.isEqual
  ( Maybe.isJust(false)
  , true
  )

  test.isEqual
  ( Maybe.isJust('')
  , true
  )

  test.isEqual
  ( Maybe.isJust(0)
  , true
  )

  test.end()
})

test("withDefault", test => {
  test.isEqual
  ( Maybe.withDefault(100, Maybe.just(42))
  ,  42
  )

  test.isEqual
  ( Maybe.withDefault(100, 0)
  , 0
  )

  test.isEqual
  ( Maybe.withDefault(100, Maybe.nothing())
  , 100
  )

  test.isEqual
  ( Maybe.withDefault(100, void(0))
  , 100
  )

  test.isEqual
  ( Maybe.withDefault(100, null)
  , 100
  )


  test.end()
})

test("map", test => {
  test.isEqual
  ( Maybe.map(x => x + 1, Maybe.nothing())
  , Maybe.nothing()
  )

  test.isEqual
  ( Maybe.map(x => x + 1, null)
  , null
  )

  test.isEqual
  ( Maybe.map(x => x + 1, void(0))
  , void(0)
  )

  test.isEqual
  ( Maybe.map(x => x + 1, 0)
  , Maybe.just(1)
  )

  test.isEqual
  ( Maybe.map(text => text.toUpperCase(), 'hello')
  , 'HELLO'
  )

  test.end()
})

test("oneOf", test => {
  test.isEqual
  ( Maybe.oneOf
    ( [ Maybe.nothing()
      , Maybe.just(42)
      , Maybe.just(71)
      ]
    )
  , 42
  )

  test.isEqual
  ( Maybe.oneOf
    ( [ Maybe.nothing()
      , Maybe.nothing()
      , Maybe.just(71)
      ]
    )
  , 71
  )

  test.isEqual
  ( Maybe.oneOf
    ( [ Maybe.nothing()
      , Maybe.nothing()
      , Maybe.nothing()
      ]
    )
  , Maybe.nothing()
  )

  test.end()
})



test("chain", test => {
  const readField = (name/*:string*/, tree/*:{}*/) =>
    ( tree[name] == null
    ? Maybe.nothing()
    : Maybe.just(tree[name])
    )

  const readPath = ([first, ...rest], tree) =>
    ( rest.length === 0
    ? readField(first, tree)
    : Maybe.chain
      ( readField(first, tree)
      , branch => readPath(rest, branch)
      )
    )

  test.isEquivalent
  ( readPath
    ( ["Users", "gozala", "Documents"]
    , {"Users": {"gozala": {"Documents": ["maybe.js"]}}}
    )
  , ["maybe.js"]
  )

  test.isEqual
  ( readPath
    ( ["Users", "Dave", "stuff"]
    , {"Users": {"gozala": {"Documents": ["maybe.js"]}}}
    )
  , Maybe.nothing()
  )

  test.end()
})
