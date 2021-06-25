import { useSelector } from "react-redux"
import { User } from "./user"



export const Users = (props) => {


    const currentUser = useSelector(state => state.user.currentUser.items)

    return (
        <div className="card">

            {currentUser.map((user, id) => <User user={user} current={currentUser} key={id} modal={props.modal} />)}

        </div>
    )
}