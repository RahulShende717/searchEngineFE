import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './assets/components/SearchBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <SearchBar/>
    </div>
    </>
  )
}

export default App
