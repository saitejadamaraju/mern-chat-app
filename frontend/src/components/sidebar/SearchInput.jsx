import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import { useState } from "react";

const SearchInput = () => {
    
	const {setSearchString}=useConversation();
	const [searchString,setsearchString]= useState("");

	const handleSubmit=(e)=>{

		e.preventDefault();
		setSearchString(searchString);
        
	}

	return (
		<form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<input 
				type='text' 
				placeholder='Search…' 
				className='input input-bordered rounded-full' 
				value={searchString}
				onChange={(e)=>setsearchString(e.target.value)}
				/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;