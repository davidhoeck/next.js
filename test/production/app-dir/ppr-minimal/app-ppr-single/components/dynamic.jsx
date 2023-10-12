import React from 'react'
import { headers } from 'next/headers'

export function Dynamic({ agent }) {
  if (!agent) {
    agent = headers().get('user-agent')
  }

  return <pre>User-Agent: {agent}</pre>
}
