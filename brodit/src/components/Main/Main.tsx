import Image from 'next/image';
import React from 'react';
import './styles.css';

export default function Main() {
    return (
        <div className='flex flex-col font-light items-center max-w-[1050px] text-center mt-[36px]'>
            {/* Replace the h2 element with the anchor element */}
            
            <div>
                <Image
                    alt='memento-logo'
                    src='logo.svg'
                    className='logo'
                    width={185}
                    height={236}
                />
                <h1 className='logoTitle'>brodit</h1>
            </div>
            <a href="https://fontmeme.com/batman-font">
                <Image
                    // src="https://fontmeme.com/permalink/231209/a2bc8c4d50277ac89f0cb1374af47fa3.png"
                    src ="https://fontmeme.com/permalink/231209/880c2ad5cf411ed2f2c63dfec827bb0e.png"
                    alt="batman-font"
                    width={750}  // 10 cm in pixels
                    height={680} // 8 cm in pixels
                />
            </a>

            <h2 className='mt-[53px] text-2xl'>
                <b>Have A Safe deal with your Client,</b> No need to worry about the funds being stuck <br />
                 <code>
                    Just book the BroDit and create a special channel for you and your clients! 
                </code>
            </h2>
        </div>
    );
}

// 