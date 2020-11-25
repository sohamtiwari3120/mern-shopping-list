import React, { useState } from 'react';
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

function AppNavBar(props)
{
    const [isOpen, setIsOpen] = useState(false);
    const toggle = (e) => { setIsOpen(!isOpen) }
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
                            <NavItem>
                                <NavLink href='https://www.github.com/sohamtiwari3120'>
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
export default AppNavBar