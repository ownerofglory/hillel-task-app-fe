import React, { useState, useEffect } from 'react'

import { Container, Row, Col } from 'react-bootstrap'

import NavigationBar from '../components/common/NavigationBar'
import FlexItemContainer from '../components/common/FlexItemContainer'
import TaskBoardItem from '../components/TaskBoardItem'
import CreateBoardForm from '../components/CreateBoardForm'

const baseUrl = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8000/api'

const BoardsPage = () => {
  const [boards, setBoards] = useState([])

  const getBoards = () => {
    return fetch(`${baseUrl}/boards`).then(resp => {
      if (resp.status === 200) {
        return resp.json()
      } 
      return []
    })
  }

  const onBoardCreate = (board) => {
    return fetch(`${baseUrl}/boards`, {
      method: 'POST',
      body: board
    }).then(resp => {
      if (resp.status === 200) {
        return resp.json()
      }
    }).then(data => {
      if (data) {
        const newBoards = [data, ...boards]
        console.log('new boards', newBoards)
        setBoards(newBoards)
      }
    })
  }

  useEffect(() => {
    getBoards().then(data => setBoards(data))
  
    return () => {
      
    }
  }, [])
  

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
                {
                  boards.map(board => (
                    <TaskBoardItem board={board} />
                  ))
                }
                {/* <TaskBoardItem />
                <TaskBoardItem />
                <TaskBoardItem /> */}

                <CreateBoardForm createHandler={onBoardCreate}/>
              </FlexItemContainer>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default BoardsPage