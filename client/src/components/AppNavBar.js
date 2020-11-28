import React, { useState } from 'react';
import { connect } from 'react-redux';
import
{
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import RegisterModal from './auth/RegisterModal';
import PropTypes from 'prop-types'
function AppNavBar(props)
{
    const [isOpen, setIsOpen] = useState(false);
    const toggle = (e) => { setIsOpen(!isOpen) }
    const { isAuthenticated, user } = props.AuthReducer

    return (
        <>
            <Navbar color='dark' dark expand='sm' className='mb-5'>
                <Container>
                    <NavbarBrand href='/'>
                        ShoppingList
                    </NavbarBrand>
                    <NavbarToggler onClick={ toggle } />
                    <Collapse isOpen={ isOpen } navbar>
                        <Nav className='ml-auto' navbar>

                            { !isAuthenticated &&
                                <NavItem>
                                    <RegisterModal />
                                </NavItem>
                            }
                            {
                                !isAuthenticated ?
                                    <NavItem>
                                        <LoginModal />
                                    </NavItem>
                                    :
                                    <>
                                        <NavItem>
                                            <span className='navbar-text mr-3'>
                                                <strong>
                                                    { user && `Welcome, ${user.name}` }
                                                </strong>
                                            </span>
                                        </NavItem>
                                        <NavItem>
                                            <Logout />
                                        </NavItem>
                                    </>
                            }
                            <NavItem>
                                <NavLink href='https://github.com/sohamtiwari3120/mern-shopping-list' target='_blank'>
                                    GitHub
                                </NavLink>
                            </NavItem>


                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </>
    )

}
AppNavBar.propTypes = {
    AuthReducer: PropTypes.object.isRequired
}
const mapStateToProps = state => (
    {
        AuthReducer: state.AuthReducer
    }
)
export default connect(mapStateToProps)(AppNavBar)