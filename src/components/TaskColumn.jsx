import React, { useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import DeletePopup from '../components/common/DeletePopup'

import CreateTaskForm from './CreateTaskForm'

const TaskColumn = (props) => {
    const [taskList, setTaskList] = useState(props.taskList)
    const [deleteModalShown, setDeleteModalShown] = useState(false)

    const listStyle = {
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '0.375em',
        marginTop: '10px',
    }

    const columnHeaderStyle = {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '10px',
        justifyContent: 'space-around'
    }

    const listWrapperStyle = {
        marginLeft: '10px',
        marginRight: '10px'
    }

    const style = {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '72vh',
        maxWidth: '20vw',
        minWidth: '320px',
        overflowY: 'scroll',
        overflowX: 'hidden',
        marginTop: '20px',
        marginRight: '10px'
    }

    const onDragOver = (e) => {
        e.preventDefault()
    }

    const onDrop = (e) => {
        e.preventDefault()
        console.log('drop', e)
    }

    const onListDelete = (id) => {
        console.log('delete list: ', id)
        fetch('', {
            method: 'delete',
        }).then(resp => resp.json())
    }

    const showDeleteModal = () => {
        setDeleteModalShown(true)
    }

    const closeDeleteModal = () => {
        setDeleteModalShown(false)
    }

  return (
    <div style={listWrapperStyle}>
        <Container style={listStyle}>
            <div style={columnHeaderStyle}>
                <div style={{width: '60%'}}>
                    <h3>List</h3>
                </div>
                <Button variant='outline-warning'>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
                <Button variant='outline-danger' onClick={(e) => showDeleteModal()} >
                    <FontAwesomeIcon icon={faXmark} />
                </Button>
            </div>

            <Container className='dropZone' style={style} onDrop={(e) => onDrop(e)} onDragOver={(e) => onDragOver(e)}>
            {props.children}
            </Container>

            
        </Container>
        <CreateTaskForm/>

        <DeletePopup model={{}} 
            deleteHandler={onListDelete} 
            show={deleteModalShown} 
            closeHandler={closeDeleteModal} />

    </div>
  )
}

export default TaskColumn