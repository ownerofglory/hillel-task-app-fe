import React from 'react';
import { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import EditPopup from './common/EditPopup';

const TaskItem = (props) => {
    const [task, setStask] = useState(props.task)
    const [editPopupShown, setEditPopupShown] = useState(false)

    const defaultStyle = {
        marginBottom: '20px'
    }

    const dragStyle = {
        ...defaultStyle,
        backgroundColor: '#3c3d3f'
    }

    const [style, setStyle] = useState(defaultStyle);

    const startDrag = (e) => {
        console.log('start drag', e)
        setStyle(dragStyle)
        props.dragStartHandler(task)
    }

    const endDrag = (e) => {
        console.log('end drag', e)
        setStyle(defaultStyle)
    }

    const drop = (e) => {
        console.log('item drop', e)
    }

    const openEditPopup = () => {
        setEditPopupShown(true)
    }

    const closeEditPopup = () => {
        setEditPopupShown(false)
    }

    const onTaskEdit = (editedTask) => {
        props.editHandler(editedTask).then(data => {
            if (data) {
                setStask(data)
            }
            closeEditPopup()
        })
    }

    const onTaskDelete = (id) => {
        // TODO: implement deletion
    }

    return (
            <Card style={style} 
                draggable='true' 
                onDragStart={(e) => startDrag(e)}
                onDragEnd={(e) => endDrag(e)}
                onDrop={(e) => drop(e)}
                onDoubleClick={openEditPopup}>

                <Card.Body>
                <Card.Title>{task?.title}</Card.Title>
                <Card.Text>
                   {task?.description}
                </Card.Text>
                </Card.Body>
                <EditPopup model={task}
                    show={editPopupShown}
                    closeHandler={closeEditPopup}
                    editHandler={onTaskEdit}
                     />
            </Card>
    )
}

export default TaskItem