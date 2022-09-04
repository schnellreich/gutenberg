import clsx from 'clsx'
import { Anchor } from 'components/Anchor'

export interface LinkTabProps {
  title: string
  href: string
  isActive?: boolean
}

export const LinkTab = (props: LinkTabProps) => {
  const { title, href, isActive } = props

  return (
    <Anchor
      className={clsx(
        'isolate p-2 space-y-1 border-2 ',
        'first-of-type:rounded-tr-xl last-of-type:rounded-tr-xl',
        'w-1/3',
        isActive ? 'border-lime-300 ' : 'border-transparent',
        isActive ? 'bg-lime-300' : 'hover:bg-white/5',
        isActive ? 'text-slate-700' : 'border-transparent',
      )}
      href={href}
    >
      <h4 className="font-bold">{title}</h4>
    </Anchor>
  )
}
