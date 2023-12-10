'use client'

import { useState } from 'react'

import Header from '@/components/Header/Header'
import Main from '@/components/Main/Main'
import CreateBroditForm  from '@/components/CreateBroditForm/CreateBroditForm'

import { Brodit, uploadBrodit } from '../../services/brodit'
import { useContract } from '../../services/contracts'

import LoadingDialog from '@/components/CreateBroditForm/LoadingDialog/LoadingDialog'
import BroditBox from '@/components/BroditBox/BroditBox'


// Before starting run ETH Node with: npm run evm-node
// Then deploy contract locally with: npm run deploy-contract
// Add address output bellow (LATER WILL BE IN ENV)
// const CONTACT_ADDRESS = '0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f'


export default function Home() {
    
    const [page, setPage] = useState('view')
    const [currentStep, setCurrentStep] = useState(0);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    // const [cid, setCid] = useState('');

    
    // const { getContract } = useContract()
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');

    const { getContract } = useContract();

    const createBrodit = async (brodit: Brodit, date: Date) => {
        setShowCreateDialog(true);
        // const cid = await uploadBrodit(brodit, 'pwd')
        const pwd = (Math.random() * 1e8).toString();
        setPwd(pwd);
        const cid = await uploadBrodit(brodit, pwd)

        // setCid(cid);
        setCurrentStep(3)
        const contract = getContract()
        const id = new Date().getTime()
        setId(id.toString());



    await contract.create(id, cid, date!.getTime(), { value: 100 }).then((t) => t.wait())
    // setPwd((Math.random() * 1e8).toString());

    setCurrentStep(4);
  };
       
      return (
        <>
        <Header page={page} setPage={setPage} />
            <main className="flex min-h-screen flex-col items-center p-24 gap-8 max-w-[1400px] mx-auto px-4 pb-16">

            <Main />

            <CreateBroditForm onCreate={createBrodit} />

            {   showCreateDialog &&
                <LoadingDialog
                    currentStep={currentStep}
                    onClose={() => { setShowCreateDialog(false); setId(''); setPwd(''); }}
            link={global.window ? `${window.location.host}/${id}` : id}
                />
            }   

            <BroditBox />             
            </main>
        </>
    )
}