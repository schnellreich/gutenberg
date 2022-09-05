import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'

export const StyledInput = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  function Input({ className, ...rest }, ref) {
    return (
      <input
        className={clsx(
          'bg-white rounded-lg border-0 form-input',
          'text-slate-700',
          'placeholder:text-slate-300',
          'focus:ring focus:ring-lime-300',
          className,
        )}
        ref={ref}
        {...rest}
      />
    )
  },
  //
)
