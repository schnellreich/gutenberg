import { Accordion } from 'flowbite-react'
import type { ReactNode } from 'react'

export interface CollapsibleProps {
  title: string
  subtitle: ReactNode
  children?: ReactNode
}

export const Collapsible = (props: CollapsibleProps) => {
  const { title, children } = props

  return (
    <Accordion alwaysOpen={false}>
      <Accordion.Panel>
        <Accordion.Title>{title}</Accordion.Title>
        <Accordion.Content>
          <div className="block p-2 shadow-lg">{children}</div>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  )
}
