import React from "react";
import
{
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert
} from 'reactstrap';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { clearErrors, register } from '../../store/actions'
// NOTE: A container is actually a component using redux state
function usePrevious(value, initial = null)
{
    const ref = React.useRef(initial);
    React.useEffect(() =>
    {
        ref.current = value;
    });
    return ref.current;
}
function RegisterModal(props)
{
    const [state, setState] = React.useState({
        modal: false,
        name: '',
        email: '',
        password: '',
        message: null
    });
    const prevProps = usePrevious(props, { isAuthenticated: null, error: null })
    // eslint-disable-next-line
    React.useEffect(() =>
    {
        const { error } = props
        if (error !== prevProps.error)
        {
            // Check for register error
            if (error.id === 'REGISTER_FAIL')
            {
                setState({
                    ...state,
                    message: error.message.message
                })
            }
            else
            {
                setState({
                    ...state,
                    message: null
                })
            }
        }

        if (state.modal)
        {
            if (props.isAuthenticated)
            {
                toggle()
            }
        }
    });
    const toggle = () =>
    {
        // event.preventDefault();
        props.dispatch(clearErrors())
        setState({
            ...state,
            modal: !state.modal
        })
    }

    const onChange = (e) =>
    {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) =>
    {
        e.preventDefault()
        const { name, email, password } = state;
        props.dispatch(register({ name, email, password }))
        // toggle(e)

    }
    return (
        <>
            <NavLink onClick={ toggle } href='#'>
                Register
           </NavLink>
            <Modal
                isOpen={ state.modal }
                toggle={ toggle }
            >
                <ModalHeader toggle={ toggle }>Register</ModalHeader>
                <ModalBody>
                    { state.message &&
                        <Alert color='danger'>{ state.message }</Alert>
                    }
                    <Form onSubmit={ onSubmit }>
                        <FormGroup>
                            <Label for='item'>Name</Label>
                            <Input
                                type='text'
                                name='name'
                                id='name'
                                placeholder='Name'
                                onChange={ onChange }
                                value={ state.name }
                                className='mb-3'
                            ></Input>

                            <Label for='email'>Email</Label>
                            <Input
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Email Id'
                                onChange={ onChange }
                                value={ state.email }
                                className='mb-3'
                            ></Input>

                            <Label for='password'>Password</Label>
                            <Input
                                type='password'
                                name='password'
                                id='password'
                                placeholder='Password'
                                onChange={ onChange }
                                value={ state.password }
                                className='mb-3'
                            ></Input>

                            <Button
                                color='dark'
                                style={ { marginTop: '2rem' } }
                                block
                            >
                                Register
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>

            </Modal>
        </>
    )
}
RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    isAuthenticated: state.AuthReducer.isAuthenticated,
    error: state.ErrorReducer
})
export default connect(mapStateToProps)(RegisterModal)