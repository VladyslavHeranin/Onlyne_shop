import { useState } from "react"
import { useDispatch } from "react-redux"
import { delListItem } from "../../actions/user"
import { Update } from "../../actions/user"
import { createComment } from "../../actions/user"
import { useSelector } from "react-redux"



export const User = (props) => {
    const [reName, setReName] = useState({
        user: props.user.name,
    })

    const [active, setActive] = useState("delete__block-none")

    const [comment, setComment] = useState("")

    const user = props.user

    const date = new Date().toLocaleString();

    const modalList = () => {
        if (props.modal === "display") {
            return "usernone"
        } else {
            return "user"
        }
    }


    const currentId = useSelector(state => state.user.currentUser.user.id)


    const changeUser = event => {
        setReName({
            ...reName, [event.target.name]: event.target.value
        })
    }

    const Comment = event => {
        setComment({
            ...comment, [event.target.name]: event.target.value
        })
    }

    const dispatch = useDispatch()


    const volid = () => {
        dispatch(delListItem(user._id, currentId))
    }


    const changeUserButton = () => {
        dispatch(Update(reName.user, user._id, currentId))
    }


    const addComment = () => {
        dispatch(createComment(currentId, user._id, comment.comment, date))
    }



    return <div className={modalList()} >


        <div className="card" >
            <div className="card-content">


                <h2>name: {user.name}</h2>
                <img src={user.imgURL} alt={user.name} />
                <h5>size:  {user.size}</h5>
                <h5> weidht:   {user.weidht}</h5>
                <p></p>

                <h5>Description</h5>
                <p className="discription" >{user.discription.slice(0, 100)} . . .</p>


            </div>

            <div className="card-content">


                <button className="waves-effect waves-light btn activator ">More detail</button>


                {active === "delete__block-active" ?
                    <button className="waves-effect yellow btn " onClick={() => setActive("delete__block-none")}>close</button>
                    :
                    <button className="waves-effect grey btn " onClick={() => setActive("delete__block-active")}>delete</button>
                }

                <div className={active}>
                    <span>If you want to do this click this button</span>
                    <button className="waves-effect red btn" onClick={() => {
                        volid()
                        setActive("delete__block-none")
                    }
                    }>
                        Delete
                    </button>
                </div>


            </div>
            <div className="card-reveal">
                <span className="card-title grey-text text-darken-4"><i className="right">close</i></span>
                <div className="row">

                    <div className="card-content">
                        <h3>More Detal</h3>

                        <h4> item weight:  {user.weidht}</h4>
                        <h4> item size:  {user.size}</h4>
                        <h4> item count:  {user.count}</h4>
                        <h3>Discription</h3>
                        <p className="discription" >{user.discription}</p>
                    </div>

                    <div className="card-content">
                        <h3>Update item</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quis, asperiores ipsum exercitationem omnis
                            libero a voluptate aliquam quae, eligendi eos quibusdam sit fuga nam, officiis
                            est laboriosam. Modi, laborum.
                        </p>
                        <div className="input-field ">
                            <input
                                id="Update user"
                                type="text"
                                name="user"
                                onChange={changeUser}
                            />
                            <label htmlFor="password">Update name</label>

                        </div>


                    </div>
                    <div className="card-content">
                        <button className="waves-effect waves-light btn activator" onClick={changeUserButton}>Update</button>
                    </div>


                    <div className="card-content">
                        <h3>Add Comment</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quis, asperiores ipsum exercitationem omnis
                            libero a voluptate aliquam quae, eligendi eos quibusdam sit fuga nam, officiis
                            est laboriosam. Modi, laborum.
                        </p>
                        <div className="input-field ">
                            <input
                                id="comment"
                                type="text"
                                name="comment"
                                onChange={Comment}
                            />
                            <label htmlFor="comment">Comment</label>

                        </div>


                    </div>
                    <div className="card-content">
                        <button className="waves-effect waves-light btn activator" onClick={addComment} >ADD</button>
                    </div>

                    <h3>Comments</h3>

                    {user.comments.length === 0 ? <h5>There are no comments here yet</h5> : user.comments.map((comment, id) => {
                        return <div className="card" key={id}  >
                            <div className="card-content">
                                <p>Author of this comment:  {comment.author} </p>
                                <h5>  comment: {comment.description}</h5>
                                <p>  data: {comment.data}</p>
                            </div>

                        </div>
                    })}
                </div>
            </div>
        </div>
    </div >
}


