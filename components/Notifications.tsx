import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Modal, Text } from '@nextui-org/react';

const Notifications = () => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  function closeHandler() {
    setVisible(false);
    console.log("closed");
  }

  return (
    <div>
      <h3 className="text-xl font-bold pb-5 border-b-[0.9px] border-[#1d1d1d]">Notification</h3>
      <div>
        <button onClick={handler} className='flex py-3 space-x-2 border-b-[0.9px] border-[#1d1d1d]'>
          <Image src="https://bit.ly/3Ql5YKK" alt="Proflie" width={40} height={40} className="rounded-full" />
          <div className='flex flex-col items-start'>
            <h4 className='font-bold'>Hello Bhacho To kase ho aap!</h4>
            <span className='text-sm font-medium text-[#707070]'>24m ago</span>
          </div>
        </button>
        <button onClick={handler} className='flex py-3 space-x-2 border-b-[0.9px] border-[#1d1d1d]'>
          <Image src="https://bit.ly/3Ql5YKK" alt="Proflie" width={40} height={40} className="rounded-full" />
          <div className='flex flex-col items-start'>
            <h4 className='font-bold'>Another notification message</h4>
            <span className='text-sm font-medium text-[#707070]'>24m ago</span>
          </div>
        </button>
        {/* Add more notifications here */}
      </div>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        css={{ background: '#202020', }}
      >
        <Modal.Header>
           <Text b color="white" size={18}> Hello Bhacho To kase ho aap!</Text>
        </Modal.Header>
      </Modal>
    </div>
  );
};

export default Notifications;
