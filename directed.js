'use strict'

function findDirectedCycle(
  startNodes,
  getConnectedNodes
) {
  function connected(node) {
    var thing = getConnectedNodes(node)
    if (thing == null) return [][Symbol.iterator]()
    if (thing[Symbol.iterator]) return thing[Symbol.iterator]()
    return thing
  }

  var visited = new Set()

  var nodeStack = []
  var connectedNodeStack = []
  var nodeIndexes = new Map()

  for (var startNode of startNodes) {
    if (visited.has(startNode)) continue
    visited.add(startNode)
    nodeIndexes.set(startNode, nodeStack.length)
    nodeStack.push(startNode)
    connectedNodeStack.push(connected(startNode))

    while (nodeStack.length) {
      var connectedNodes = connectedNodeStack[connectedNodeStack.length - 1]
      var next = connectedNodes.next()
      if (next.done) {
        connectedNodeStack.pop()
        var removedNode = nodeStack.pop()
        nodeIndexes.delete(removedNode)
        continue
      }
      var nextNode = next.value
      var cycleStartIndex = nodeIndexes.get(nextNode)
      if (cycleStartIndex != null) {
        // found a cycle!
        return nodeStack.slice(cycleStartIndex)
      }
      if (visited.has(nextNode)) continue
      visited.add(nextNode)
      nodeIndexes.set(nextNode, nodeStack.length)
      nodeStack.push(nextNode)
      connectedNodeStack.push(connected(nextNode))
    }
  }

  return null
}

module.exports = findDirectedCycle

