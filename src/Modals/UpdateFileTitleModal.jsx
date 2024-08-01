import React from 'react'
import { useContext } from 'react'
import { ModalContext } from '../Providers/ModalProvider'
import { PlaygroundContext } from '../Providers/PlaygroundProvider'
const UpdateFileTitleModal = () => {
      
  const {closeModal,modalPayload} = useContext(ModalContext)
  const {updateFileTitle} = useContext(PlaygroundContext)
  
  
  const onSubmitModal = (e) =>{
      e.preventDefault()
      const fileName = e.target.fileName.value
      
      updateFileTitle(fileName,modalPayload.fileId,modalPayload.folderId)
      closeModal()
  }

  return (
      <div className="fixed bg-black inset-0 bg-opacity-50 flex items-center justify-center backdrop-blur-sm "   >
      <div className=" bg-white rounded-md p-5 ">
        <div className="flex items-center justify-between p-2 font-bold text-xl">
          Update Card Name
          <span className="material-icons hover:cursor-pointer" onClick={closeModal} > close</span>
        </div>
        <div className="flex flex-wrap">
          <form onSubmit={onSubmitModal}>
            <div className="flex justify-between w-96 p-3">
              
              <input type="text" name="fileName" className="bg-slate-200 px-2" required />
              <button className="bg-black text-white p-2 rounded-sm hover:bg-gray-900" type="submit" 
               >Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateFileTitleModal