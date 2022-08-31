import type { AppConfig } from './app'

export const mainnetConfig: AppConfig = {
  chainId: 'juno-1',
  chainName: 'Juno',
  addressPrefix: 'juno',
  rpcUrl: 'https://rpc.juno-1.deuslabs.fi',
  feeToken: 'ujuno',
  stakingToken: 'ujuno',
  coinMap: {
    ujuno: { denom: 'JUNO', fractionalDigits: 6 },
  },
  gasPrice: 0.025,
  fees: {
    upload: 1500000,
    init: 500000,
    exec: 200000,
  },
}

export const uniTestnetConfig: AppConfig = {
  chainId: 'space-pussy-1',
  chainName: 'Space Pussy',
  addressPrefix: 'bostrom',
  rpcUrl: 'https://rpc.space-pussy-1.cybernode.ai',
  httpUrl: 'https://lcd.space-pussy-1.cybernode.ai',
  feeToken: 'boot',
  stakingToken: 'boot',
  coinMap: {
    boot: { denom: 'BOOT', fractionalDigits: 0 },
  },
  gasPrice: 0.001,
  fees: {
    upload: 2500000,
    init: 1000000,
    exec: 500000,
  },
}

export const getConfig = (network: string): AppConfig => {
  if (network === 'mainnet') return mainnetConfig
  return uniTestnetConfig
}
