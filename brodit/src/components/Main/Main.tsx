import Image from 'next/image'
import React from 'react'

export default function Main() {
    return (
        <div className='flex flex-col items-center max-w-[1040px] text-center mt-[36px]'>
            <Image alt='memento-logo' src='logo.svg' width={185} height={236} />

            <h2 className='mt-[67px] text-2xl'>Your Friendly neighbourhood Broditor.</h2>
            <h2 className='mt-[53px] text-2xl'>
                <b>Have A Safe deal with your Client,</b> No need to worry about the funds being stucked
                Just book the brodit and create a special channel for you and your clients! 
            </h2>
        </div>
    )
}