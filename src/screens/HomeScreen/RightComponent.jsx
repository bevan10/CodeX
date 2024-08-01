import React, { useContext } from "react";
import  { PlaygroundContext } from "../../Providers/PlaygroundProvider";
import { modalConstants, ModalContext } from "../../Providers/ModalProvider";
import { useNavigate } from "react-router-dom";

const Folder = ({ folderTitle, cards ,folderId}) => {
  const {deleteFolder,deleteFile} = useContext(PlaygroundContext)
  const {openModal,setmodalPayload} = useContext(ModalContext)
  const navigate = useNavigate()
  const onDeleteFolder = ()=>{
    deleteFolder(folderId)
  }
  const onUpdateFolder = () =>{
    setmodalPayload(folderId)
    openModal(modalConstants.UPDATE_FOLDER)
  }
  const onFile = () =>{
    setmodalPayload(folderId)
    openModal(modalConstants.CREATE_CARD)
  }
  return(

        <div className="flex flex-col gap-3">
      <div className="flex justify-between border-b-[1px]">
        <span className="font-semibold text-xl">{folderTitle}</span>
        <div className="flex items-center">
          <button>
            <span className="material-icons" onClick={onDeleteFolder}>delete</span>
          </button>
          <button>
            <span className="material-icons" onClick={onUpdateFolder}>edit</span>
          </button>
          <button onClick={onFile}>
            <span className="material-icons">add</span>New Playground
          </button>
        </div>
      </div>
      <div className="w-full h-auto flex flex-wrap justify-between gap-4 ">
        {cards?.map((file, index) => {
          const onUpdate = (event)=>{
            // event.preventDefault();
            event.stopPropagation();
            setmodalPayload({fileId :file.id , folderId :folderId})
            openModal(modalConstants.UPDATE_FILE_TITLE)
          }
          const onDelete = (event) =>{
            // event.preventDefault();
            event.stopPropagation();
            deleteFile(file.id,folderId)
          }
          const navigateToPlayground =()=>{
            navigate(`/playground/${file.id}/${folderId}`)
          }
              return (
                    <div className="w-[45%] min-h-16 flex justify-between bg-neutral-800 rounded-lg p-4 cursor-pointer" key={index} onClick={navigateToPlayground}>
              <div className="flex">
                <div className="h-full w-[15%] flex items-center mr-2">
                  <img src="logo.png" alt="" />
                </div>
                <div className="flex flex-col justify-center">
                 {file?.title}
                  <span>Lang: {file?.language}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button>
                  <span className="material-icons" onClick={onDelete}>delete</span>
                </button>
                <button>
                  <span className="material-icons" onClick={onUpdate}>edit</span>
                </button>
              </div>
            </div>
          );
      })}
      </div>
    </div>
)
  
};

const RightComponent = () => {
  const {folders} = useContext(PlaygroundContext);
  const modalFeature = useContext(ModalContext)

  const CreateNewFolderModal = () => {
    modalFeature.openModal(modalConstants.CREATE_FOLDER)
  }
  
  return (
    <>
      <div className="w-full h-auto text-white p-5  ">
        <div className="flex w-full h-auto justify-between mb-12">
          <span className="font-extrabold text-3xl">My Playground</span>

          <button className="cursor-pointer" onClick={CreateNewFolderModal}>New Folder</button>
        </div>
        {folders?.map((folder, index) => {
            return <Folder folderTitle={folder?.title} cards={folder?.files} key={index} folderId={folder?.id} />
            
        })}
      </div>
    </>
  );
};

export default RightComponent;
