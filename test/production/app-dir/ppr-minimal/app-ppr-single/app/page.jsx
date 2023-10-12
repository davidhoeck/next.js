import React, { Suspense } from 'react'
import { Dynamic } from '../components/dynamic'

export default function Page() {
  return (
    <div>
      <div>Page</div>
      <Suspense fallback={<Dynamic agent="..." />}>
        <Dynamic />
      </Suspense>
    </div>
  )
}
