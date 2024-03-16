/* eslint-disable no-mixed-spaces-and-tabs */
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import { useEffect, useRef } from "react";
//import useConversation from "../../zustand/useConversation";



const Messages = () => {

	const { messages, loading ,setChatPage,chatPage} = useGetMessages();
	// const {selectedConversation} = useConversation();
	//const { loading } = useGetMessages();
	const lastMessageRef=useRef();
	const messageContainerRef=useRef();
	// sessionStorage.setItem("chatpage",1);
	

     useListenMessages();


	
	 useEffect(() => {
		let prevScrollY = messageContainerRef.current.scrollTop;
	
		const handleScroll = () => {
			const container = messageContainerRef.current;
			const currentScrollY = container.scrollTop;
			const maxScrollY = container.scrollHeight - container.clientHeight;
	
			if (currentScrollY < prevScrollY) {
				console.log("Scrolling up");
			}
			if (currentScrollY === 0) {
				console.log("Reached top");
				setChatPage(chatPage + 1);
			}
			if (currentScrollY === maxScrollY) {
				console.log("Reached bottom");
				setChatPage(Math.max(chatPage - 1, 1));
			}
			prevScrollY = currentScrollY;
		};
	
		const container = messageContainerRef.current;
		if (container) {
			container.addEventListener("scroll", handleScroll);
		}
	
		return () => {
			if (container) {
				container.removeEventListener("scroll", handleScroll);
			}
		};
	}, []);


	return (
		<div ref={messageContainerRef} className={`px-4 flex-1 overflow-auto`} style={{ scrollBehavior: "smooth" }}>
            
			{!loading && messages.length>0 && 
				messages.map((message)=>
				(     <div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					 </div>

				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center text-white'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;