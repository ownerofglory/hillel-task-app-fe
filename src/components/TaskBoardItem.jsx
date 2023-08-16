import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import DeletePopup from '../components/common/DeletePopup'

const TaskBoardItem = () => {
  const navigate = useNavigate()
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  const onBoardDelete = (boardId) => {
    console.log('deleting board: ', boardId)
  }

  const closeDeleteModal = () => {
    setDeleteModalShow(false)
  }

  const openDeleteModal = () => {
    setDeleteModalShow(true)
  }

  const cardStyle = {
    margin: '20px',
    width: '18rem'
  }

  const cardBodyStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

  const obBoardClicked = (e) => {
    navigate('/boards')
  }

    return (
        <Card style={cardStyle}>
        <Card.Body>
          <div style={cardBodyStyle}>
            <Card.Title onClick={(e) => obBoardClicked(e)} style={{width: '60%'}}>Card Title</Card.Title>
            <Button variant='outline-warning'>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button variant='outline-danger' onClick={(e) => openDeleteModal()} >
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
        </Card.Body>
        <DeletePopup model={{}} 
            deleteHandler={onBoardDelete} 
            show={deleteModalShow} 
            closeHandler={closeDeleteModal} />
      </Card>
    )
}

export default TaskBoardItem