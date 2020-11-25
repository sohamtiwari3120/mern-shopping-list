import React from "react"
import { Container, ListGroup, ListGroupItem, Button, Spinner } from "reactstrap"
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "./../store/actions";
import PropTypes from 'prop-types';

function ShoppingList(props)
{
    React.useEffect(() =>
    {
        props.dispatch(getItems())
        // eslint-disable-next-line
    }, []);
    // React.useEffect(())
    const onDeleteClick = (id) => (e) =>
    {
        e.preventDefault()
        props.dispatch(deleteItem(id))
    }
    // const [loading, setLoading] = React.useState(false);
    return (
        <>
            <Container>
                {/* <Button
                    color='dark'
                    style={ {
                        marginBottom: '2rem'
                    } }
                    onClick={ () =>
                    {
                        const name = prompt('Enter item')
                        if (name)
                        {
                            props.dispatch(addItem(name))
                        }
                    } }
                >
                    Add Item
                </Button> */}
                { props.ItemReducer.loading ?
                    <Spinner color='primary' />
                    :
                    <ListGroup>
                        <TransitionGroup className='shopping-list'>
                            { props.ItemReducer.items.map(({ _id, name }) => (
                                <CSSTransition key={ _id } timeout={ 500 } classNames='fade'>
                                    <ListGroupItem>
                                        <Button
                                            className='remove-btn'
                                            color='danger'
                                            size='small'
                                            onClick={ onDeleteClick(_id) }
                                        >
                                            &times;
                                    </Button>
                                        { name }
                                    </ListGroupItem>
                                </CSSTransition>
                            )) }
                        </TransitionGroup>
                    </ListGroup>
                }
            </Container>
        </>
    )
}
ShoppingList.propTypes = {
    items: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    ItemReducer: state.ItemReducer
})
export default connect(mapStateToProps)(ShoppingList)