import React, {  useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import NavigationBar from '../components/common/NavigationBar'
import FlexHorScrollContainer from '../components/common/FlexHorScrollContainer'
import TaskColumn from '../components/TaskColumn'
import CreateListForm from '../components/CreateListForm'

const baseUrl = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8000/api'

const TasksPage = () => {
    const {id} = useParams()
    const [board, setBoard] = useState({})
    const [taskLists, setTaskLists] = useState([])
    const [taskMove, setTaskMove] = useState({})

    const getTaskLists = () => {
        return fetch(`${baseUrl}/lists?boardId=${id}`)
            .then(resp => {
                if (resp.status === 200) {
                    return resp.json()
                }
            })
    }

    useEffect(() => {
         fetch(`${baseUrl}/boards/${id}`)
            .then(resp => {
                if (resp.status === 200) {
                    return resp.json()
                }
            }).then(data => {
                if (data) {
                    setBoard(data)
                }
            }).then(() => getTaskLists())
              .then(data => {
                if (data) {
                    setTaskLists(data)
                }
            })
      return () => {
      }
    }, [id])

    const onTaskListCreate = (taskList) => {
        return fetch(`${baseUrl}/lists`, {
            method: 'POST',
            body: JSON.stringify({...taskList, boardId: board.id}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            if (resp.status === 200) {  
                return resp.json()
            }
        }).then(data => {
            if (data) {
                const newTaskList = [data, ...taskLists]
                setTaskLists(newTaskList)
            }
        })
    }

    const onListDelete = (taskList) => {
        const newTaskLists = taskLists.filter(list => list.id !== taskList.id)
        setTaskLists(newTaskLists)
    }

    const onTaskMoveStart = (oldTaskList, task) => {
        taskMove.oldList = oldTaskList
        taskMove.task = task
        setTaskMove(taskMove)
    }

    const onTaskMoveEnd = (newTaskList) => {
        taskMove.newList = newTaskList
        setTaskMove(taskMove)
        console.log('Task moved', taskMove)

        return fetch(`${baseUrl}/lists/taskMove`, {
            method: 'POST',
            body: JSON.stringify(taskMove)
        }).then(resp => {
            if (resp.status === 200) {
                return resp.json()
            }
        }).then(data => {
            if (data) {
                getTaskLists().then(data => {
                    if (data) {
                        setTaskLists(data)
                    }
                })
            }
        })
    }

  return (
    <div>
        <NavigationBar />
        <h1>{board.name}</h1>

        <FlexHorScrollContainer>
            {
                taskLists.map(list => (
                    <TaskColumn key={list.id}
                        taskList={list} 
                        listDeleteHandler={onListDelete}
                        taskMoveStartHandler={onTaskMoveStart}
                        taskMoveEndHandler={onTaskMoveEnd}
                        />
                ))
            }

            <CreateListForm createHandler={onTaskListCreate} />

        </FlexHorScrollContainer>
    </div>
  )
}

export default TasksPage