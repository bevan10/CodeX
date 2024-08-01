import React, { useContext } from 'react'
import { PlaygroundContext } from '../Providers/PlaygroundProvider'
import { ModalContext } from '../Providers/ModalProvider'
import { defaultCode } from '../Providers/PlaygroundProvider'
import { v4 } from 'uuid'

const CreateCardModal = () => {
      const {closeModal,modalPayload} = useContext(ModalContext)
      
      const {createFile} = useContext(PlaygroundContext)
      const onSubmitModal= (e)=>{
            e.preventDefault()
            const fileName = e.target.fileName.value
            const language = e.target.language.value

            const file ={
                  id:v4(),
                  title:fileName,
                  language,
                  code:defaultCode[language]
            }
            createFile(modalPayload,file)
            closeModal()
      }
  return (
      <div className="fixed bg-black inset-0 bg-opacity-50 flex items-center justify-center backdrop-blur-sm"   >
      <div className=" bg-white w-96 rounded-md ">
        <div className="flex items-center justify-between p-2 font-bold text-xl">
          Create New File
          <span className="material-icons hover:cursor-pointer" onClick={closeModal} > close</span>
        </div>
        <div className="flex flex-wrap">
          <form onSubmit={onSubmitModal}>
            
            <div className="flex justify-between w-96 p-3">
              
              <input type="text" name="fileName" className="bg-slate-200 pl-2" placeholder='Enter File Name' required/>
              <select name="language" id="" required>
                <option value="cpp">CPP</option>
                <option value="java">Java</option>
                <option value="javascript">Javascript</option>
                <option value="python">Python</option>
              </select>

            </div>
            <div className="flex justify-center p-3">
              <button className="bg-black text-white p-2 rounded-md" type="submit" 
               >Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateCardModal