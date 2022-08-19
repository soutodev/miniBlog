import {db} from "../firebase/config"

import {  
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut  
} from "firebase/auth";

import {  useState, useEffect  } from "react";

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null)

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if(cancelled) {
            return;
        }
    }

    // register
    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try{
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            

            return user
        } catch (e) {

            console.log(e.message);
            console.log(typeof e.message);

            let systemErrorMessage;

            if(e.message.includes("Password")) {
                systemErrorMessage = "A Senha precisa ter pelo menos 6 caracteres"
            } else if (e.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor, tente mais tarde"
            }

        
            setError(systemErrorMessage);
        }

        setLoading(false);
    }

    // logout - sign out
    const logout = () => {
        
        checkIfIsCancelled()

        signOut(auth);

    }

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
    }
}