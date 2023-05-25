import styled from 'styled-components'
import HomePage from './pages/HomePage/HomePage'
import axios from 'axios'
import SeatsPage from './pages/SeatsPage/SeatsPage'
import SessionsPage from './pages/SessionsPage/SessionsPage'
import SuccessPage from './pages/SuccessPage/SuccessPage'

export default function App() {
  axios.defaults.headers.common['Authorization'] = '8dzF6yBI5huhv1KCdXsobY94'

  return (
    <>
      <NavContainer>CINEFLEX</NavContainer>

      <HomePage />
      {/* <SeatsPage /> */}
      {/* <SessionsPage /> */}
      {/* <SuccessPage /> */}
    </>
  )
}

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cfd9;
  color: #e8833a;
  font-family: 'Roboto', sans-serif;
  font-size: 34px;
  position: fixed;
  top: 0;
  a {
    text-decoration: none;
    color: #e8833a;
  }
`
