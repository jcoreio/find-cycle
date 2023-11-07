declare function findDirectedCycle<N>(
  startNodes: Iterable<N>,
  getConnectedNodes: (node: N) => Iterator<N> | Iterable<N> | null | undefined
): Array<N> | null | undefined

export = findDirectedCycle
