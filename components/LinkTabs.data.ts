import type { LinkTabProps } from './LinkTab'

export const cw20LinkTabs: LinkTabProps[] = [
  {
    title: 'Token',
    href: '/contracts/cw20/base/instantiate',
  },
  {
    title: 'NFT',
    href: '/contracts/cw20/base/query',
  },
]

export const cw721BaseLinkTabs: LinkTabProps[] = [
  {
    title: 'Instantiate',
    href: '/contracts/cw721/base/instantiate',
  },
  {
    title: 'Query',
    href: '/contracts/cw721/base/query',
  },
  {
    title: 'Execute',
    href: '/contracts/cw721/base/execute',
  },
]

export const gutenbergLinkTabs: LinkTabProps[] = [
  {
    title: 'Token',
    href: '/',
  },
  {
    title: 'NFT',
    href: '/nft',
  },
]
