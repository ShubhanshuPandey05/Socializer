import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FirebaseProvidor } from './context/FireBaseContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PostContextProvider } from './context/PostContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseProvidor>
      <PostContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostContextProvider>
    </FirebaseProvidor>
  </React.StrictMode>,
)
