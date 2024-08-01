import React, { useCallback, useContext, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Editor from "@monaco-editor/react"
import { useState } from 'react'
import { defaultCode, PlaygroundContext } from '../../Providers/PlaygroundProvider'
import { makeSubmission } from './service'


const Playground = () => {
  const params = useParams()
  const {fileId,folderId} = params
  // console.log({params})
  const {getDefaultCode, getLanguage, updateLanguage, saveCode, folders, updateFileTitle}= useContext(PlaygroundContext)
  
  const [title, setTitle] = useState('')
  const [code, setCode] = useState(()=>getDefaultCode(fileId,folderId))
  const [language, setLanguage] = useState(()=> getLanguage(fileId,folderId))
  const [theme, setTheme] = useState("vs-dark")
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const codeRef = useRef(code)

  useEffect(() => {
    
    if (folders && folders.length > 0) {
      for (let i = 0; i < folders.length; i++) {
        if (folderId === folders[i].id) {
          for (let j = 0; j < folders[i].files.length; j++) {
            const currentFile = folders[i].files[j];
            if (fileId === currentFile.id) {
              console.log(currentFile.title);
              setTitle(currentFile.title);
              break;
            }
          }
          break;
        }
      }
    }
  }, [folderId, fileId, folders]);
  
  
  const editorOptions={
    fontSize:16
    
  }
  const fileExtensionMapping = {
    cpp : "cpp",
    java : 'java',
    python : 'py',
    javascript : 'js'
  } 

  const onChangeCode = (newCode) =>{
    codeRef.current = newCode
  }

  const importCode =(e)=>{
    const file = e.target.files[0]
    const fileType = file.type.includes('text')
    if (fileType){
      const fileReader = new FileReader()
      fileReader.readAsText(file)
      fileReader.onload = function(value){
        const importedCode = value.target.result
        setCode(importedCode)
        codeRef.current = importedCode
      }
    }
    else {
      alert("wrong file type")
    }
  } 

  const exportCode =()=>{
    const codeValue = codeRef.current?.trim()
    if (!codeValue){
      alert("No code written")
    }
    else{
      const codeBlob = new Blob([codeValue],{type:"text/plain"})
      const downloadUrl = URL.createObjectURL(codeBlob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `code.${fileExtensionMapping[language]}`
      link.click()
    }
  }

  const onChangeLanguage = (e) => {
    updateLanguage(fileId,folderId,e.target.value)
    setCode(getDefaultCode(fileId,folderId))
    setLanguage(e.target.value);
  };
  const onChangeTheme =(e)=>{
    setTheme(e.target.value)
  }
  const importInput= (e)=>{
    const file = e.target.files[0]
    const fileType = file.type.includes('text')
    if (fileType){
      const fileReader = new FileReader()
      fileReader.readAsText(file)
      fileReader.onload = (e)=> setInput(e.target.result)
    }
    else {
      alert("wrong file type")
    }
  
  }
  const exportOutput = ()=>{
    const outputValue = output.trim()
    if (!outputValue){
      alert("No code written")
    }
    else{
      const codeBlob = new Blob([outputValue],{type:"text/plain"})
      const downloadUrl = URL.createObjectURL(codeBlob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = 'output.txt'
      link.click()
    }
  }
  const onSaveCode=()=>{
    saveCode(fileId,folderId,codeRef.current)
    alert('code saved Sucessfully')
  }
  const callback = ({ apiStatus, data, message }) => {
    if (apiStatus === 'loading') {
      setLoading(true)
    } else if (apiStatus === "error") {
      setLoading(false)
      console.log(message)
      setOutput("Something went wrong: " + (message))
    } else {
      setLoading(false)
      if (data.status.id === 3) {
        setOutput(atob(data.stdout))
      } else {
        setOutput(atob(data.stderr))
      }
    }
  }
  
  const runCode = useCallback(
    () => {
      makeSubmission({ code: codeRef.current, language, callback, stdin: input })
    },
    [input, language]
  )
  
  


  return (
    <>
      <div className='w-screen h-screen'>
        <div className='h-[10%] bg-neutral-900 flex justify-center items-center text-white font-extrabold text-3xl '>
          {/* <img src="logo.png" alt="no photo" /> */}
           CodeX
        </div>
        <div className=' h-[90%] flex border-neutral-900 border-[15px] border-t-0'>
          <div className=' h-full w-[70%] border-r-[15px] border-neutral-900 font-semibold'>
            <div className='h-[10%] bg-neutral-600 flex justify-between items-center p-3 '>
              <div className=' text-white flex gap-11'>
                <span className='font-bold text-2xl'>{title}</span>
                <div className='flex items-center justify-center gap-2'>

                  <button onClick={onSaveCode} className='p-1 px-6 rounded-full bg-green-700 hover:bg-green-600 '>Save</button>
                </div>
              </div>
              <div className=' flex gap-3 '>
                <select required  onChange={onChangeLanguage} value={language}>
                  <option value="cpp">CPP</option>
                  <option value="java">Java</option>
                  <option value="javascript">Javascript</option>
                  <option value="python">Python</option>
                </select>

              <select name="theme" id="" required value={theme} onChange={onChangeTheme}>
                <option value="vs-dark">Dark</option>
                <option value="vs-light">Light</option>
              </select>
              </div>
            </div>
            <div className='h-[80%]'>
              <Editor
                language={language}
                options={editorOptions}
                theme={theme}
                value={code}
                onChange={onChangeCode}
              />
            </div>
            <div className='h-[10%] bg-neutral-600 flex justify-between items-center p-4 font-semibold text-white ' >
              <button className='bg-neutral-800 px-6 py-2 hover:bg-neutral-900'>FullScreen</button>
              <label htmlFor='input-code' className='bg-neutral-800 px-6 py-2 hover:bg-neutral-900'>Import Code</label>
              <input type="file" id='input-code' hidden onChange={importCode} />
              <button className='bg-neutral-800 px-6 py-2 hover:bg-neutral-900' onClick={exportCode}>Export Code</button>
              <button onClick={runCode} className='p-2 px-6 rounded-full bg-green-700 hover:bg-green-600 '>Run</button>
            </div>
          </div>


          <div className=' h-full w-[30%] text-white '>
            <div className='h-[50%]  border-b-[15px] border-neutral-900 '>
              <div className='h-[18%] bg-neutral-600  flex justify-between items-center p-4 font-semibold'>
                <span className='font-bold text-lg'>Input :</span>
                <label htmlFor="import" className='flex items-center cursor-pointer hover:bg-neutral-950 p-1 rounded-sm pr-2'>
                  <span className='material-icons cursor-pointer pt-1 '> download</span>
                    Import
                </label>
                <input type="file" id='import' hidden onChange={importInput}/>
              </div>
              <div className=' h-full'>
                <textarea value={input} onChange={(e)=> setInput(e.target.value)} className=' w-full h-[82%] outline-none text-black p-2 resize-none'></textarea>
              </div>
            </div>
            <div className='h-[50%] '>
              <div className='h-[18%] bg-neutral-600  flex justify-between items-center p-4 font-semibold' >
              <span className='font-bold text-lg'>Output :</span>
                <button onClick={exportOutput} className='flex items-center  hover:bg-neutral-950 p-1 rounded-sm pr-2'>
                  <span className='material-icons pt-1'>upload</span>
                    Export
                </button>
                
              </div>
              <div>
                <textarea value={output} readOnly onChange={(e)=> setOutput(e.target.value)} className=' w-full h-[82%] outline-none text-black p-2 resize-none'></textarea>
              </div>
            </div>
          </div>
        </div>
        {loading && <div className='fixed bg-black inset-0 bg-opacity-50 flex items-center justify-center backdrop-blur-sm '>
          <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
  ></div>
        </div>}
      </div>
    </>
  )
}

export default Playground