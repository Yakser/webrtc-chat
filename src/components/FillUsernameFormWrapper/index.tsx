'use client';


import React, {useEffect, useState} from "react";
import {LocalStorageKeys} from "@/utils/constants";
import FillUsernameForm from "@/components/FillUsernameForm";

const FillUsernameFormWrapper = () => {
    const [showForm, setShowForm] = useState<boolean>(false);

    useEffect(() => {
        setShowForm(!localStorage.getItem(LocalStorageKeys.USERNAME));
        // fixme: hide form after save button pressed
    }, []);

    return (
        <>
            {showForm && (
                <FillUsernameForm/>
            )}
        </>
    )
};

export default FillUsernameFormWrapper;