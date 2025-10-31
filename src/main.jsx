import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Aboutpage from './Aboutpage.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Aboutpage />
  </StrictMode>,
)
