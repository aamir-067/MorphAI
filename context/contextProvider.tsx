
interface ContextInterface {
    firstVisit: boolean
    allowAds: boolean
}


// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react'
const Context = createContext<ContextInterface>({
    firstVisit: true,
    allowAds: false
});
export { Context as GlobalContext }
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [firstVisit, setFirstVisit] = useState(false);
    const [allowAds, setAllowAds] = useState(false);
    const isFirstTimeVisiting = async () => {
        try {
            // const value = await AsyncStorage.getItem('firstVisit');
            // if (value !== null) {
            // setFirstVisit(value === "false" ? false : true);
            // } else {
            //     await AsyncStorage.setItem('firstVisit', 'false');
            // }

            setFirstVisit(true);
        } catch (e) {
            console.log(e);
        }
    }




    useEffect(() => {
        isFirstTimeVisiting();
    }, [])

    return (
        <Context.Provider value={{ firstVisit, allowAds }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider
