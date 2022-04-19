
const jwt = require('jsonwebtoken');
const db = require('./src/database/db');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');
const { Server } = require("socket.io");
const http = require("http");

require('dotenv').config();

//Modulok importálása
const express = require('express');
const cors = require('cors');

//Végpont csoportok importálása
var authRouter = require('./src/routes/auth');
var commentsRouter = require('./src/routes/comments');
var listsRouter = require('./src/routes/lists');
var threadsRouter = require('./src/routes/threads');
var userRouter = require('./src/routes/user');
var votesRouter = require('./src/routes/votes');
var mangaUpdatesRouter = require('./src/routes/mangaUpdates');
var chatRouter = require('./src/routes/chat');

//Express app létrehozása
const app = express();

//Cross-Origin Erőforrás Megosztás(Cross-Origin Resource Sharing - Cors) engedélyezése 
app.use('*', cors());

//Bejövő kéréseket egyből JSON-be illeszti max 12MB méretű lehet a kérés testében lévő adat
app.use(express.json({ limit: '12MB' }));

//Megadott végpontokhoz hozzárendeljük a megfelelő Routers
app.use('/api/auth', cors(), authRouter);
app.use('/api/comments', cors(), commentsRouter);
app.use('/api/lists', cors(), listsRouter);
app.use('/api/threads', cors(), threadsRouter);
app.use('/api/user', cors(), userRouter);
app.use('/api/votes', cors(), votesRouter);
app.use('/api/manga', cors(), mangaUpdatesRouter);
app.use('/api/chat', cors(), chatRouter);


app.get('/', (req, res) => {
    res.send('Home');
});

//Létrehozunk egy http szervert és a szerver beállításai az általunk létrehozott express app objektum lesz
const server = http.createServer(app);

//Elkezdünk egy adott porton figyelni a bejövő kérésekre
server.listen(process.env.PORT, () => {
    console.log(`Listening to ${process.env.PORT}`);
});


const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_ADDRESS,
        credentials:true
    }
});

//Aktív felhaszálokat tárolja
global.onlineUsers = new Map();
//Aktív felhasználóknak a felhasználó id jét tárolja
global.lookupTable = new Map();

//Mikor a kliens csatlakozik ez az esemény lefog futni
io.on("connection",(socket)=> {
    //global.chatSocket = socket;

    //Kliensről add-user eseményt dolgozza fel
    socket.on("add-user", (userId) => {

        //Hozzá adja az aktív felhasználókhoz a kliens
        onlineUsers.set(userId, socket.id);

        //lookupTable be a kliens kapcsolat id-jéhez hozzárendeli a felhasználó idjét
        lookupTable.set(socket.id, userId);
    });


    //Kliensről send-msg eseményt dolgozza fel
    socket.on("send-msg", (data)=>{

        //Ha a megadott kliens bevan jelentkezve, elküldi neki az üzenetet
        const sendUserSocket = onlineUsers.get(data.reciever_id);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data);
        }
    })

    //Lekapcsolódás esetén
    socket.on("disconnect", (reason)=>{
        
        //Megszerzi a kapcsolatot
        const key = lookupTable.get(socket.id);

        //kitörli az online kliensek közül
        onlineUsers.delete(key);
        //Kitörli a lookup tableből
        lookupTable.delete(socket.id);

        //megszerzet kapcsolatot felbontja
        socket.disconnect();
    })
})