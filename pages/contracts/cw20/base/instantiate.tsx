import { Alert } from 'components/Alert'
import { Button } from 'components/Button'
import { Collapsible } from 'components/Collapsible'
import { Conditional } from 'components/Conditional'
import { ContractPageHeader } from 'components/ContractPageHeader'
import { ExecuteCombobox } from 'components/contracts/cw20/base/ExecuteCombobox'
import { useExecuteComboboxState } from 'components/contracts/cw20/base/ExecuteCombobox.hooks'
import { FormControl } from 'components/FormControl'
import { FormGroup } from 'components/FormGroup'
import { FormGroupComposer } from 'components/FormGroupComposer'
import { FormGroupSwap } from 'components/FormGroupSwap'
import { AddressBalances } from 'components/forms/AddressBalances'
import { useAddressBalancesState } from 'components/forms/AddressBalances.hooks'
import { AddressInput, NumberInput, TextInput, UrlInput } from 'components/forms/FormInput'
import { useInputState, useNumberInputState } from 'components/forms/FormInput.hooks'
import { JsonTextArea } from 'components/forms/FormTextArea'
import { JsonPreview } from 'components/JsonPreview'
import { LinkTabs } from 'components/LinkTabs'
import { gutenbergLinkTabs } from 'components/LinkTabs.data'
import { TransactionHash } from 'components/TransactionHash'
import { WalletLoader } from 'components/WalletLoader'
import { useContracts } from 'contexts/contracts'
import { useWallet } from 'contexts/wallet'
import type { InstantiateResponse } from 'contracts/cw1/subkeys'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaArrowRight } from 'react-icons/fa'
import { useMutation } from 'react-query'
import { CW20_BASE_CODE_ID } from 'utils/constants'
import type { DispatchExecuteArgs } from 'utils/contracts/cw20/execute'
import { dispatchExecute, isEitherType, previewExecutePayload } from 'utils/contracts/cw20/execute'
import { parseJson } from 'utils/json'
import { withMetadata } from 'utils/layout'
import { links } from 'utils/links'

const CW20InstantiatePage: NextPage = () => {
  const wallet = useWallet()
  const contract = useContracts().cw20Base
  const comboboxState = useExecuteComboboxState()
  const [lastTx, setLastTx] = useState('')
  const type = comboboxState.value?.id

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

  const contractState = useInputState({
    id: 'contract-address',
    name: 'contract-address',
    title: 'CW20 Address',
    subtitle: 'Address of the CW20 token',
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

  const messageState = useInputState({
    id: 'message',
    name: 'message',
    title: 'Message',
    subtitle: 'Message content for current transaction',
    defaultValue: JSON.stringify({ key: 'value' }, null, 2),
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
    title: 'Projects Name',
    placeholder: 'John Owes You',
  })

  const marketingState = useInputState({
    id: 'marketing',
    name: 'marketing',
    title: 'Marketing',
  })

  const amountState = useNumberInputState({
    id: 'amount',
    name: 'amount',
    title: 'Amount',
    subtitle: 'Enter amount of tokens to execute',
  })

  const descriptionState = useInputState({
    id: 'description',
    name: 'description',
    title: 'Description',
    placeholder: 'If you know John, you know what to do with this token',
  })

  const walletAddressState = useInputState({
    id: 'wallet-address',
    name: 'marketingAddress',
    title: 'Public wallet',
    defaultValue: wallet.address,
  })

  const ownerState = useInputState({
    id: 'owner-address',
    name: 'owner',
    title: 'Owner Address',
    subtitle: 'Address of the allowance giver',
  })

  const recipientState = useInputState({
    id: 'recipient-address',
    name: 'recipient',
    title: 'Recipient Address',
    subtitle: 'Address of the recipient',
  })

  const logoUrlState = useInputState({
    id: 'logo-url',
    name: 'logoUrl',
    title: 'Logo URL',
    placeholder: 'https://example.com/image.jpg',
  })

  const showAmountField = type && !isEitherType(type, ['update-logo', 'update-marketing'])
  const showMessageField = isEitherType(type, ['send', 'send-from'])
  const showUpdateLogoField = type === 'update-logo'
  const showMarketingFields = type === 'update-marketing'
  const shouldSubmit = [nameState.value, symbolState.value].every(Boolean)
  const showOwnerField = isEitherType(type, ['burn-from', 'send-from', 'transfer-from'])
  const showRecipientField = isEitherType(type, [
    'increase-allowance',
    'decrease-allowance',
    'transfer',
    'transfer-from',
    'send',
    'send-from',
    'mint',
  ])

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
        loading: 'Creating contract...',
        error: 'Creation failed!',
        success: 'Success Creation!',
      })
    },
    {
      onError: (error) => {
        toast.error(String(error))
      },
    },
  )

  const messages = useMemo(() => contract?.use(contractState.value), [contract, wallet.address, contractState.value])
  const payload: DispatchExecuteArgs = {
    amount: amountState.value.toString(),
    contract: contractState.value,
    description: descriptionState.value,
    logo: { url: logoUrlState.value },
    marketing: marketingState.value,
    messages,
    msg: parseJson(messageState.value),
    owner: ownerState.value,
    project: projectState.value,
    recipient: recipientState.value,
    txSigner: wallet.address,
    type,
  }

  const { isExecuting, hmutate } = useMutation(
    async (event: FormEvent) => {
      event.preventDefault()
      if (!type) {
        throw new Error('Please select message type!')
      }
      const txHash = await toast.promise(dispatchExecute(payload), {
        error: `${type.charAt(0).toUpperCase() + type.slice(1)} execute failed!`,
        loading: 'Executing message...',
        success: (tx) => `Transaction ${tx} success!`,
      })
      if (txHash) {
        setLastTx(txHash)
      }
    },
    {
      onError: (error) => {
        console.error(error)
        toast.error(String(error))
      },
    },
  )

  const txHash = data?.transactionHash

  return (
    <form className="flex flex-col py-6 px-12 space-y-0" onSubmit={mutate}>
      <NextSeo title="Web3 Typography " />
      {/* wallet button */}
      <div className="flex flex-col justify-center">
        <WalletLoader />
        <ContractPageHeader
          description="This ultra-modern technology allows to create, mint and manage any possible number of fungible tokens. In case of any difficulties,"
          link={links['Docs CW20 Base']}
          title="gutenberg"
        />
      </div>
      <FormGroupComposer subtitle="composer" title="">
        <LinkTabs activeIndex={0} data={gutenbergLinkTabs} />
        <Conditional test={Boolean(data)}>
          <Alert type="info">
            <b>Success creation!</b> Here is the transaction result containing the contract address and the transaction
            hash.
          </Alert>
          <JsonPreview content={data} title="Transaction Result" />
          <br />
        </Conditional>
      </FormGroupComposer>
      <FormGroupComposer subtitle="composer" title="">
        <FormGroup subtitle="Basic information about your new contract" title="Create New Token">
          <TextInput isRequired {...nameState} />
          <TextInput isRequired {...symbolState} />
          <NumberInput isRequired {...decimalsState} />
          <NumberInput {...capState} />
          <UrlInput {...logoUrlState} />
          <Collapsible subtitle="collapsible" title="Change Balance">
            <AddressBalances
              entries={balancesState.entries}
              isRequired
              onAdd={balancesState.add}
              onChange={balancesState.update}
              onRemove={balancesState.remove}
              subtitle="By default all new tokens will be transfered to your wallet. You can change that."
              title="Change Initial Balances"
            />
          </Collapsible>
          <Collapsible subtitle="collapsible" title="Marketing Details">
            <TextInput {...projectState} />
            <TextInput {...descriptionState} />
          </Collapsible>
          <div className="flex justify-center p-4">
            <Button isDisabled={!shouldSubmit} isLoading={isLoading} isWide type="submit">
              MINT
            </Button>
          </div>
        </FormGroup>

        <FormGroupSwap subtitle="manage-tokens" title="Manage Tokens">
          <div className="space-y-8">
            <AddressInput {...contractState} />
            <ExecuteCombobox {...comboboxState} />
            {showOwnerField && <AddressInput {...ownerState} />}
            {showRecipientField && <AddressInput {...recipientState} />}
            {showAmountField && <NumberInput {...amountState} />}
            {showMessageField && <JsonTextArea {...messageState} />}
            {showMarketingFields && (
              <>
                <TextInput {...projectState} />
                <TextInput {...descriptionState} />
                <AddressInput {...marketingState} />
              </>
            )}
            {showUpdateLogoField && <UrlInput {...logoUrlState} />}
          </div>
          <div className="space-y-8">
            <div className="relative">
              <Button
                className="absolute top-0 right-0"
                isExecuting={isLoading}
                rightIcon={<FaArrowRight />}
                type="submit"
              >
                Execute
              </Button>
              <FormControl subtitle="View execution transaction hash" title="Transaction Hash">
                <TransactionHash hash={lastTx} />
              </FormControl>
            </div>
          </div>
          <FormControl subtitle="View current message to be sent" title="Payload Preview">
            <JsonPreview content={previewExecutePayload(payload)} isCopyable />
          </FormControl>
        </FormGroupSwap>
      </FormGroupComposer>
    </form>
  )
}

export default withMetadata(CW20InstantiatePage, { center: false })
