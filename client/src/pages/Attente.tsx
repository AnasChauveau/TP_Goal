import { socket } from '../main'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Attente() {
    const navigate = useNavigate()

    useEffect(() => {
        socket.off('lancer')

        socket.emit('join');
      
        socket.on('lancer', () => {
            navigate("/jeu")
        })
      
        return () => {
          socket.off('lancer')
        }
    }, [])

    return (
      <>
          <div>En Attente d'un autre joueur ...</div>
      </>
    )
  }
  
  export default Attente