import React, { useContext } from 'react'
import { modalConstants, ModalContext } from '../Providers/ModalProvider'
import CreatePlaygroundModal from './CreatePlaygroundModal';
import CreateFolderModal from './CreateFolderModal';
import UpdateFolderModal from './UpdateFolderModal';
import UpdateFileTitleModal from './UpdateFileTitleModal';
import CreateCardModal from './CreateCardModal';

const Modal = () => {
      const modalFeatures = useContext(ModalContext);
  return (
    <>
      {
            modalFeatures.activeModal === modalConstants.CREATE_PLAYGROUND && <CreatePlaygroundModal/>
      }
      {
            modalFeatures.activeModal === modalConstants.CREATE_FOLDER && <CreateFolderModal/>
      }
      {
            modalFeatures.activeModal === modalConstants.UPDATE_FOLDER && <UpdateFolderModal/>
      }
      {
            modalFeatures.activeModal === modalConstants.UPDATE_FILE_TITLE && <UpdateFileTitleModal/>
      }
      {
            modalFeatures.activeModal === modalConstants.CREATE_CARD && <CreateCardModal/>
      }
    </>
  )
}

export default Modal