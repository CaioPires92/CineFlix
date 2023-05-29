import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export default function SuccessPage() {
  const location = useLocation()
  const dados = location.state
  const navigate = useNavigate()

  function voltarHome() {
    navigate('/', { state: {} })
  }

  console.log(dados)

  return (
    <PageContainer>
      <h1>
        Pedido feito <br /> com sucesso!
      </h1>

      <TextContainer data-test="movie-info">
        <strong>
          <p>Filme e sessão</p>
        </strong>
        <p>{dados.filme.title}</p>
        <p>
          {dados.dia.date} - {dados.horario}
        </p>
      </TextContainer>

      <TextContainer data-test="seats-info">
        <strong>
          <p>Ingressos</p>
        </strong>
        {dados.seatsList.map(seat => (
          <p key={seat.name}>{seat.name}</p>
        ))}
      </TextContainer>

      <TextContainer data-test="client-info">
        <strong>
          <p>Comprador</p>
        </strong>
        <p>Nome: {dados.name}</p>
        <p>CPF: {dados.cpf}</p>
      </TextContainer>

      <button data-test="go-home-btn" onClick={voltarHome}>
        Voltar para Home
      </button>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto';
  font-size: 24px;
  color: #293845;
  margin: 30px 20px;
  padding-bottom: 120px;
  padding-top: 70px;
  a {
    text-decoration: none;
  }
  button {
    margin-top: 50px;
    width: 225px;
    height: 42px;
    color: #ffff;
    background-color: #e8833a;
    border: #e8833a;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      filter: brightness(95%);
    }
  }
  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #247a6b;
  }
`
const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
  strong {
    font-weight: bold;
    margin-bottom: 10px;
  }
`
