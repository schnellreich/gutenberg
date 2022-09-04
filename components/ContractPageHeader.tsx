import { Anchor } from 'components/Anchor'

import { PageHeader } from './PageHeader'

interface ContractPageHeaderProps {
  title: string
  description?: string
  link: string
}

export const ContractPageHeader = ({ title, description, link }: ContractPageHeaderProps) => {
  return (
    <PageHeader title={title}>
      {description} read the{' '}
      <Anchor className="font-bold text-lime-300 hover:underline" href={link}>
        instruction
      </Anchor>
      .
    </PageHeader>
  )
}
