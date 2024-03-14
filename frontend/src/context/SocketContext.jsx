import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client';
import { useAuthContext } from "./AuthContext";
export const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	
    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers]=useState([]);
    const {authUser}=useAuthContext();

    useEffect(()=>{
        if(authUser)
        {
               const socket=io("https://secrets-b29v.onrender.com/",{
                query:{
                    userId:authUser._id,
                }
               });
               setSocket(socket);

               socket.on("onlineUsers",(users)=>{
                  setOnlineUsers(users);
               })


               return ()=>socket.close() ;       
        }
        else
        {
            if(socket)
            {
                socket.close();
                setSocket(null);
            }
        }


    },[authUser])

	return <SocketContext.Provider value={{ socket,onlineUsers }}>{children}</SocketContext.Provider>;
};