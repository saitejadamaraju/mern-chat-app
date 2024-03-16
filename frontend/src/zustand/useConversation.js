import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
	searchString:null,
	setSearchString:(searchString)=>set({searchString}),
	isSmallScreen:false,
	setIsSmallScreen:(isSmallScreen)=>set({isSmallScreen}),
}));

export default useConversation;