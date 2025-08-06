import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ExpansionSelector from './components/ExpansionSelector'; // <-- Importa el componente

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Pokémon TCG Tracker</h1>
      <ExpansionSelector /> 
    </div>
  )
}

export default App
