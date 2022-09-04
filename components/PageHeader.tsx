import type { ReactNode } from 'react'

export interface PageHeaderProps {
  title: string
  children?: ReactNode
}

export const PageHeader = ({ title, children }: PageHeaderProps) => {
  return (
    <>
      <h1 className="font-heading text-4xl font-bold text-lime-300">{title}</h1>
      <p className="w-3/5">{children}</p>
    </>
  )
}
