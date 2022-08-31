import { Alert } from 'components/Alert'
import { Button } from 'components/Button'
import { Conditional } from 'components/Conditional'
import { ContractPageHeader } from 'components/ContractPageHeader'
import { FormGroup } from 'components/FormGroup'
import { AddressBalances } from 'components/forms/AddressBalances'
import { useAddressBalancesState } from 'components/forms/AddressBalances.hooks'
import { NumberInput, TextInput, UrlInput } from 'components/forms/FormInput'
import { useInputState, useNumberInputState } from 'components/forms/FormInput.hooks'
import { JsonPreview } from 'components/JsonPreview'
import { LinkTabs } from 'components/LinkTabs'
import { gutenbergLinkTabs } from 'components/LinkTabs.data'
import { WalletLoader } from 'components/WalletLoader'
import { useContracts } from 'contexts/contracts'
import { useWallet } from 'contexts/wallet'
import type { InstantiateResponse } from 'contracts/cw1/subkeys'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import type { FormEvent } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation } from 'react-query'
import { CW20_BASE_CODE_ID } from 'utils/constants'
import { withMetadata } from 'utils/layout'
import { links } from 'utils/links'

const CW20InstantiatePage: NextPage = () => {
  const wallet = useWallet()
  const contract = useContracts().cw20Base

  const nameState = useInputState({
    id: 'name',
    name: 'name',
    title: 'Name',
    placeholder: 'Johns USD Obligations',
  })

  const symbolState = useInputState({
    id: 'symbol',
    name: 'symbol',
    title: 'Symbol',
    placeholder: 'JUSD',
  })

  const decimalsState = useNumberInputState({
    id: 'decimals',
    name: 'decimals',
    title: 'Decimals',
    placeholder: '6',
    defaultValue: 6,
  })

  const balancesState = useAddressBalancesState()

  const minterState = useInputState({
    id: 'minter-address',
    name: 'minterAddress',
    title: 'Minter Address',
    defaultValue: wallet.address,
  })

  const capState = useInputState({
    id: 'cap',
    name: 'cap',
    title: 'Cap',
    placeholder: '9999',
  })

  const projectState = useInputState({
    id: 'project',
    name: 'projectName',
    title: 'Project',
    placeholder: 'My Awesome Project',
  })

  const descriptionState = useInputState({
    id: 'description',
    name: 'description',
    title: 'Description',
    placeholder: 'This is my awesome contract project',
  })

  const walletAddressState = useInputState({
    id: 'wallet-address',
    name: 'marketingAddress',
    title: 'Wallet Address (marketing)',
    defaultValue: wallet.address,
  })

  const logoUrlState = useInputState({
    id: 'logo-url',
    name: 'logoUrl',
    title: 'Logo URL',
    placeholder: 'https://example.com/image.jpg',
  })

  const shouldSubmit = [nameState.value, symbolState.value].every(Boolean)

  const { data, isLoading, mutate } = useMutation(
    async (event: FormEvent): Promise<InstantiateResponse | null> => {
      event.preventDefault()
      if (!shouldSubmit) {
        throw new Error('Please fill required fields')
      }
      if (!contract) {
        throw new Error('Smart contract connection failed')
      }
      const msg = {
        name: nameState.value,
        symbol: symbolState.value,
        decimals: decimalsState.value || 6,
        initial_balances: balancesState.values,
        mint: {
          minter: minterState.value,
          cap: capState.value || null,
        },
        marketing: {
          project: projectState.value,
          description: descriptionState.value,
          marketing: walletAddressState.value,
          logo: {
            url: logoUrlState.value,
          },
        },
      }
      return toast.promise(contract.instantiate(CW20_BASE_CODE_ID, msg, msg.name, wallet.address), {
        loading: 'Instantiating contract...',
        error: 'Instantiation failed!',
        success: 'Instantiation success!',
      })
    },
    {
      onError: (error) => {
        toast.error(String(error))
      },
    },
  )

  const txHash = data?.transactionHash

  return (
    <form className="flex flex-col py-6 px-12 space-y-4" onSubmit={mutate}>
      <NextSeo title="Instantiate CW20 Token" />
      {/* wallet button */}

      <WalletLoader />
      <ContractPageHeader
        description="This ultra-modern technology allows to create, mint and manage any possible number of fungible tokens. In case of any difficulties,"
        link={links['Docs CW20 Base']}
        title="gutenberg"
      />
      <LinkTabs activeIndex={0} data={gutenbergLinkTabs} />

      <Conditional test={Boolean(data)}>
        <Alert type="info">
          <b>Instantiate success!</b> Here is the transaction result containing the contract address and the transaction
          hash.
        </Alert>
        <JsonPreview content={data} title="Transaction Result" />
        <br />
      </Conditional>

      <FormGroup subtitle="Basic information about your new contract" title="Create New Token">
        <TextInput isRequired {...nameState} />
        <TextInput isRequired {...symbolState} />
        <NumberInput isRequired {...decimalsState} />
        <NumberInput {...capState} />
        <UrlInput {...logoUrlState} />
        <AddressBalances
          entries={balancesState.entries}
          isRequired
          onAdd={balancesState.add}
          onChange={balancesState.update}
          onRemove={balancesState.remove}
          subtitle="By default all new tokens will be transfered to your wallet. You can change that."
          title="Change Initial Balances"
        />
      </FormGroup>
      <FormGroup subtitle="Public metadata for your new contract" title="Marketing Details">
        <TextInput {...projectState} />
        <TextInput {...descriptionState} />
      </FormGroup>

      <FormGroup subtitle="" title="">
        <div className="flex justify-center p-4">
          <Button isDisabled={!shouldSubmit} isLoading={isLoading} isWide type="submit">
            MINT
          </Button>
        </div>
      </FormGroup>
    </form>
  )
}

export default withMetadata(CW20InstantiatePage, { center: false })
