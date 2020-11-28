import React from "react";
import
{
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input
} from 'reactstrap';
import { connect } from "react-redux";
import { addItem } from "../store/actions";
import PropTypes from 'prop-types'
// NOTE: A container is actually a component using redux state
function ItemModal(props)
{
    const [modal, setModal] = React.useState(false);
    const [name, setName] = React.useState('');
    const toggle = (event) => { event.preventDefault(); setModal(!modal) }
    const onSubmit = (e) =>
    {
        e.preventDefault()
        props.dispatch(addItem(name))
        setName('')
        toggle(e)
    }
    return (
        <>
            <div>
                { props.AuthReducer.isAuthenticated ?
                    <Button
                        color='dark'
                        style={ { marginBottom: '2rem' } }
                        onClick={ toggle }
                    >
                        Add Item
                </Button>
                    :
                    <h4 className='mb-3 ml-4'>Please log in to manage items</h4>
                }
            </div>
            <Modal
                isOpen={ modal }
                toggle={ toggle }
            >
                <ModalHeader toggle={ toggle }>Add tp Shopping List</ModalHeader>
                <ModalBody>
                    <Form onSubmit={ onSubmit }>
                        <FormGroup>
                            <Label for='item'>Item</Label>
                            <Input
                                type='text'
                                name='name'
                                id='item'
                                placeholder='Add shopping item'
                                onChange={ (e) => setName(e.target.value) }
                                value={ name }
                            ></Input>
                            <Button
                                color='dark'
                                style={ { marginTop: '2rem' } }
                                block
                            >
                                Add Item
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>

            </Modal>
        </>
    )
}
ItemModal.propTypes = {
    AuthReducer: PropTypes.object.isRequired,

}
const mapStateToProps = state => ({
    AuthReducer: state.AuthReducer
})
export default connect(mapStateToProps)(ItemModal)