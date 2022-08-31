import type { UseCW1SubkeysContractProps } from 'contracts/cw1/subkeys'
import { useCW1SubkeysContract } from 'contracts/cw1/subkeys'
import type { UseCW20BaseContractProps } from 'contracts/cw20/base'
import { useCW20BaseContract } from 'contracts/cw20/base'
import type { UseCW721BaseContractProps } from 'contracts/cw721/base'
import { useCW721BaseContract } from 'contracts/cw721/base'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import type { State } from 'zustand'
import create from 'zustand'

/**
 * Contracts store type definitions
 */
export interface ContractsStore extends State {
  cw1Subkeys: UseCW1SubkeysContractProps | null
  cw20Base: UseCW20BaseContractProps | null
  cw721Base: UseCW721BaseContractProps | null
}

/**
 * Contracts store default values as a separate variable for reusability
 */
export const defaultValues: ContractsStore = {
  cw1Subkeys: null,
  cw20Base: null,
  cw721Base: null,
}

/**
 * Entrypoint for contracts store using {@link defaultValues}
 */
export const useContracts = create<ContractsStore>(() => ({
  ...defaultValues,
}))

/**
 * Contracts store provider to easily mount {@link ContractsSubscription}
 * to listen/subscribe to contract changes
 */
export const ContractsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ContractsSubscription />
    </>
  )
}

/**
 * Contracts store subscriptions (side effects)
 *
 * TODO: refactor all contract logics to zustand store
 */
const ContractsSubscription = () => {
  const cw20Base = useCW20BaseContract()
  const cw721Base = useCW721BaseContract()
  const cw1Subkeys = useCW1SubkeysContract()

  useEffect(() => {
    useContracts.setState({
      cw20Base,
      cw721Base,
      cw1Subkeys,
    })
  }, [
    cw20Base,
    cw721Base,
    cw1Subkeys,
    //
  ])

  return null
}
