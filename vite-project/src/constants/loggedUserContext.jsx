import React, { createContext, useState } from 'react';

export const UserContext = createContext({})

export default function UseCreateContext({ children }) {
    const [currUser, setCurrUser] = useState({})

    return (
        <UserContext.Provider value={{ currUser, setCurrUser }}>
            {children}
        </UserContext.Provider>
    )
}