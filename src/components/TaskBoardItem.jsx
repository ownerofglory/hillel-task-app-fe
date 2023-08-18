import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import DeletePopup from '../components/common/DeletePopup'
import EditPopup from './common/EditPopup';

const TaskBoardItem = (props) => {
  const navigate = useNavigate()
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [board, setBoard] = useState(props.board);

  const onBoardDelete = (id) => {
    props.deleteHandler(id).then(() => closeDeleteModal())
  }

  const onBoardEdit = (board) => {
    props.editHandler(board).then(data => {
      if (data) {
        setBoard(data)
      }
      closeEditModal()
    })
  }

  const closeDeleteModal = () => {
    setDeleteModalShow(false)
  }

  const openDeleteModal = () => {
    setDeleteModalShow(true)
  }

  const closeEditModal = () => {
    setEditModalShow(false)
  }

  const openEditModal = () => {
    setEditModalShow(true)
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
    navigate(`/boards/${board.id}`)
  }

    return (
        <Card style={cardStyle}>
        <Card.Body>
          <div style={cardBodyStyle}>
            <Card.Title onClick={(e) => obBoardClicked(e)} style={{width: '60%'}}>{board.name}</Card.Title>
            <Button variant='outline-warning' onClick={e => openEditModal()}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button variant='outline-danger' onClick={(e) => openDeleteModal()} >
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
        </Card.Body>
        <DeletePopup model={board} 
            deleteHandler={onBoardDelete} 
            show={deleteModalShow} 
            closeHandler={closeDeleteModal} />
        <EditPopup model={board}
          editHandler={onBoardEdit}
          show={editModalShow}
          closeHandler={closeEditModal} />
      </Card>
    )
}

export default TaskBoardItem