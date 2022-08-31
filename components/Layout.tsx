import clsx from 'clsx'
import Head from 'next/head'
import type { ReactNode } from 'react'
import type { PageMetadata } from 'utils/layout'

import { DefaultAppSeo } from './DefaultAppSeo'

export interface LayoutProps {
  metadata?: PageMetadata
  children: ReactNode
}

export const Layout = ({ children, metadata = {} }: LayoutProps) => {
  return (
    <div className="overflow-hidden relative">
      <Head>
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>

      <DefaultAppSeo />

      {/* plumbus confetti */}
      <div className="fixed inset-0 -z-10 pointer-events-none" />

      {/* actual layout container */}
      <div className="hidden sm:flex">
        <div className="overflow-auto relative flex-grow h-screen no-scrollbar">
          <main
            className={clsx('mx-auto max-w-7xl', {
              'flex flex-col justify-center items-center':
                typeof metadata.center === 'boolean' ? metadata.center : true,
            })}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
