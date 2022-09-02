import type { ReactNode } from 'react'

export interface FormGroupComposerProps {
  title: string
  subtitle: ReactNode
  children?: ReactNode
}

export const FormGroupComposer = (props: FormGroupComposerProps) => {
  const { title, children } = props

  return (
    <div className="flex flex-col  p-4 space-x-0 w-full text-white bg-slate-700/50 rounded-3xl border-0">
      <div className="flex flex-row w-full">
        <label className="flex flex-row space-y-1">
          <span className="font-bold text-lime-300">{title}</span>
        </label>
      </div>
      <div className="flex flex-row space-y-0 w-full">{children}</div>
    </div>
  )
}
