
import {useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate()

  return (
    <>   
      <button onClick={() => navigate("/attente")}>
        Commencer
      </button>
    </>
  )
}

export default App
