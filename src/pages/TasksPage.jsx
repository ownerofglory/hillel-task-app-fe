import React from 'react'

import NavigationBar from '../components/common/NavigationBar'
import FlexHorScrollContainer from '../components/common/FlexHorScrollContainer'
import TaskColumn from '../components/TaskColumn'
import TaskItem from '../components/TaskItem'
import CreateListForm from '../components/CreateListForm'

const TasksPage = () => {

  return (
    <div>
        <NavigationBar />
        <h1>Task Board name</h1>

        <FlexHorScrollContainer>
            <TaskColumn>
                <TaskItem></TaskItem>
                <TaskItem></TaskItem>
                <TaskItem></TaskItem>
                <TaskItem></TaskItem>
            </TaskColumn>

            <TaskColumn>
                <TaskItem></TaskItem>
                <TaskItem></TaskItem>
                <TaskItem></TaskItem>
                <TaskItem></TaskItem>
                <TaskItem></TaskItem>
                <TaskItem></TaskItem>
                <TaskItem></TaskItem>
                <TaskItem></TaskItem>
            </TaskColumn>

            <TaskColumn>
                <TaskItem></TaskItem>
            </TaskColumn>

            <TaskColumn>
                <TaskItem></TaskItem>
            </TaskColumn>

            <TaskColumn>
                <TaskItem></TaskItem>
            </TaskColumn>

            <CreateListForm />

        </FlexHorScrollContainer>
    </div>
  )
}

export default TasksPage