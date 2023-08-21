import React, { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import DeletePopup from '../components/common/DeletePopup'
import EditPopup from './common/EditPopup'
import TaskItem from '../components/TaskItem'

import CreateTaskForm from './CreateTaskForm'

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

const baseUrl = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8000/api'

const TaskColumn = (props) => {
    const [taskList, setTaskList] = useState(props.taskList)
    const [deleteModalShown, setDeleteModalShown] = useState(false)
    const [editPopupShown, setEditPopupShown] = useState(false)
    const [tasks, setTasks] = useState([])
    const [draggedTask, setDraggedTask] = useState()

    const getTasks = (id) => {
        fetch(`${baseUrl}/lists/${id}/tasks`)
            .then(resp => {
                if (resp.status === 200) {
                    return resp.json()
                }
            })
            .then(data => {
                if (data) {
                    setTasks(data)
                }
            })
    }

    const onDragOver = (e) => {
        e.preventDefault()
    }


    const onListDelete = (id) => {
        console.log('delete list: ', id)
        fetch(`${baseUrl}/lists/${id}`, {
            method: 'delete',
        })
            .then(resp => {
                if (resp.status === 200) {
                    return resp.json()
                }
            })
            .then(data => {
                if (data) {
                    props.listDeleteHandler(data)
                    closeDeleteModal()
                }
            })
    }

    const showDeleteModal = () => {
        setDeleteModalShown(true)
    }

    const closeDeleteModal = () => {
        setDeleteModalShown(false)
    }

    const openEditPopup = () => {
        setEditPopupShown(true)
    }

    const closeEditPopup = () => {
        setEditPopupShown(false)
    }

    const onTaskListEdit = (editedTaskList) => {
        fetch(`${baseUrl}/lists/${taskList.id}`, {
            method: 'PUT',
            body: JSON.stringify(editedTaskList),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => {
            setTaskList(data)
            closeEditPopup()
        })
    }

    const onTaskEdit = (task) => {
        return fetch(`${baseUrl}/lists/${taskList.id}/tasks/${task.id}`, {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            if (resp.status === 200) {
                return resp.json()
            }
        })
    }

    const onTaskDelete = (id) => {
        return fetch(`${baseUrl}/lists/${taskList.id}/tasks/${task.id}`, {
            method: 'DELETE'
        }).then(resp => {
            if (resp.status === 200) {
                return resp.json()
            }
        }).then(data => {
            if (data) {
                const tasks = tasks.filter(task => task.id !== data.id)
                setTasks(tasks)
            }
        })
    }

    const onTaskCreate = (task) => {
        return fetch(`${baseUrl}/lists/${taskList.id}/tasks`, {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            if (resp.status === 200) {
                return resp.json()
            }
        }).then(data => {
            if (data) {
                const newTasks = [data, ...tasks]
                setTasks(newTasks)
            }
        })
    }

    const onTaskDragEnd = (task) => {
        setDraggedTask(task)
    }

    const onTaskDragStart = (task) => {
        props.taskMoveStartHandler(taskList, task)
    }

    const onDrop = (e) => {
        e.preventDefault()
        props.taskMoveEndHandler(taskList)
    }

    const onTaskDrop = () => {
        getTasks(taskList.id)
    }

    useEffect(() => {
        getTasks(taskList.id)
    }, [props.taskList])

  return (
    <div style={listWrapperStyle}>
        <Container style={listStyle} className='dropZone'  onDrop={(e) => onDrop(e)} onDragOver={(e) => onDragOver(e)}>
            <div style={columnHeaderStyle}>
                <div style={{width: '60%'}}>
                    <h3>{taskList.name}</h3>
                </div>
                <Button variant='outline-warning' onClick={(e) => openEditPopup()} >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
                <Button variant='outline-danger' onClick={(e) => showDeleteModal()} >
                    <FontAwesomeIcon icon={faXmark} />
                </Button>
            </div>

            <Container style={style} >
                {
                    tasks.map(task => (
                        <TaskItem key={task.id}
                            task={task} 
                            editHandler={onTaskEdit} 
                            deleteHandler={onTaskDelete} 
                            dragStartHandler={onTaskDragStart}
                            dragEndHandler={onTaskDragEnd}/>
                    ))
                }
            </Container>

            
        </Container>
        <CreateTaskForm createHandler={onTaskCreate}/>

        <DeletePopup model={taskList} 
            deleteHandler={onListDelete} 
            show={deleteModalShown} 
            closeHandler={closeDeleteModal} />

        <EditPopup model={taskList} 
                            show={editPopupShown} 
                            closeHandler={closeEditPopup}
                            editHandler={onTaskListEdit}
                            />

    </div>
  )
}

export default TaskColumn