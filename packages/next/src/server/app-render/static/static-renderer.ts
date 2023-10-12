import { prerender } from 'react-dom/static.edge'
import { resume, renderToReadableStream } from 'react-dom/server.edge'

type StreamOptions = {
  onError?: (error: Error) => void
  nonce?: string
  bootstrapScripts?: {
    src: string
    integrity?: string
    crossOrigin?: string
  }[]
  experimental_formState?: boolean
}

type RenderResult = {
  stream: ReadableStream<Uint8Array>
  postponed?: object | null
}

interface Renderer {
  render(children: JSX.Element, options: StreamOptions): Promise<RenderResult>
}

class StaticRenderer implements Renderer {
  public async render(children: JSX.Element, streamOptions: StreamOptions) {
    const { prelude, postponed } = await prerender(children, streamOptions)
    return { stream: prelude, postponed }
  }
}

class StaticResumeRenderer implements Renderer {
  constructor(private readonly postponed: object) {}

  public async render(children: JSX.Element, streamOptions: StreamOptions) {
    const stream = await resume(children, this.postponed, streamOptions)

    return { stream }
  }
}

export class ServerRenderer implements Renderer {
  public async render(
    children: JSX.Element,
    options: StreamOptions
  ): Promise<RenderResult> {
    const stream = await renderToReadableStream(children, options)
    return { stream }
  }
}

type Options = {
  useUnstablePostpone: boolean
  isStaticGeneration: boolean
  postponed: object | null
}

export function createStaticRenderer({
  useUnstablePostpone,
  isStaticGeneration,
  postponed,
}: Options): Renderer {
  if (useUnstablePostpone) {
    if (isStaticGeneration) {
      console.log('Using StaticRenderer')
      return new StaticRenderer()
    }

    if (postponed) {
      console.log('Using StaticResumeRenderer')
      return new StaticResumeRenderer(postponed)
    }
  }

  console.log('Using ServerRenderer')
  return new ServerRenderer()
}
