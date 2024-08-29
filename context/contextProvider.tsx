
// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react'
const Context = createContext<{
    firstVisit: boolean
}>({
    firstVisit: true
});
export { Context as GlobalContext }
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [firstVisit, setFirstVisit] = useState(true);
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
        <Context.Provider value={{ firstVisit }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider
