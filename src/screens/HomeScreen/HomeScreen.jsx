import React, { useContext } from 'react'
import RightComponent from './RightComponent'
import Modal from '../../Modals/Modal'
import { modalConstants, ModalContext } from '../../Providers/ModalProvider'
const HomeScreen = () => {
      const modalFeatures = useContext(ModalContext)
      const openCreatePlaygroundModal = ()=>{
            modalFeatures.openModal(modalConstants.CREATE_PLAYGROUND)
      }
  return (
    <>
      <div className='w-screen min-h-screen flex'>
            <div className='bg-neutral-300 w-[40%] '>
                  <div className=' flex items-center justify-center w-full h-full flex-col gap-3'>
                        <img src="logo.png" alt="" className='w-[40%]' />
                        <div className='text-6xl'>
                              <span>Code</span><span className='font-bold'>X</span>
                              
                        </div>
                        Code.Compile.Debug
                        <button className='bg-gray-600 rounded-full w-1/2 p-2 text-white font-semibold'
                              onClick={openCreatePlaygroundModal}>Create New Playground</button>
                        
                  </div>
            </div>
            <div className='bg-neutral-950 w-[60%] h-[100vh] overflow-y-scroll'>
                  <RightComponent/>
            </div>
            <Modal/>

      </div>
    </>

  )
}

export default HomeScreen