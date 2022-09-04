import type { ReactNode } from 'react'

export interface FormGroupProps {
  title: string
  subtitle: ReactNode
  children?: ReactNode
}

export const FormGroup = (props: FormGroupProps) => {
  const { title, children } = props

  return (
    <div className=" flex flex-col p-4 space-x-0 w-2/3 text-slate-700 bg-lime-300 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl border-0">
      <div className="flex flex-row w-1/3">
        <label className="flex flex-col space-y-1">
          <span className="font-bold">{title}</span>
        </label>
      </div>
      <div className="space-y-4 w-full">{children}</div>
    </div>
  )
}
