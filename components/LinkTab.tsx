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
        'first-of-type:rounded-tl-md last-of-type:rounded-tr-md',
        'w-1/3',
        isActive ? 'border-plumbus' : 'border-transparent',
        isActive ? 'bg-plumbus/5 hover:bg-plumbus/10' : 'hover:bg-white/5',
      )}
      href={href}
    >
      <h4 className="font-bold">{title}</h4>
    </Anchor>
  )
}
