import React from 'react'

import { useState } from 'react'

import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const CreateTaskForm = (props) => {
    const [open, setOpen] = useState(false)
    const [buttonVar, setButtonVar] = useState('secondary')
    const [task, setTask] = useState({})

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
            if (!task.description) {
                task.description = ''
            }
            props.createHandler(task).then(() => {
                setOpen(false)
                setButtonVar('secondary')
            })  
        } else {
            setOpen(true)
            setButtonVar('primary')
        }
    }

    const onTitleInput = (e) => {
        const title = e.target.value
        task.title = title
        setTask(task)
    }

    const onDescriptionInput = (e) => {
        const description = e.target.value
        task.description = description
        setTask(task)
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
                        onInput={(e) => onTitleInput(e)}
                    />

                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        aria-describedby="passwordHelpBlock"
                        onInput={(e) => onDescriptionInput(e)}
                    />
                </div>
            ): (<></>)
        }
        <Button onClick={(e) => onButtonClick(e)} 
            style={buttonStyle} 
            variant={buttonVar}
            >
            <FontAwesomeIcon icon={faPlus} />
        </Button>
    </div>
  )
}

export default CreateTaskForm