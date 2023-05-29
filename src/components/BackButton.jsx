import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const voltarParaAnterior = () => {
    navigate(-1)
  }

  const exibirBotaoVoltar = location.pathname !== '/'

  return (
    <div>
      {/* Resto do conteúdo do seu app */}
      {exibirBotaoVoltar && (
        <CornerButton onClick={voltarParaAnterior}>Voltar</CornerButton>
      )}
    </div>
  )
}

export default BackButton

const CornerButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  background-color: #e8833a;
  border-color: #e8833a;

  font-weight: 400;
  font-size: 18px;

  color: #ffffff;
`
