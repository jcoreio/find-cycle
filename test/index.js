const expect = require('chai').expect
const findDirectedCycle = require('../src/directed')

describe('directed', function () {
  it('returns an existing cycle', function () {
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

    expect(findDirectedCycle([1], (node) => edges[node])).to.deep.equal([
      2, 3, 4,
    ])
    expect(findDirectedCycle([1, 7], (node) => edges[node])).to.deep.equal([
      2, 3, 4,
    ])
    expect(findDirectedCycle([7], (node) => edges[node])).to.deep.equal([
      2, 3, 4,
    ])
    expect(findDirectedCycle([9], (node) => edges[node])).to.deep.equal([
      9, 10, 11,
    ])
  })
  it('finds a cycle from a node to itself', function () {
    const edges = {
      1: [2],
      2: [3],
      3: [3],
    }
    expect(findDirectedCycle([1], (node) => edges[node])).to.deep.equal([3])
  })
  it('allows getConnectedNodes to return an iterator', function () {
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

    function getConnectedNodes(node) {
      var iterator = edges[node][Symbol.iterator]()
      return { next: iterator.next.bind(iterator) }
    }

    expect(findDirectedCycle([1], getConnectedNodes)).to.deep.equal([2, 3, 4])
  })
  it('allows getConnectedNodes to return falsy', function () {
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
    }

    function getConnectedNodes(node) {
      return edges[node]
    }

    expect(findDirectedCycle([9, 1], getConnectedNodes)).to.deep.equal([
      2, 3, 4,
    ])
  })
  it('returns null when no cycle is reachable from the start nodes', function () {
    const edges = {
      1: [2],
      2: [3],
      3: [4],
      4: [5, 7],
      5: [10],
      7: [8, 9],
      8: [9],
      9: [10, 11],
      10: [11],
      11: [],
      12: [13, 14],
      13: [3, 14],
      14: [12],
    }

    expect(
      findDirectedCycle([1, 2, 3, 4, 5, 7, 8, 9, 10, 11], (node) => edges[node])
    ).to.equal(null)
    expect(findDirectedCycle([1, 7, 12], (node) => edges[node])).to.deep.equal([
      12, 13, 14,
    ])
    expect(findDirectedCycle([1, 7, 13], (node) => edges[node])).to.deep.equal([
      13, 14, 12,
    ])
    expect(findDirectedCycle([1, 7, 14], (node) => edges[node])).to.deep.equal([
      14, 12, 13,
    ])
  })
  it('works with Maps/Sets', function () {
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

    expect(findDirectedCycle([1], (node) => edges.get(node))).to.deep.equal([
      2, 3, 4,
    ])
    expect(findDirectedCycle([1, 7], (node) => edges.get(node))).to.deep.equal([
      2, 3, 4,
    ])
    expect(findDirectedCycle([7], (node) => edges.get(node))).to.deep.equal([
      2, 3, 4,
    ])
    expect(findDirectedCycle([9], (node) => edges.get(node))).to.deep.equal([
      9, 10, 11,
    ])
  })
})
