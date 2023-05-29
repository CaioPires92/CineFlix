import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

export default function SeatsPage() {
  const [data, setData] = useState([])
  const [seatsList, setSeatsList] = useState([])
  const [seatsListId, setSeatsListId] = useState([])
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const navigate = useNavigate()
  const { idShowtime } = useParams()
  const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idShowtime}/seats`

  useState(() => {
    axios
      .get(URL)
      .then(respose => {
        setData(respose.data)
      })
      .catch(erro => console.log('Algo deu errado: ', erro))
  }, [])

  if (data.length === 0) {
    return 'carregando'
  }

  // console.log(data)

  function handleClick(seat) {
    const seatIndex = seatsList.findIndex(item => item.id === seat.id)

    if (seat.isAvailable) {
      if (seatIndex !== -1) {
        // O assento já está presente na lista, então vamos removê-lo
        setSeatsList(prevState => prevState.filter(item => item.id !== seat.id))
      } else {
        // O assento não está na lista, então vamos adicioná-lo
        setSeatsList(prevState => [...prevState, seat])
        setSeatsListId(prevState => [...prevState, seat.id])
      }
    } else {
      alert('Assento indisponível')
    }
  }

  // console.log('lista de assentos', seatsListId)

  function addReserva(e) {
    e.preventDefault()

    const reservado = {
      ids: seatsListId,
      name: name,
      cpf: cpf
    }
    const dataReservation = {
      ids: seatsListId,
      name: name,
      cpf: cpf,
      seatsList: seatsList,
      filme: data.movie,
      horario: data.name,
      dia: data.day,
      idShowtime: idShowtime
    }

    const URL =
      ' https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many'

    const promise = axios.post(URL, reservado)
    promise.then(response => navigate('/sucess', { state: dataReservation }))
    promise.catch(erro => console.log(erro.response.data))

    console.log(name)
    console.log(cpf)
  }

  console.log(data.movie)

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {data.seats.map(seat => {
          const isSeatSelected = seatsList.some(item => item.id === seat.id)

          return (
            <div key={seat.id}>
              <SeatItem
                onClick={() => handleClick(seat)}
                isAvailable={seat.isAvailable}
                isSelected={isSeatSelected}
              >
                {seat.name}
              </SeatItem>
            </div>
          )
        })}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle status={'selected'} />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle status={'available'} />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle status={'not-available'} />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormContainer>
        <form onSubmit={addReserva}>
          <label htmlFor="name">Nome do Comprador:</label>
          <input
            id="name"
            placeholder="Digite seu nome..."
            value={name}
            required
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="cpf">CPF do Comprador:</label>
          <input
            id="cpf"
            placeholder="Digite seu CPF..."
            value={cpf}
            required
            onChange={e => setCpf(e.target.value)}
          />
          <button type="submit">Reservar Assento(s)</button>
        </form>
      </FormContainer>
      <FooterContainer>
        <div>
          <img src={data.movie.posterURL} alt="poster" />
        </div>
        <div>
          <p>{data.movie.title}</p>
          <p>
            {data.day.weekday} - {data.name}
          </p>
        </div>
      </FooterContainer>
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
  padding-bottom: 120px;
  padding-top: 70px;
`
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`
const FormContainer = styled.div`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`
const CaptionCircle = styled.div`
  border: 1px solid
    ${props => {
      switch (props.status) {
        case 'selected':
          return 'green'
        case 'not-available':
          return 'red'
        case 'available':
          return 'gray'
      }
    }};
  background-color: ${props => {
    switch (props.status) {
      case 'selected':
        return 'green'
      case 'not-available':
        return 'red'
      case 'available':
        return 'gray'
    }
  }};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`
const SeatItem = styled.div`
  border: 1px solid
    ${props =>
      props.isSelected ? 'green' : props.isAvailable ? 'gray' : 'red'};
  background-color: ${props =>
    props.isSelected
      ? 'green'
      : props.isAvailable
      ? 'gray'
      : 'red'}; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: 'Roboto';
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
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
