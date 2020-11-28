import React from "react"
import { connect } from "react-redux"
import { NavLink } from "reactstrap";
import { logout } from "../../store/actions";

function Logout(props)
{
    return (
        // <>
        <NavLink onClick={ () => { props.dispatch(logout()) } } href='#'>
            Log Out
        </NavLink>
        // </>
    )
}
export default connect()(Logout)