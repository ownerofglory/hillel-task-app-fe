import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Form } from 'react-bootstrap'

const EditPopup = (props) => {
    const [model, setModel] = useState(props.model);

    const onEdit = (e) => {
        props.editHandler(model)
    }

    const setModelAttr = (e, name) => {
        const value = e.target.value
        const newModel = {
            ...model
        }
        newModel[name] = value
        setModel(newModel)
    }

  return (
    <Modal
        show={props.show}
        onHide={props.closeHandler}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                model.name || model.name === '' ?
                (
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        aria-describedby="passwordHelpBlock"
                        value={model.name}
                        onInput={(e) => setModelAttr(e, 'name')}
                    />
                ): (<></>)
            }
            {
                model.title || model.title === '' ?
                (
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        aria-describedby="passwordHelpBlock"
                        value={model.title}
                        onInput={(e) => setModelAttr(e, 'title')}
                    />
                ): (<></>)
            }
            {
                model.description || model.description === '' ?
                (
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        aria-describedby="passwordHelpBlock"
                        value={model.description}
                        onInput={(e) => setModelAttr(e, 'description')}
                    />
                ): (<></>)
            }
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={props.closeHandler}>
            Cancel
        </Button>
        <Button variant="primary" onClick={(e) => onEdit(e)}>Edit</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default EditPopup