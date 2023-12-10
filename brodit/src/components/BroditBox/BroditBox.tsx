import React, { useEffect, useState } from 'react'
import { Brodit, Brodit__factory } from '../../../contract/typechain-types'
// import { BrowserProvider } from 'ethers'
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'

import Image from 'next/image'

import { useContract } from '../../../services/contracts'
import moment from 'moment'
import Link from 'next/link'

export default function BroditBox() {
    const [boxes, setBoxes] = useState<any[]>([])
    const { getContract } = useContract()
    const { isConnected } = useWeb3ModalAccount()

  useEffect(() => {
    const loadBrodits = async () => {
        if (!isConnected) return

        const contract = getContract()

    //   const ids = events.map((t) => t.args.id)
    const currentBlock = await contract.provider.getBlockNumber()
    const fromBlock = Math.max(currentBlock - 1024, 0) // Ensure we don't go below block 0
    const toBlock = currentBlock
    //   const brodits = await Promise.all(ids.map((t) => contract.getBrodit(t)))
    const events = await contract.queryFilter(
        contract.filters.BroditCreated(),
        fromBlock,
        toBlock
      )

      const ids = events.map((t) => t.args!.id)

      const brodits = await Promise.all(
        ids.map((id) => {
          return contract.getBrodit(id).then((t: any) => ({ ...t, id }))
        })
      )  
    setBoxes(brodits)
    }

    loadBrodits()
 }, [isConnected] )

  return (
    <section id="box" className="w-full mt-[40px]">
      <h3 className="text-3xl font-light mb-[18px] capitalize text-center">Brodit Box</h3>
      <div className="w-full border border-border rounded-[20px] py-[26px] px-[42px]">
        {boxes.length ? (
          <table className="w-full">
            <tbody>
            <tr className="text-watermark text-2xl font-medium mb-2">
              <td>Title</td>
              {/* <td>Date Sent</td> */}
              <td>Date to Unseal</td>
              <td>Action</td>
            </tr>
            
              {boxes.map((box, i) => (
                <tr key={box.id}>
                  <td className="py-1">Memento {i}</td>
                  <td>{moment(new Date(parseInt(box.expirationDate.toString()))).fromNow()}</td>
                  <td>
                    <Link href={`/${box.id}`}>Open</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <a
            href="#send"
            className="flex flex-col items-center justify-center text-2xl text-watermark"
          >
            <Image alt="brodit-box" src="box.svg" width={70} height={70} />
            Send your first Brodit!
          </a>
        )}
      </div>
    </section>
  )
}