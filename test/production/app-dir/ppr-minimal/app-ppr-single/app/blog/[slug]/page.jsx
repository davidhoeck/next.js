import React, { Suspense } from 'react'
import { Dynamic } from '../../../components/dynamic'

export default function Page() {
  return (
    <div>
      <div>Blog Page</div>
      <Suspense fallback={<Dynamic agent="..." />}>
        <Dynamic />
      </Suspense>
    </div>
  )
}

export async function generateStaticParams() {
  return []
}
