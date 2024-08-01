import React, { useContext } from "react";
import ModalProvider, { ModalContext } from "../Providers/ModalProvider";
import { PlaygroundContext } from "../Providers/PlaygroundProvider";

const CreatePlaygroundModal = () => {
  const modalFeatures = useContext(ModalContext)
  const playgroundFeatures = useContext(PlaygroundContext)
  
  const closeModal = ()=>{
    modalFeatures.closeModal()
  }

  const onSubmitModal = (e)=>{
    e.preventDefault();
    
    const folderName = e.target.folderName.value
    const fileName = e.target.fileName.value
    const language = e.target.language.value
    playgroundFeatures.createNewPlayground(
      {
        folderName,
        fileName,
        language
      }
    )
    closeModal();
  }
  return (
    <div className="fixed bg-black inset-0 bg-opacity-50 flex items-center justify-center backdrop-blur-sm"   >
      <div className=" bg-white h-64 w-96 rounded-md ">
        <div className="flex items-center justify-between p-2 font-bold text-xl">
          Create New Playground
          <span className="material-icons hover:cursor-pointer" onClick={closeModal} > close</span>
        </div>
        <div className="flex flex-wrap">
          <form onSubmit={onSubmitModal}>
            <div className="flex justify-between w-96 p-3">
              <p>New Folder</p>
              <input type="text" name="folderName" className="bg-slate-200" required />
            </div>
            <div className="flex justify-between w-96 p-3">
              <p>New Playground</p>
              <input type="text" name="fileName" className="bg-slate-200" required/>
            </div>
            <div className="flex justify-between p-3">
              <select name="language" required>
                <option value="cpp">CPP</option>
                <option value="java">Java</option>
                <option value="javascript">Javascript</option>
                <option value="python">Python</option>
              </select>
              <button className="bg-black text-white p-2 rounded-md" type="submit" 
               >Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaygroundModal;
