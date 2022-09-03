import type { ReactNode } from 'react'

import { Button } from './Button'

export interface CollapsibleProps {
  title: string
  subtitle: ReactNode
  children?: ReactNode
}

export const Collapsible = (props: CollapsibleProps) => {
  const { title, children } = props

  return (
    <div className=" flex flex-col p-0 space-x-0 w-full text-slate-700 bg-lime-300 rounded-3xl border-0">
      <Button aria-controls="collapse" aria-expanded="false" data-bs-target="#collapse" type="button">
        {title}
      </Button>
      <div className="collapse" id="collapse">
        <div className="block p-2 shadow-lg">{children}</div>
      </div>
    </div>
  )
}
