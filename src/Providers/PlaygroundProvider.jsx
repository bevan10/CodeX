import React, { createContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {v4} from "uuid"

export const   PlaygroundContext = createContext();

const initialdata =[
    {
      id:v4(),
      title: 'Dsa',
      files:[
        {
          id:v4(),
          title: `index`,
          language: 'cpp',
          code : `cout<<"hello world"`
        }
      ]

    },
    {
      id:v4(),
      title: 'Frontend',
      files:[
        {
          id:v4(),
          title: `test`,
          language: 'javascript',
          code : `cosole.log(hello world)`
        }
      ]

    },

]

 export const defaultCode = {
  'cpp':`#include <iostream>
        int main(){
            std::cout<<"Hello World";
            return 0;
        }`,
  'java':`public class Main
            {
              public static void main(String[] args) {
                System.out.println("Hello World");
              }
            }`,
  'javascript':`console.log("hello world")`,
  'python': `print("hello world")`
}
const PlaygroundProvider = ({children}) => {
  const [folders,setFolder] = useState(()=>{
    const localData = localStorage.getItem('data')
    if (localData){
      return JSON.parse(localData)
    }
    return initialdata
  })

  useEffect(() => {
    
    localStorage.setItem('data',JSON.stringify(folders))
  }, [])
  
  const createNewPlayground =(newPlayround) =>{
    const {folderName,fileName,language} = newPlayround
    const newFolders =[...folders]
    newFolders.push(
      {
        id :v4(),
        title:folderName,
        files:[
          {
            id:v4(),
            title:fileName,
            language:language,
            code:defaultCode[language]
          }
        ]
      }
    )
    localStorage.setItem('data',JSON.stringify(newFolders))
    setFolder(newFolders)
  }

  const createNewFolder = (folderName) => {
    const newFolder = {
        id :v4(),
        title:folderName,
        files:[]
    }

    const allFolders =[...folders,newFolder]
    localStorage.setItem('data',JSON.stringify(allFolders))
    setFolder(allFolders)
  }

  const deleteFolder = (id) => {
    const updatedFolders = folders.filter((folderItem)=>{
      return folderItem.id !== id
    })

    localStorage.setItem('data',JSON.stringify(updatedFolders))
    setFolder(updatedFolders)
  } 

  const updateFolder = (newFolderName,id) =>{
    const updatedFolders = folders.map((folderitem)=>{
        if (folderitem.id === id){
          folderitem.title = newFolderName
        }
        return folderitem
    })
    localStorage.setItem('data',JSON.stringify(updatedFolders))
    setFolder(updatedFolders)
  }

  const updateFileTitle = (newfilename,fileId,folderId)=>{
    const copiedFolders = [...folders]
    for (let i = 0; i < copiedFolders.length; i++) {
     if (copiedFolders[i].id === folderId){
      const file = copiedFolders[i].files
      for (let j = 0; j < file.length; j++) {
        if (file[j].id === fileId){
          file[j].title = newfilename
          break
        }        
      }
      break
     }
    }
    localStorage.setItem('data',JSON.stringify(copiedFolders))
    setFolder(copiedFolders)
  }

  const deleteFile = (fileId,folderId)=>{
    const copiedFolders = [...folders]
    for (let i = 0; i < copiedFolders.length; i++) {
     if (copiedFolders[i].id === folderId){
      const file = [...copiedFolders[i].files]
      for (let j = 0; j < file.length; j++) {
        copiedFolders[i].files = file.filter((file)=>{
          return file.id !== fileId
        })
      }
      break
     }
    }
    localStorage.setItem('data',JSON.stringify(copiedFolders))
    setFolder(copiedFolders)
  }

  const createFile = (folderId, file)=>{
    const copiedFolders = [...folders]
    for (let i = 0; i < copiedFolders.length; i++) {
      if (copiedFolders[i].id === folderId ){
        copiedFolders[i].files.push(file)
        break
      } 
    }
    localStorage.setItem('data',JSON.stringify(copiedFolders))
    setFolder(copiedFolders)
  }

  const getDefaultCode = (fileId,folderId)=>{

    for (let i = 0; i < folders.length; i++) {
      if (folderId === folders[i].id ){
        for (let j = 0; j < folders[i].files.length; j++) {
          const currentFile = folders[i].files[j]
          if (fileId === currentFile.id){
            return currentFile.code
          }
          
        }
      }
      
    }
  }

  const getLanguage = (fileId,folderId)=>{

    for (let i = 0; i < folders.length; i++) {
      if (folderId === folders[i].id ){
        for (let j = 0; j < folders[i].files.length; j++) {
          const currentFile = folders[i].files[j]
          if (fileId === currentFile.id){
            return currentFile.language
          }
          
        }
      }
      
    }
  }

  const updateLanguage =(fileId,folderId,language)=>{
    const newFolder =[...folders]
    for (let i = 0; i < newFolder.length; i++) {
      if (folderId === newFolder[i].id ){
        for (let j = 0; j < newFolder[i].files.length; j++) {
          const currentFile = newFolder[i].files[j]
          if (fileId === currentFile.id){
            currentFile.code = defaultCode[language]
            currentFile.language = language 
            break
          }  
        }
        break
      }
    }
    localStorage.setItem('data', JSON.stringify(newFolder));
    setFolder(newFolder);
  }
   const saveCode = (fileId,folderId,newCode)=>{
    const newFolder =[...folders]
    for (let i = 0; i < newFolder.length; i++) {
      if (folderId === newFolder[i].id ){
        for (let j = 0; j < newFolder[i].files.length; j++) {
          const currentFile = newFolder[i].files[j]
          if (fileId === currentFile.id){
            currentFile.code = newCode
            break
          }  
        }
        break
      }
    }
    localStorage.setItem('data', JSON.stringify(newFolder));
    setFolder(newFolder);
   }
  
  const playgroundFeatures = {
    folders,
    createNewPlayground,
    createNewFolder,
    deleteFolder,
    updateFolder,
    updateFileTitle,
    deleteFile,
    createFile,
    getDefaultCode,
    getLanguage,
    updateLanguage,
    saveCode
  }
  return (
    <PlaygroundContext.Provider value={playgroundFeatures} >
      {children}
    </PlaygroundContext.Provider>
  )
}

export default PlaygroundProvider