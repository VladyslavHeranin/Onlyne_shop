import React, { useState, useEffect, useContext } from "react"
import { registration } from "../../actions/user"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { textareaAutoResize } from "materialize-css"


export const Registration = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: ""
    })

    const changeHandler = event => {

        setForm({
            ...form, [event.target.name]: event.target.value
        })

    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Registartion</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                
                        <div>

                            <div className="input-field ">
                                <input
                                    placeholder="email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>


                            <div className="input-field ">
                                <input
                                    placeholder="password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                            <div className="input-field ">
                                <input
                                    placeholder="you name"
                                    id="text"
                                    type="text"
                                    name="name"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="text">Name</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">


                        <button
                            className="btn yellow"
                            onClick={() => {
                                registration(
                                    form.email,
                                    form.password,
                                    form.name,
                                )
                            }}
                        >
                            Регистрация
                    </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

