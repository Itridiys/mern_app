import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export const CreatePage = () =>{
    const history =  useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    ///делаем активными input-ы на странице авторизации
    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
        if(event.key === 'Enter'){
            try{
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })

                history.push(`/detail/${data.link._id}`)

            }catch (e){

            }
        }
    }

    const subButton = async () =>{

        var text = document.getElementById('link');
        try{
            const data = await request('/api/link/generate', 'POST', {from: text.value}, {
                Authorization: `Bearer ${auth.token}`
            })

            history.push(`/detail/${data.link._id}`)

        }catch (e){

        }
    }






    return(
        <div className="row">

            <div className="col s8 offset-s2" style={{padding: '2rem'}}>

                <div className="input-field">
                    <input
                        placeholder="Вставьте ссылку"
                           id="link"
                           type="text"
                           value={link}
                           onChange={e => setLink(e.target.value)}
                           onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>

                    <button className="btn waves-effect waves-light" type="submit" onClick={subButton}>Submit
                        <i className="material-icons right"></i>
                    </button>
                </div>

            </div>
        </div>
    )
}