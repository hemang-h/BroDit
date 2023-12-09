import React, { useEffect, useState } from 'react'
import { Brodit, Brodit__factory } from '../../../contract/typechain-types';
import { BrowserProvider } from 'ethers';
import { useAccount } from 'wagmi';
import Image from 'next/image';

export default function BroditBox() {
    const [boxes, setBoxes] = useState<Brodit.BoxStructOutput[]>([]);
    const { address } = useAccount();

    const getContract = async () => {
        const provider = new BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();

        const contract = Brodit__factory.connect(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, signer);
        return { contract, signer };
    };

    useEffect(() => {
        const loadBrodits = async () => {
            const { contract, signer } = await getContract();
            const events = await contract.queryFilter(contract.getEvent('BroditCreated'));

            const ids = events.map((t) => t.args.id);

            const brodits = await Promise.all(ids.map((t) => contract.getBrodit(t)));
            setBoxes(brodits);
        };

        loadBrodits();
    }, [address]);


    // const boxes = Array.from({ length: 10 }).map((_, id) => ({
    //     title: 'title' + id,
    //     broditCid: id
    // }));

    return (
        <section id='box' className='w-full mt-[40px]'>
            <h3 className='text-3xl font-light mb-[18px] capitalize text-center'>Brodit Box</h3>
            <div className='w-full border border-border rounded-[20px] py-[26px] px-[42px]'>

                {boxes.length ? (
                    <table className='w-full'>
                        <tr className='text-watermark text-2xl font-medium'>
                            <td>Title</td>
                            <td>Date Sent</td>
                            <td>Date to Unseal</td>
                            <td>Total Duration</td>
                            <td>Countdown</td>
                        </tr>
                        <tbody>
                            {boxes.map(box => (
                                <tr key={`row-${box.broditCid}`}>
                                    <td>{box.broditCid}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <a href='#send' className='flex flex-col items-center justify-center text-2xl text-watermark'>
                        <Image alt='brodit-box' src='box.svg' width={70} height={70} />
                        Audit with Brodit Now!
                    </a>
                )}
            </div>
        </section>
    );
}