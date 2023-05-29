import styled from 'styled-components'
import HomePage from './pages/HomePage/HomePage'
import axios from 'axios'
import SeatsPage from './pages/SeatsPage/SeatsPage'
import SessionsPage from './pages/SessionsPage/SessionsPage'
import SuccessPage from './pages/SuccessPage/SuccessPage'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import BackButton from './components/BackButton'

export default function App() {
  axios.defaults.headers.common['Authorization'] = '8dzF6yBI5huhv1KCdXsobY94'

  return (
    <>
      <BrowserRouter>
        <Link to={'/'}>
          <NavContainer>CINEFLEX</NavContainer>
        </Link>
        <BackButton />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
          <Route path="/seats/:idShowtime" element={<SeatsPage />} />
          <Route path="/sucess" element={<SuccessPage />} />
        </Routes>
      </BrowserRouter>
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
