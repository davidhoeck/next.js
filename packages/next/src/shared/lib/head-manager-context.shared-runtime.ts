import React from 'react'

export function createHeadManagerContext() {
  const HeadManagerContext: React.Context<{
    updateHead?: (state: any) => void
    mountedInstances?: any
    updateScripts?: (state: any) => void
    scripts?: any
    getIsSsr?: () => boolean

    // Used in app directory, to render script tags as server components.
    appDir?: boolean
    nonce?: string
  }> = React.createContext({})

  if (process.env.NODE_ENV !== 'production') {
    HeadManagerContext.displayName = 'HeadManagerContext'
  }

  return HeadManagerContext
}

export const HeadManagerContext = createHeadManagerContext()
