import React from 'react'

export function usePatch(initValue) {
  const [state, setState] = React.useState(initValue)

  const patchState = (patchData) => {
      setState(prev => ({ ...prev, ...(patchData ?? {})}))
  }

  return [state, setState, patchState];
}