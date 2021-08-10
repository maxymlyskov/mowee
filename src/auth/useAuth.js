import {useContext} from 'react'
import {Alert} from "react-native";
import jwtDecode from 'jwt-decode'
import AuthContext from './context'
import authStorage from './storage'

export default useAuth = () =>{
    const {user, setUser} = useContext(AuthContext)

    const logOut = () =>{
        Alert.alert(
            'Warning',
            'Are you sure you want to log out?',
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                  },
                  { text: "Yes", onPress: () => {
                    setUser(null);
                    authStorage.removeToken()
                  } }
            ]
            )
        
    }
    
    const logIn = (authToken) =>{
        const user = jwtDecode(authToken)
        setUser(user)
        authStorage.storeToken(authToken)
    }

    return {user,logOut, logIn}
}
