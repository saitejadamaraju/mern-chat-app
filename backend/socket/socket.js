import {Server} from 'socket.io';
import http from 'http';
import express from 'express';


const app=express();

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"]
    }
});

export const getReceiverSocketId=(receiverId)=>{
    return userScoketMap[receiverId];
}

const userScoketMap={}

io.on("connection",(socket)=>{

    console.log("user connected ", socket.id);

    const userId=socket.handshake.query.userId;

    if(userId!="undefined") userScoketMap[userId]=socket.id;

    io.emit("onlineUsers",Object.keys(userScoketMap));

    socket.on("disconnect",(socket)=>{
        console.log("user disconnected",socket.id);
        delete userScoketMap[userId];
        io.emit("onlineUsers",Object.keys(userScoketMap));
    })
})


export {app,io,server};