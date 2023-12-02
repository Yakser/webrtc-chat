'use client';

import React from "react";

type PageProps = {
    params: { roomId: string };
}
const Page: React.FC<PageProps> = ({params}: { params: { roomId: string } }) => {

    return (
        <>
            {params.roomId}
        </>
    );
}

export default Page;