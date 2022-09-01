import clsx from 'clsx'
import { NETWORK } from 'utils/constants'
import { links } from 'utils/links'

import { AnchorButton } from './AnchorButton'
import { StyledInput } from './forms/StyledInput'

interface TransactionHashProps {
  hash: string
  className?: string
}

export const TransactionHash = ({ hash, className }: TransactionHashProps) => {
  return (
    <div
      className={clsx(
        'bg-white/10 rounded-3xl border-2 border-white/20 form-input',
        'focus:ring focus:ring-plumbus-20',
        hash !== '' ? 'text-white/100' : 'text-white/50',
        'flex justify-end    items-center',
        className,
      )}
    >
      <StyledInput
        className={clsx(
          'flex-auto w-fit',
          'bg-white/5 rounded-3xl border-0 border-white/20 focus:ring-0 form-input',
          hash !== '' ? 'text-white/100' : 'text-white/50',
          className,
        )}
        value={hash || 'Waiting for execution...'}
      />
      <AnchorButton
        className={clsx(
          'bg-slate-700',
          'ml-2 text-slate-300',
          hash === '' ? 'text-lime-300 bg-opacity-20 hover:bg-opacity-10' : '',
        )}
        href={`${links.Explorer}/tx${NETWORK === 'mainnet' ? 's' : ''}/${hash}`}
        onClick={(e) => {
          if (hash === '') e.preventDefault()
        }}
      >
        Go to Explorer
      </AnchorButton>
    </div>
  )
}
