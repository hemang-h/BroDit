'use client'

import { BrowserProvider } from 'ethers'
import { useEffect, useMemo, useState } from 'react'
import { Brodit } from '../../contract/typechain-types/Brodit'
import { Brodit__factory } from '../../contract/typechain-types'
import WalletProvider from '../../contextx/WalletProvider/WalletProvider'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import Button from '../components/Button/Button'
import { useAccount, useDisconnect } from 'wagmi'
import { formatAddress } from '@/utils/formatAddress'

// Before starting run ETH Node with: npm run evm-node
// Then deploy contract locally with: npm run deploy-contract
// Add address output bellow (LATER WILL BE IN ENV)
const CONTACT_ADDRESS = '0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f'

// Setup local metamask
// RPC_URL: http://127.0.0.1:8545/
// CHAIN_ID: 31337
// Import first account into Metamask from run eth-node output

export default function Home() {
    const [boxes, setBoxes] = useState<Brodit.BoxStructOutput[]>([])
    // TODO: memos, state, etc...
    const { open } = useWeb3Modal();
    const { disconnect } = useDisconnect();
    const { address } = useAccount();

    const getContract = async () => {
        // TODO: Wallet Connect
        const provider = new BrowserProvider((window as any).ethereum)
        const signer = await provider.getSigner()

        const contract = Brodit__factory.connect(CONTACT_ADDRESS, signer)
        return { contract, signer }
    }

    const createBrodit = async () => {
        const { contract, signer } = await getContract()

        // Create. TODO: uuid
        const id = Date.now().toString()

        await contract
            .create(
                id,
                signer.address,
                new Uint8Array([123]),
                Date.now() + 1000,
                'example@will.be.encrypted.com'
            )
            .then((t) => t.wait())

        alert(`Crated brodit with id ${id}`)
        loadBrodits()
    }

    const loadBrodits = async () => {
        const { contract, signer } = await getContract()
        const events = await contract.queryFilter(contract.getEvent('BroditCreated'))

        const ids = events.map((t) => t.args.id)

        const brodits = await Promise.all(ids.map((t) => contract.getBrodit(t)))
        setBoxes(brodits)
    }

    useEffect(() => {
        loadBrodits()
    }, [])

    return (
        <WalletProvider>
            <main className="flex min-h-screen flex-col items-center p-24 gap-8">

                {address ? (
                    <>
                        <Button onClick={() => disconnect()}>Disconnect</Button>
                        <div>{address ? `Connected: ${formatAddress(address)}` : ''}</div>
                    </>
                ) : (
                    <Button onClick={() => open()}>Connect</Button>
                )}

                <Button classes='py-12 bg-secondary' onClick={createBrodit}>
                    Create Brodit
                </Button>
                <hr className="w-80" />
                <h2>Boxes</h2>
                {boxes.map((t) => (
                    <div key={t.expiration_date} className="bg-gray-100 rounded-lg my-2 p-3">
                        <div>Sender: {t.sender}</div>
                        <div>Receiver: {t.sender}</div>
                        <div>Brodit: {t.brodit}</div>
                        <div>Email: {t.receiver_email}</div>
                    </div>
                ))} 
            </main>
        </WalletProvider>
    )
}