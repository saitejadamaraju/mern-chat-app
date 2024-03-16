import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import {toast} from 'react-hot-toast';

const useGetMessages = () =>{

    const [loading,setLoading]=useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();
    const [chatPage,setChatPage]=useState(1);

    useEffect(()=>{
        const getMessages = async () => {
         
            setLoading(true);
            try {
                
                //const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const res = await fetch(`/api/messages/${selectedConversation._id}?page=${chatPage}`);
                const data = await res.json();
    
                if(data.error)
                {
                  throw new Error(data.error);
                }
                
                // console.log(`chat page ${chatPage} data is ${data}`);
                    setMessages(data)      
                         
                
                
            } catch (error) {
                
               toast.error(error.message);       
            }
            finally{
                setLoading(false);
            }
    
        };

        if (selectedConversation?._id) getMessages();

    },[selectedConversation?._id, setMessages,chatPage])

    return { messages, loading,setChatPage,chatPage};
    
}

export default useGetMessages;



