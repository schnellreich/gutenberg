import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'

export const StyledInput = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  function Input({ className, ...rest }, ref) {
    return (
      <input
        className={clsx(
          'bg-white/100 rounded-lg border-0 border-white/20 form-input',
          'placeholder:text-slate-300',
          'focus:ring focus:ring-lime-500',
          className,
        )}
        ref={ref}
        {...rest}
      />
    )
  },
  //
)
