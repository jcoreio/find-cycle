# find-cycle

[![Build Status](https://travis-ci.org/jcoreio/find-cycle.svg?branch=master)](https://travis-ci.org/jcoreio/find-cycle)
[![Coverage Status](https://codecov.io/gh/jcoreio/find-cycle/branch/master/graph/badge.svg)](https://codecov.io/gh/jcoreio/find-cycle)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Searches for a cycle in a directed graph, and tells you the nodes in the
first cycle it finds.  Should work on your existing data structures
without conversion, because it operates on `Iterables` and a
`getConnectedNodes` adapter function that you provide.

The implementation is a depth-first search using a stack instead of
recursion, so it's not limited by the maximum call stack size.

# Compatibility

Your environment must support `Set`, `Map`, and `Symbol.iterator`
natively or via a polyfill.

**Node**: 4+

# Installation

```sh
npm install --save find-cycle
```

# API

## `findDirectedCycle(startNodes, getConnectedNodes)`

```js
const findDirectedCycle = require('find-cycle/directed')
```

### Arguments

#### `startNodes: Iterable<Node>`

The nodes to start the search from.  Your nodes may be of any primitive
or object type besides `null` or `undefined`.

#### `getConnectedNodes: (node: Node) => ?(Iterator<Node> | Iterable<Node>)`

Given a node in your directed graph, return the nodes connected to it as
an `Iterator` or `Iterable`.  You may return `null` or `undefined` if
there are no connected nodes.

### Returns: `?Array<Node>`

An array of nodes in the first cycle found, if any, including each node
in the cycle only once.

## Examples

### With Arrays

```js
const findCycle = require('find-cycle/directed')

const edges = {
  1: [2],
  2: [3],
  3: [4],
  4: [2, 5],
  5: [3],
  7: [8, 9],
  8: [1],
  9: [10, 11],
  10: [11],
  11: [9, 8],
}

const startNodes = [1]
const getConnectedNodes = node => edges[node]

expect(findCycle(startNodes, getConnectedNodes)).to.deep.equal([2, 3, 4])
```

### With Sets/Maps

```js
const findCycle = require('find-cycle/directed'
const edges = new Map([
  [1, new Set([2])],
  [2, new Set([3])],
  [3, new Set([4])],
  [4, new Set([2, 5])],
  [5, new Set([3])],
  [7, new Set([8, 9])],
  [8, new Set([1])],
  [9, new Set([10, 11])],
  [10, new Set([11])],
  [11, new Set([9, 8])],
])

const startNodes = new Set([1])
const getConnectedNodes = node => edges.get(node)

expect(findCycle(startNodes, getConnectedNodes)).to.deep.equal([2, 3, 4])
```
