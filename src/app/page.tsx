import React from 'react';
import JoinRoomForm from "@/components/JoinRoomForm";
import FillUsernameFormWrapper from "@/components/FillUsernameFormWrapper";



const Page: React.FC = () => {
    return (
        <>
            <FillUsernameFormWrapper/>
            <JoinRoomForm/>
        </>
    )
}

export default Page;
