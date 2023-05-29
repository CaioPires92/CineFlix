import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

export default function SessionsPage() {
  const [data, setData] = useState([])
  const { idFilme } = useParams()

  console.log(data)

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`
    axios
      .get(URL)
      .then(response => setData(response.data))
      .catch(() => console.error('Ocorrou algum erro'))
  }, [])

  if (data.length === 0) {
    return 'Loading..........'
  }

  return (
    <PageContainer>
      Selecione o horário
      {data.days.map(day => (
        <div key={day.id}>
          <SessionContainer data-test="movie-day">
            {day.weekday} - {day.date}
            <ButtonsContainer>
              {day.showtimes.map(showtime => (
                <div key={showtime.id}>
                  <Link data-test="showtime" to={`/assentos/${showtime.id}`}>
                    <button>{showtime.name}</button>
                  </Link>
                </div>
              ))}
            </ButtonsContainer>
          </SessionContainer>
        </div>
      ))}
      <FooterContainer data-test="footer">
        <div>
          <img src={data.posterURL} alt="poster" />
        </div>
        <div>
          <p>{data.title}</p>
        </div>
      </FooterContainer>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto';
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
`
const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'Roboto';
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  button {
    margin-right: 20px;
    padding: 20px 40px;
    color: #ffff;
    background: #e8833a;
    border: #e8833a;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      filter: brightness(95%);
    }
  }

  a {
    text-decoration: none;
  }
`

const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`
