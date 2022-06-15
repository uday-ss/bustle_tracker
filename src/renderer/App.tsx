import { AppWrapper, AppContainer } from './App.styled'
import CustomRoutes from './routes'

const App = () => {
  return (
    <AppContainer className='App'>
      <AppWrapper>
        <CustomRoutes />
      </AppWrapper>
    </AppContainer>
  )
}

export default App
