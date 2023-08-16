import React from 'react'

import { useState } from 'react'

import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const CreateTaskForm = () => {
    const [open, setOpen] = useState(false)
    const [buttonVar, setButtonVar] = useState('secondary')

    const style = {
        display: 'flex',
        flexDirection: 'column',
    }

    const inputContainerStyle = {
        padding: '10px',
        backgroundColor: '#323232'
    }

    const buttonStyle = {
        width: '100%',
        borderTopLeftRadius: '0',
        borderTopRightRadius: '0'
    }

    const onButtonClick = (e) => {
        if (open) {
            setOpen(false)
            setButtonVar('secondary')
        } else {
            setOpen(true)
            setButtonVar('primary')
        }
    }

  return (
    <div style={style}>
        {
            open ? (
                <div style={inputContainerStyle}>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        aria-describedby="passwordHelpBlock"
                    />

                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        aria-describedby="passwordHelpBlock"
                    />
                </div>
            ): (<></>)
        }
        <Button onClick={(e) => onButtonClick(e)} style={buttonStyle} variant={buttonVar}>
            <FontAwesomeIcon icon={faPlus} />
        </Button>
    </div>
  )
}

export default CreateTaskForm