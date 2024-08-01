import { useState } from 'react'

import { BrowserRouter, Route , Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import Playground from './screens/Playground/Playground'
import PlaygroundProvider from './Providers/PlaygroundProvider'
import ModalProvider from './Providers/ModalProvider'
function App() {
  

  return (
    <>
      <PlaygroundProvider>
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path ='/' element={<HomeScreen/>}/>
              <Route path ='playground/:fileId/:folderId' element={<Playground/>}/>
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </PlaygroundProvider>
    </>
  )
}   

export default App
