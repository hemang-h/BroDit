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

  const { getContract } = useContract()

  const createBrodit = async (brodit: Brodit, date: Date) => {
    const cid = await uploadBrodit(brodit, 'pwd')

    const contract = getContract()
    const id = new Date().getTime()

    await contract.create(id, cid, date!.getTime(), { value: 100 }).then((t) => t.wait())

    alert(`Crated brodit with id ${id}`)
  }
       
      return (
        <>
        <Header page={page} setPage={setPage} />
            <main className="flex min-h-screen flex-col items-center p-24 gap-8 max-w-[1400px] mx-auto px-4 pb-16">

            <Main />

            <CreateBroditForm />

            <BroditBox />             
            </main>
        </>
    )
}