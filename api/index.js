const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./src/database/db');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');
const { Server } = require("socket.io");
const http = require("http");

require('dotenv').config();

const app = express();
app.use('*', cors());
app.use(express.json({ limit: '12MB' }));


var authRouter = require('./src/routes/auth');
var commentsRouter = require('./src/routes/comments');
var listsRouter = require('./src/routes/lists');
var threadsRouter = require('./src/routes/threads');
var userRouter = require('./src/routes/user');
var votesRouter = require('./src/routes/votes');
var mangaUpdatesRouter = require('./src/routes/mangaUpdates');
var chatRouter = require('./src/routes/chat');

app.use('/api/auth', cors(), authRouter);// localhost:3001/api/auth
app.use('/api/comments', cors(), commentsRouter);// localhost:3001/api/comments
app.use('/api/lists', cors(), listsRouter);// localhost:3001/api/lists
app.use('/api/threads', cors(), threadsRouter);// localhost:3001/api/threads
app.use('/api/user', cors(), userRouter);// localhost:3001/api/user
app.use('/api/votes', cors(), votesRouter);// localhost:3001/api/votes
app.use('/api/manga', cors(), mangaUpdatesRouter);// localhost:3001/api/manga
app.use('/api/chat', cors(), chatRouter);// localhost:3001/api/chat


app.get('/', (req, res) => {
    res.send('Home');
});

app.get('/uuid/:manga_id', (req, res) => {
    res.send(uuidValidate(req.params.manga_id));
});

app.get('/token', (req, res) => {
    const accessToken = jwt.sign({ email:"davidkah20@gmail.com", method:"login", role: "user"},
        process.env.SECRET_KEY,
        {expiresIn: "89280m"}
        );
    
    res.json({
        success: true,
        token: 'Bearer ' + accessToken
    });
});

app.get('/db', (req,res) => {
    //News Services Table
    sql = 'SELECT * FROM `users`';

    db.query(sql, (err, result) => {
        if (err) {
            console.log('Something\'s wrong with the News Services table creation: ' + err);
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log(`Listening to ${process.env.PORT}`);
});

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3011",
        credentials:true
    }
});

global.onlineUsers = new Map();
global.lookupTable = new Map();

io.on("connection",(socket)=> {
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        
        // console.log("addUser Id: ", userId);
        // console.log("AddUser Socket: ", socket.id);
        onlineUsers.set(userId, socket.id);
        lookupTable.set(socket.id, userId);
        //console.log(onlineUsers);
    });

    socket.on("send-msg", (data)=>{
        //console.log("Send msg data: ", data);
        const sendUserSocket = onlineUsers.get(data.reciever);
        if(sendUserSocket){
            //console.log("send user socket: ", sendUserSocket);
            socket.to(sendUserSocket).emit("msg-recieve",data);
        }
    })

    socket.on("disconnect", (reason)=>{
        //console.log("DISCONNECTING");
        //console.log(reason);
        
        const key = lookupTable.get(socket.id);

        onlineUsers.delete(key);
        lookupTable.delete(socket.id);

        socket.disconnect();
    })
})