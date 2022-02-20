import {useState, useCallback} from "react";

//работа с асинхронными методами работы с сервером c помощью хука useHttp
export const useHttp = () => {

    const [loading, setLoading] = useState(false)

    //State(error)  с названием фун-ии setError
    const [error, setError] = useState(null)

    const request = useCallback (async (url, method = 'Get', body = null, headers = {}) =>{

        setLoading(true)

        try{

            ///приводим тело запроса к формату json
            if (body){
                body = JSON.stringify(body)

                //явное указание что по сети идёт json
                headers['Content-Type'] = 'application/json'
            }

            const response =await fetch(url,{method,body,headers})
            const data= await response.json()

            if(!response.ok){
                throw new Error(data.message || 'Что то пошло не так')
            }

            setLoading(false)

            return data

        }catch (e){
            setLoading(false)
            setError(e.message)
            throw e

        }

    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}