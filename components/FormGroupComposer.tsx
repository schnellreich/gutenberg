import type { ReactNode } from 'react'

export interface FormGroupComposerProps {
  title: string
  subtitle: ReactNode
  children?: ReactNode
}

export const FormGroupComposer = (props: FormGroupComposerProps) => {
  const { title, children } = props

  return (
    <div className="flex flex-col p-0 mt-0 w-full text-lime-300 bg-slate-700/50 rounded border-0">
      <div className="flex flex-row w-full">
        <label className="flex flex-row">
          <span className="font-bold text-lime-300">{title}</span>
        </label>
      </div>
      <div className="flex flex-row w-full">{children}</div>
    </div>
  )
}
