import React from 'react'

import { Container, Row, Col } from 'react-bootstrap'

import NavigationBar from '../components/common/NavigationBar'
import FlexItemContainer from '../components/common/FlexItemContainer'
import TaskBoardItem from '../components/TaskBoardItem'
import CreateBoardForm from '../components/CreateBoardForm'

const BoardsPage = () => {

  return (
    <div>
        <NavigationBar />

        <Container>
          <Row>
            <h1>Boards</h1>
          </Row>
          <Row>
            <Col md={12}>
              <FlexItemContainer>
                <TaskBoardItem />
                <TaskBoardItem />
                <TaskBoardItem />

                <CreateBoardForm/>
              </FlexItemContainer>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default BoardsPage