/* eslint-disable no-mixed-spaces-and-tabs */
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";

const Home = () => {
    const { selectedConversation } = useConversation();
    const {isSmallScreen, setIsSmallScreen} = useConversation();

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 640);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial check for screen size
        handleResize();

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`flex ${isSmallScreen?"h-[450px] max-w-[640px]": "sm:h-[450px] md:h-[550px] "} overflow-hidden rounded-lg  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0`}>
            
			{/* <Sidebar/>
			<MessageContainer/> */}
			
			{isSmallScreen ? 
			(!selectedConversation ? <Sidebar />:<MessageContainer />):(<><Sidebar/><MessageContainer/></>)
			   }
        
        </div>
    );
};

export default Home;