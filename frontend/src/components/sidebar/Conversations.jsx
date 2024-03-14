/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import useGetConversation from "../../hooks/useGetConversation";
import { getRandomEmoji } from "../../utils/getRandomEmojis";
import useConversation from "../../zustand/useConversation";
import Conversation from "./Conversation";

const Conversations = () => {

	const {loading,conversations}=useGetConversation();
	const {searchString} = useConversation();
    const [filterdConversations,setFilteredConversations]=useState([]);

	useEffect(() => {
        if (searchString) {
            const filterConvos = conversations.filter(conversation => conversation.fullName.toLowerCase().includes(searchString.toLowerCase()));
            setFilteredConversations(filterConvos);
        }
    }, [searchString, conversations]);

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{searchString ? 
			
			(filterdConversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))) :
			
			
			(conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			)))
			}			 
			 {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;