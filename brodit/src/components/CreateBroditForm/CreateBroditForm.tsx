import React, { FormEvent, useState } from 'react';
import InputField from '../InputField/InputField';
import UploadFile from '../UploadFile/UploadFile';
import { NFTStorage } from 'nft.storage';
import Button from '../Button/Button';
import SelectTrigger from './SelectTrigger/SelectTrigger';
import { Brodit, emptyBrodit, uploadBrodit } from '../../services/brodit';
import { BrowserProvider } from 'ethers';
import { useAccount } from 'wagmi';
import { Brodit__factory } from '../../../contract/typechain-types';
// import { title } from 'process';

export default function CreateBroditForm() {
    const [brodit, setBrodit] = useState<Brodit>(emptyBrodit);
    // const [trigger, setTrigger] = useState('');
    const { address } = useAccount();

    const getContract = async () => {
        const provider = new BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner(address);

        const contract = Brodit__factory.connect(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, signer);
        return { contract, signer };
    }

    const createBrodit = async () => {
        const cid = await uploadBrodit(brodit, 'pwd')

        const { contract, signer } = await getContract();

        await contract.create(
            cid,
            signer.address,
            new Uint8Array([123]),
            Date.now() + 1000,
            'example@will.be.encrypted.com'
        ).then((t) => t.wait());

        alert(`Crated brodit with id ${cid}`);
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        createBrodit();
    };

    const handleChange = (field: keyof Brodit) => (value: any) => {
        setBrodit({ ...brodit, [field]: value });
    }

    return (
        <form className='w-full' onSubmit={onSubmit}>
            <h3 className='text-2xl font-light mb-[8px]'>Step1. Book Brodit your with client/Auditor</h3>
            <div className='flex gap-[20px]'>
                <div className='max-w-[800px] w-full border border-border rounded-[20px] h-[470px] py-[24px] px-[42px] text-2xl'>
                    <InputField value={brodit.title} setValue={handleChange('title')} placeholder='Enter a subject' />

                    <textarea
                        value={brodit.description}
                        className='mt-2 outline-none pb-1 bg-bg w-full placeholder:text-watermark h-[380px] max-h-[380px] resize-none'
                        placeholder='To...'
                        onChange={handleChange('description')}
                    />
                </div>

                <UploadFile files={brodit.files} setFiles={handleChange('files')} />
            </div>

            <div className='w-full max-w-[450px] ml-auto mt-4 px-2'>
                <Button
                    type='submit'
                    classes='w-full text-2xl px-[190px] py-[90px] w-fit'
                >
                    Sign & Seal 
                </Button>
            </div>
             {/* <SelectTrigger trigger={trigger} setTrigger={setTrigger} /> */}
        </form>
    );
}