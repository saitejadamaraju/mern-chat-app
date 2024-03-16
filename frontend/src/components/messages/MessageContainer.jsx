// import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { IoArrowBack } from "react-icons/io5";
import { useAuthContext } from "../../context/AuthContext";


const MessageContainer = () => {

	const {selectedConversation,setSelectedConversation} = useConversation();
	
    //  
    // useEffect(()=>{
      
	// 	return ()=> setSelectedConversation(null);

	// },[setSelectedConversation])

	const goToConvos = ()=>{

		setSelectedConversation(null);
	}

	return (
		<div className='md:min-w-[450px] flex flex-col '>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2 flex justify-between items-center'>
						
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
						
						<button onClick={goToConvos} type='submit' className='sss text-black text-right'>
							<IoArrowBack className='w-3 h-3 outline-none' />{" "}
						</button>
						
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;


const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};