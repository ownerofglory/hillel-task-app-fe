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
            <div className="">
            <svg onClick={(e) => obBoardClicked(e)} style={{fill: '#dee2e6'}} xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512">
              <path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
            </div>
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