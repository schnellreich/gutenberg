import clsx from 'clsx'

import type { LinkTabProps } from './LinkTab'
import { LinkTab } from './LinkTab'

export interface LinkTabsProps {
  data: LinkTabProps[]
  activeIndex?: number
}

export const LinkTabs = ({ data, activeIndex }: LinkTabsProps) => {
  return (
    <div
      className={clsx(
        'flex before:absolute grid-flow-col rounded',
        'w-1/2',
        'before:inset-x-0 before:bottom-0 before:border-b-2 before:border-white/25',
      )}
    >
      {data.map((item, index) => (
        <LinkTab key={index} {...item} isActive={index === activeIndex} />
      ))}
    </div>
  )
}
