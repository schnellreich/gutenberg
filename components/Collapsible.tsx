import type { ReactNode } from 'react'

export interface CollapsibleProps {
  title: string
  subtitle: ReactNode
  children?: ReactNode
}

export const Collapsible = (props: CollapsibleProps) => {
  const { title, children } = props

  return (
    <div className="flex flex-col p-0 space-x-0 w-full text-slate-700 bg-lime-300 rounded-3xl border-0">
      <div className="accordion-item" data-accordion="collapse" id="accordion-collapse">
        <h1 id="accordion-collapse-heading">
          <button
            aria-controls="accordion-collapse-body"
            aria-expanded="true"
            className="flex justify-between items-center p-5 w-full"
            data-accordion-target="#accordion-collapse-body"
            type="button"
          >
            {title}
          </button>
        </h1>
        <div aria-labelledby="accordion-collapse-heading" className="" id="accordion-collapse-body">
          <div className="block p-2 shadow-lg">{children}</div>
        </div>
      </div>
    </div>
  )
}
