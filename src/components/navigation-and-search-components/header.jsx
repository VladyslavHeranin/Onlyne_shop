import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../../reducers/userRed"
import { SortFirstWord } from "../../actions/user"
import { SortCount } from "../../actions/user"
import { Auth } from "../../actions/user"


export const Header = (props) => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    return <div className="card">
        <div className="card-content nav-wrapper blue-grey darken-1">
            <nav className=" blue-grey darken-1">

                <a href="#!" className="brand-logo"> <span>Shop-Onlyne</span></a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">Shop-Onlyne</i></a>
                <ul className="right hide-on-med-and-down">

                    {!isAuth && <li><NavLink to="/login">Log in</NavLink></li>}
                    {!isAuth && <li><NavLink to="/registartion">Registartion</NavLink></li>}

                    {isAuth &&
                        <div>
                            <button className="btn__sort" onClick={() => dispatch(SortFirstWord())} >Sort A-Z</button>
                            <button className="btn__sort" onClick={() => dispatch(SortCount())} >Sort for count</button>
                            <button className="btn__sort" onClick={() => dispatch(Auth())} >Initial list</button>
                            <button className="btn yellow " onClick={() => props.setModal("displaynon")} >Add Item</button>
                            <button className="btn" onClick={() => dispatch(logOut())} >Log out</button>
                        </div>
                    }
                </ul>
            </nav>
        </div>
    </div>
}