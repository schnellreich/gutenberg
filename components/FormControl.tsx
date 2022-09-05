import clsx from 'clsx'
import type { ComponentProps, ElementType, ReactNode } from 'react'

export interface FormControlProps extends ComponentProps<'div'> {
  title: string
  subtitle?: ReactNode
  htmlId?: string
  isRequired?: boolean
  labelAs?: ElementType
}

export const FormControl = (props: FormControlProps) => {
  const { title, subtitle, htmlId, isRequired, children, className, labelAs: Label = 'label', ...rest } = props

  return (
    <div className={clsx('flex flex-col space-y-2', className)} {...rest}>
      <Label className="flex flex-col space-y-1" htmlFor={htmlId}>
        <span
          className={clsx('font-bold first-letter:capitalize', {
            "after:text-lime-300 after:content-['_*']": isRequired,
          })}
        >
          {title}
        </span>
        {subtitle && <span className="text-xs text-slate-300">{subtitle}</span>}
      </Label>
      {children}
    </div>
  )
}
