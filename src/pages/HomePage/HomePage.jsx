import styled from 'styled-components'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const [data, setData] = useState([])
  const URL = 'https://mock-api.driven.com.br/api/v8/cineflex/movies'

  useEffect(() => {
    axios
      .get(URL)
      .then(response => {
        console.log(response.data)
        setData(response.data)
      })
      .catch(() => console.error('algum erro ocorreu'))
  }, [])

  if (data.length === 0) {
    return (
      <PageContainer>
        <img
          src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
          alt=""
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      Selecione o filme
      <ListContainer>
        {data.map(data => (
          <div key={data.id}>
            <MovieContainer>
              <Link to={`/sessions/${data.id}`}>
                <img data-test="movie" src={data.posterURL} alt="poster" />
              </Link>
            </MovieContainer>
          </div>
        ))}
      </ListContainer>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto';
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-top: 70px;
`
const ListContainer = styled.div`
  width: 330px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
`
const MovieContainer = styled.div`
  width: 145px;
  height: 210px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  img {
    width: 130px;
    height: 190px;
  }
`
