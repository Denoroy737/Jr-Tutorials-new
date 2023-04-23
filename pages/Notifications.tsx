import React from 'react'
import Image from 'next/image'

const Notifications = () => {
  return (
    <div>
      <h3 className="text-xl font-bold pb-5 border-b-[0.9px] border-[#1d1d1d]">Notification</h3>
      <div>
        <div className='flex py-3 space-x-2 items-center border-b-[0.9px] border-[#1d1d1d]'>
          <Image src="https://bit.ly/3Ql5YKK" alt="Proflie" width={40} height={40} className="rounded-full" />
          <div>
            <h4 className='font-bold'>Hello Bhacho To kase ho aap!</h4>
            <span className='text-sm font-medium text-[#707070]'>24m ago</span>
          </div>
        </div>
        <div className='flex py-3 space-x-2 items-center border-b-[0.9px] border-[#1d1d1d]'>
          <Image src="https://bit.ly/3Ql5YKK" alt="Proflie" width={40} height={40} className="rounded-full" />
          <div>
            <h4 className='font-bold'>Hello Bhacho To kase ho aap!</h4>
            <span className='text-sm font-medium text-[#707070]'>24m ago</span>
          </div>
        </div>
        <div className='flex py-3 space-x-2 items-center border-b-[0.9px] border-[#1d1d1d]'>
          <Image src="https://bit.ly/3Ql5YKK" alt="Proflie" width={40} height={40} className="rounded-full" />
          <div>
            <h4 className='font-bold'>Hello Bhacho To kase ho aap!</h4>
            <span className='text-sm font-medium text-[#707070]'>24m ago</span>
          </div>
        </div>
        <div className='flex py-3 space-x-2 items-center border-b-[0.9px] border-[#1d1d1d]'>
          <Image src="https://bit.ly/3Ql5YKK" alt="Proflie" width={40} height={40} className="rounded-full" />
          <div>
            <h4 className='font-bold'>Hello Bhacho To kase ho aap!</h4>
            <span className='text-sm font-medium text-[#707070]'>24m ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
