import { socket } from '../main'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

function Jeu() {
    const navigate = useNavigate()

    const [recognizedWord, setRecognizedWord] = useState('');
    const [recognition, setRecognition] = useState(null)
    const [recoStarted, setRecoStarted] = useState(false)

    const [boolShot, setBoolShot] = useState(true)

    const [restart, setRestart] = useState(false)

    const [theRound, setTheRound] = useState(0)
    const [theScoreOfBoloss, setTheScoreOfBoloss] = useState(0)
    const [myScore, setMyScore] = useState(0)
    const [myRole, setMyRole] = useState("")
    
    const [theShotOfBoloss, setTheShotOfBoloss] = useState("")
    const [myShot, setMyShot] = useState("")

    useEffect(() => {
        socket.off('info')
        socket.off('end')

        socket.emit('go')
      
        socket.on('info', (game, player) => {
          setBoolShot(true)
          setTheRound(game.round)
          if(player == 1){
            setTheScoreOfBoloss(game.scoreJoueur2)
            setMyScore(game.scoreJoueur1)
            setMyRole(game.roleJoueur1)
            setMyShot(game.tirJoueur1)
            setTheShotOfBoloss(game.tirJoueur2)
          }else{
            setTheScoreOfBoloss(game.scoreJoueur1)
            setMyScore(game.scoreJoueur2)
            setMyRole(game.roleJoueur2)
            setMyShot(game.tirJoueur2)
            setTheShotOfBoloss(game.tirJoueur1)
          }
        })

        socket.on('end', (issue) => {
          if(issue == "GG"){
            alert('Félicitation vous avez gagné !')
            setRestart(true)
          }else{
            alert('Perdu !!! Trop la honte !')
            setRestart(true)
          }
        })
      
        return () => {
          socket.off('info')
          socket.off('end')
        }
    }, [])

    useEffect(() => {
      if(myShot != "" && boolShot == true){
        socket.emit("tir", myShot)
        setBoolShot(false)
      }
    }, [myShot])

    useEffect(() => {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'fr-FR'; // Langue française, ajustez selon vos besoins
      // console.log(recognition)
      recognition.onresult = (event: any) => {
        const last = event.results.length - 1;
        const word = event.results[last][0].transcript.toLowerCase();
        console.log(event.results)
        setRecognizedWord(word);
        // Ajoutez ici la logique pour déclencher une fonction en fonction du mot reconnu
        if(word == "gauche" || word == "centre" || word == "droite"){
          console.log(word)
          setMyShot(word)
        }
      };
      setRecognition(recognition)
    }, []);

    return (
      <body id="bodyJeu">
        {restart == true 
        ? 
        <div onClick={() => navigate("/attente")}>Restart</div> 
        : 
              <>
              {theShotOfBoloss == "" && myShot != ""
              ?
              <div id="message">En attente du joueur Adverse ...</div>
              :
              <div id="message"></div>
              }
                
                <div id="headerJeu">
                    <h2 id="role">Vous êtes {myRole} !</h2>
                    <h2 id="score">You: {myScore}-{theScoreOfBoloss} :boloss</h2>
                    <h2 id="round">Round {theRound}/5</h2>
                </div>
                <div className="allCenter">
                    <div id="ongletJeu">
                        <div id="cageGauche" onClick={() => setMyShot("gauche")}><img className="focus" src="public/img/focus.png"/></div>
                        <div id="cageCentre" onClick={() => setMyShot("centre")}><img id="gardien" src="public/img/gardien.png"/></div>
                        <div id="cageDroite" onClick={() => setMyShot("droite")}><img className="focus" src="public/img/focus.png"/></div>
                    </div>
                </div>
                <div>
                  <p>Le mot reconnu est : {recognizedWord}</p>
                  <button onClick={() => {
                    if(recoStarted){
                        recognition && recognition.stop()
                    }  
                    else {
                        recognition && recognition.start()
                        setTimeout(() => {
                            recognition.stop()
                            setRecoStarted(false)
                        }, 2000)
                    }
                    setRecoStarted(!recoStarted)
                }}>{recoStarted ? "Stop" : "Start"}</button>
                </div>
              </>
        }

    </body>
    )
  }
  
  export default Jeu