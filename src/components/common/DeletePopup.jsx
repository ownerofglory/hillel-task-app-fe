import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const DeletePopup = (props) => {

    const onDelete = (e) => {
        e.preventDefault()
        console.log('deleting the item', props.model)

        props.deleteHandler(props.model.id)
    }

    return (
        <Modal
            show={props.show}
            onHide={props.closeHandler}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            Are you sure you want to delete the item { props.model.title ??  props.model.name ?? ''}?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.closeHandler}>
                Cancel
            </Button>
            <Button variant="danger" onClick={(e) => onDelete(e)}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeletePopup