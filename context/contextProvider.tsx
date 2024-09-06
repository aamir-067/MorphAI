
interface ContextInterface {
    allowAds: boolean
}


// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react'
const Context = createContext<ContextInterface>({
    allowAds: false
});
export { Context as GlobalContext }
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [allowAds, setAllowAds] = useState(true);



    return (
        <Context.Provider value={{ allowAds }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider
