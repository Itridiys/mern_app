import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () =>{

    const auth = useContext(AuthContext)

    const message = useMessage()

    //добавляем хук
    const {loading, error, request,clearError} = useHttp()

    const [form, setForm] = useState({
        email: '' , password: ''
    })

    //выводим ошибку для пользователя
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message,clearError])

    ///делаем активными input-ы на странице авторизации
    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    //обработка формы
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () =>{
        try{
            //путь который лежит на беке routes/auth.routes.js
            const data = await request('api/auth/register', 'POST', {...form})
            message(data.message)
        }catch (e){

        }
    }

    const loginHandler = async () =>{
        try{
            //путь который лежит на беке routes/auth.routes.js
            const data = await request('api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        }catch (e){

        }
    }



    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи Ссылку</h1>
                <div className="card blue lighten-2">

                    <div className="card-content white-text">
                        <span className="card-title">:-)Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input placeholder="Введите email"
                                       id="email"
                                       type="text"
                                       name="email"
                                       className="yellow-input"
                                       value={form.email}
                                       onChange={changeHandler}
                                       />
                                    <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input placeholder="Введите пароль"
                                       id="password"
                                       type="password"
                                       name="password"
                                       className="yellow-input"
                                       value={form.password}
                                       onChange={changeHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>

                        </div>
                    </div>

                    <div className="card-action">
                        <button className="btn yellow darken-4 authBtn"
                                onClick={loginHandler}
                                disabled={loading}>
                            Войти
                        </button>

                        <button className="btn grey lighten-1"
                                onClick={registerHandler}
                                disabled={loading}>
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )
}
