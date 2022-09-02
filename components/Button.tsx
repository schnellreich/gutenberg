import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { CgSpinnerAlt } from 'react-icons/cg'

export type ButtonVariant = 'solid' | 'outline'

export interface ButtonProps extends ComponentProps<'button'> {
  isDisabled?: boolean
  isLoading?: boolean
  isExecuting: boolean
  isWide?: boolean
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  variant?: ButtonVariant
}

export const Button = (props: ButtonProps) => {
  const {
    isDisabled,
    isExecuting,
    isLoading,
    isWide,
    leftIcon,
    rightIcon,
    variant = 'solid',
    className,
    children,
    ...rest
  } = props

  return (
    <button
      className={clsx(
        'group flex justify-center items-center py-4 space-x-2 font-bold focus:ring ',
        'w-1/3',
        isWide ? 'px-8' : 'px-4',
        {
          'text-lime-300 bg-slate-700 hover:bg-lime-300 rounded-3xl ': variant === 'solid',
          'hover:text-slate-700 rounded border border-plumbus': variant === 'outline',
          'opacity-50 cursor-not-allowed pointer-events-none': isDisabled,
          'animate-pulse cursor-wait pointer-events-none': isLoading,
        },
        className,
      )}
      disabled={isDisabled}
      type="button"
      {...rest}
    >
      {isLoading ? <CgSpinnerAlt className="animate-spin" /> : leftIcon}
      <div>{children}</div>
      {!isLoading && rightIcon}
    </button>
  )
}
