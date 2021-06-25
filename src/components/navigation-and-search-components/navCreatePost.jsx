import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createDir } from "../../actions/file"

export const NavCreatePost = (props) => {
    const [groupInf, setGroupInf] = useState({
        name: "",
        discription: "",
        size: "",
        weidht: "",
        count: "",
        imgURL: "",
    })

    const createGroupInf = (event) => {
        setGroupInf({
            ...groupInf, [event.target.name]: event.target.value
        })
    }

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.currentUser.user)


    const createGroup = () => {
        dispatch(createDir(
            user.id,
            groupInf.name,
            groupInf.imgURL,
            groupInf.size,
            groupInf.weidht,
            groupInf.count,
            groupInf.discription,
        ))
    }

    return <div className={props.modal}>

        <div className="card  darken-1 black-text">

            <div className="row">
                <div className="col s6 offset-s3">
                    <h1>Create item</h1>
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <div>

                                <div className="input-field ">
                                    <input
                                        placeholder="name"
                                        id="name"
                                        type="text"
                                        name="name"
                                        onChange={createGroupInf}
                                    />
                                    <label htmlFor="name"> name</label>
                                </div>

                                <div className="input-field ">
                                    <input
                                        placeholder="imgURL"
                                        id="imgURL"
                                        type="text"
                                        name="imgURL"
                                        onChange={createGroupInf}
                                    />
                                    <label htmlFor="imgURL">URL</label>
                                </div>

                                <div className="input-field ">
                                    <input
                                        placeholder="count"
                                        id="count"
                                        type="text"
                                        name="count"
                                        onChange={createGroupInf}
                                    />
                                    <label htmlFor="count"> count</label>
                                </div>

                                <div className="input-field ">
                                    <input
                                        placeholder="size"
                                        id="size"
                                        type="text"
                                        name="size"
                                        onChange={createGroupInf}
                                    />
                                    <label htmlFor="size">size</label>
                                </div>

                                <div className="input-field ">
                                    <input
                                        placeholder="weidht"
                                        id="weidht"
                                        type="text"
                                        name="weidht"
                                        onChange={createGroupInf}
                                    />
                                    <label htmlFor="weidht">weidht</label>
                                </div>


                                <div className="input-field ">
                                    <input
                                        placeholder="discription"
                                        id="discription"
                                        type="text"
                                        name="discription"
                                        onChange={createGroupInf}
                                    />
                                    <label htmlFor="discription">discription</label>
                                </div>


                            </div>
                        </div>
                        <div className="card-action">

                            {(groupInf.name === "" ||
                                groupInf.imgURL === "" ||
                                groupInf.size === "" ||
                                groupInf.weidht === "" ||
                                groupInf.count === "" ||
                                groupInf.discription === "") === false ? <button
                                    className="btn yellow"
                                    onClick={() => {
                                        createGroup()
                                        props.setModal(props.modalWindow())
                                    }} >
                                ADD
                            </button>
                                :
                                <button
                                    className="btn grey"
                                    onClick={() => {
                                        window.M.toast({ html: "please fill in all fields" })
                                    }} >
                                    ADD
                                </button>
                            }

                            <button
                                className="btn"
                                onClick={() => props.setModal(props.modalWindow())} >
                                Close
                            </button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
}