import Conversation from "../models/conversation.model.js"; 
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async(req,res)=>{

    try {

        const {id:receiverId} = req.params;
        const {message} = req.body;

        const senderId = req.user._id;

    let conversation = await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
    })

    if(!conversation)
    {
       conversation = await Conversation.create({
            participants:[senderId,receiverId],
        })
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message
    });

    if(newMessage)
    {
        conversation.messages.push(newMessage._id);
    }
    
    //saves both conversation and message in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId=getReceiverSocketId(receiverId);

    if(receiverSocketId)
    {
        io.to(receiverSocketId).emit("newMessage",newMessage);
    }
    
    
    res.status(200).json(newMessage);
        
    } catch (error) {
        
        console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
    
    
}

export const getMessages = async(req,res)=>{

    try {

        const {id:userToChatId} = req.params;
        const senderId = req.user._id;
        let page=req.query?.page;
        const limit=15;
        let messages;
         
        if(page)
        {
            const conversation = await Conversation.findOne({
                participants :{$all:[senderId,userToChatId]},
            });
    
            if(!conversation) return res.status(200).json([]);
            
    
            const totalMessages=conversation.messages.length;
    
            const totalPages= Math.ceil(totalMessages / limit);
    
            //page=totalPages-page+1;
    
            const convos = await Conversation.findOne({
                participants :{$all:[senderId,userToChatId]},
            }).populate({
                path: "messages",
                options: {
                    sort: { createdAt: -1 }, // Sort messages by createdAt in descending order
                    skip: (page - 1) * limit, // Skip messages based on the page number and limit
                    limit: limit, // Limit the number of messages fetched per page
                },
            });
            
            messages=convos.messages.reverse();
    
        }
        else
        {
            
		    const conversation = await Conversation.findOne({
			    participants: { $all: [senderId, userToChatId] },
		    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		    if (!conversation) return res.status(200).json([]);

		    messages = conversation.messages;
        }
        
        res.status(200).json(messages);
        
    } catch (error) {
        
        console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}