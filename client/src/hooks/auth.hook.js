import {useState, useCallback, useEffect} from "react";

//Storage место где храним токен полученный от сервера
const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    //Метод для логирования
    const login = useCallback( (jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
    }, [])

    //Метод разлогирования
    const logout = useCallback( () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    ///Если данные уже храняться в Storage берем их и подставляем для логирования
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if(data && data.token){
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])



    return {login, logout, token, userId, ready}
}