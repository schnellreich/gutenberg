import type { ReactNode } from 'react'

export interface FormGroupSwapProps {
  title: string
  subtitle: ReactNode
  children?: ReactNode
}

export const FormGroupSwap = (props: FormGroupSwapProps) => {
  const { title, children } = props

  return (
    <div className=" flex flex-col p-4 space-x-0 w-1/3 h-full text-white bg-slate-700/50 rounded-3xl border-0">
      <div className="flex flex-row w-1/3">
        <label className="flex flex-col space-y-1">
          <span className="font-bold text-lime-300">{title}</span>
        </label>
      </div>
      <div className="space-y-4 w-full">{children}</div>
    </div>
  )
}
