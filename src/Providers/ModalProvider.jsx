import React, { createContext, useState } from 'react'
import CreatePlaygroundModal from '../Modals/CreatePlaygroundModal';

export const ModalContext = createContext(); 

export const modalConstants = {
  CREATE_PLAYGROUND:'CREATE_PLAYGROUND',
  CREATE_FOLDER:'CREATE_FOLDER',
  UPDATE_FOLDER:'UPDATE_FOLDER',
  UPDATE_FILE_TITLE:'UPDATE_FILE_TITLE',
  CREATE_CARD:'CREATE_CARD'
}
      


const ModalProvider = ({children}) => {
      const [modalType,setModalType]=useState(null)
      const [modalPayload, setmodalPayload] = useState(null)

      const closeModal =()=>{
            setModalType(null)
      }
      const modalFeatures = {
            openModal:setModalType,
            closeModal,
            activeModal : modalType,
            modalPayload,
            setmodalPayload
      }
  return (
    <ModalContext.Provider value={modalFeatures}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider