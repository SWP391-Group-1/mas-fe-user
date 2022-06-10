import React from 'react'

export function useForceUpdate() {
  const [state, setState] = React.useState(true);
  return () => setState((prev) => !prev)
}