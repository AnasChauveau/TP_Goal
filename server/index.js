const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

let gardeRole = "";

let tabJoueur = [];

let restart = 0;

let game = {
    IdJoueur1: "",
    IdJoueur2: "",
    round: 0,
    roleJoueur1: "Gardien",
    roleJoueur2: "Tireur",
    scoreJoueur1: 0,
    scoreJoueur2: 0,
    tirJoueur1: "",
    tirJoueur2: ""
}

io.on('connection', (socket) => {

    socket.on('getRole', () => {
        socket.emit('myRole')
    })

    socket.on('join', () => {
        if(tabJoueur.length >= 2){
            if(game.IdJoueur1 == socket.id || game.IdJoueur2 == socket.id){
                restart++;
                console.log(restart);
                if(restart == 2){
                    io.to(game.IdJoueur1).emit("lancer");
                    io.to(game.IdJoueur2).emit("lancer");
                    restart = 0;
                }
            }else{
                socket.emit('non')
            }
        }else{
            if(tabJoueur.length == 0){
                tabJoueur.push(socket.id)
                game.IdJoueur1 = socket.id;
            }else{
                tabJoueur.push(socket.id)
                game.IdJoueur2 = socket.id;
                io.to(game.IdJoueur1).emit("lancer");
                io.to(game.IdJoueur2).emit("lancer");
            }
        }  
        // console.log(tabJoueur);
    })

    socket.on('go', () => {
        game.round = 1;
        game.scoreJoueur1 = 0;
        game.scoreJoueur2 = 0;
        io.to(game.IdJoueur1).emit("info", game, 1);
        io.to(game.IdJoueur2).emit("info", game, 2);
    })

    socket.on('tir', (tir) => {
        if(game.IdJoueur1 == socket.id){
            game.tirJoueur1 = tir;
        }else{
            game.tirJoueur2 = tir;
        }

        if(game.tirJoueur1 != "" && game.tirJoueur2 != ""){
            if(game.tirJoueur1 == game.tirJoueur2){
                if(game.roleJoueur1 == "Gardien"){
                    game.scoreJoueur1 += 2;
                }else{
                    game.scoreJoueur2 += 2;
                }
            }else{
                if(game.roleJoueur1 == "Tireur"){
                    game.scoreJoueur1 += 1;
                }else{
                    game.scoreJoueur2 += 1;
                }
            }
            game.tirJoueur1 = "";
            game.tirJoueur2 = "";

            if(game.round == 5){
                if(game.scoreJoueur1 > game.scoreJoueur2){
                    io.to(game.IdJoueur1).emit("end", "GG");
                    io.to(game.IdJoueur2).emit("end", "NOOB");
                }else{
                    io.to(game.IdJoueur1).emit("end", "NOOB");
                    io.to(game.IdJoueur2).emit("end", "GG");
                }
            }else{
                game.round++;
                gardeRole = game.roleJoueur1;
                game.roleJoueur1 = game.roleJoueur2;
                game.roleJoueur2 = gardeRole;
                io.to(game.IdJoueur1).emit("info", game, 1);
                io.to(game.IdJoueur2).emit("info", game, 2);
            }
        }
    })

});

server.listen(3100, () => {
    console.log('Serveur en cours d\'écoute sur le port 3100');
});
