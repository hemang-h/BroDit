'use client'

import { BrowserProvider } from 'ethers'
import { useEffect, useMemo, useState } from 'react'
import { Brodit } from '../../contract/typechain-types/Brodit'
import { Brodit__factory } from '../../contract/typechain-types'
import WalletProvider from '../../contextx/WalletProvider/WalletProvider'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import Button from '../components/Button/Button'
import { useAccount, useDisconnect } from 'wagmi'
import { formatAddress } from '../../utils/formatAddress'
// import { create } from '@web3-storage/w3up-client'
import Main from '@/components/Main/Main'
import CreateBroditForm from '@/components/CreateBroditForm/CreateBroditForm'
import LoadingDialog from '@/components/CreateBroditForm/LoadingDialog/LoadingDialog'



// Before starting run ETH Node with: npm run evm-node
// Then deploy contract locally with: npm run deploy-contract
// Add address output bellow (LATER WILL BE IN ENV)
// const CONTACT_ADDRESS = '0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f'

// Setup local metamask
// RPC_URL: http://127.0.0.1:8545/
// CHAIN_ID: 31337
// Import first account into Metamask from run eth-node output

// cryptography
import useModularArithmetic from './useModularArithmetic';
import ModularArithmeticWorker from './modularArithmetic.worker';

export default function Home() {
    const [boxes, setBoxes] = useState<Brodit.BoxStructOutput[]>([])
    const [page, setPage] = useState('view');
    // TODO: memos, state, etc...
    const { open } = useWeb3Modal();
    const { disconnect } = useDisconnect();
    const { address } = useAccount();

    const e = BigInt(3);
    const m = BigInt(1000000007); // must be prime
    const [forwardComputation, backwardComputation] = useModularArithmetic(e, m);
    const [result, setResult] = useState<string>('');
    const [progress, setProgress] = useState<number>(0);
    const [worker, setWorker] = useState<Worker | null>(null);

    useEffect(() => {
        const newWorker = new ModularArithmeticWorker();
        newWorker.onmessage = (e) => {
            console.log("BLABLA");
            if (e.data.progress) {
                setProgress(e.data.progress);
            }
            if (e.data.result) {
                setResult(`Result: ${e.data.result}`);
            }
        };
        // newWorker.onerror = (error) => {
        //     console.error('Error from worker:', error.message);
        // };
        setWorker(newWorker);

        return () => {
            newWorker.terminate();
        };
    }, []);

    const handleComputation = () => {
        console.log(worker);
        worker?.postMessage({ 
            x: '12345', 
            e: '3', 
            m: '1000000007', 
            steps: '1000000',
            type: 'forward' // or 'backward'
        });
    };

   // const loadMementoes = async () => {
    //     const { contract, signer } = await getContract()
    //     const events = await contract.queryFilter(contract.getEvent('MementoCreated'))

    //     const ids = events.map((t) => t.args.id)

    //     const mementoes = await Promise.all(ids.map((t) => contract.getMemento(t)))
    //     setBoxes(mementoes)
    // }

    // useEffect(() => {
    //     loadMementoes()
    // }, [])
 
      return (
        <WalletProvider>
            <main className="flex min-h-screen flex-col items-center p-24 gap-8 max-w-[1400px] mx-auto">

            <Main />

            <CreateBroditForm />

            <button onClick={handleComputation}>Run Computation</button>
                <p>Progress: {progress}%</p>
                <p>{result}</p>

                {address ? (
                    <>
                        <Button onClick={() => disconnect()}>Disconnect</Button>
                        <div>{address ? `Connected: ${formatAddress(address)}` : ''}</div>
                    </>
                ) : (
                    <Button onClick={() => open()}>Connect</Button>
                )}
                

                           
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