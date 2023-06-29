import { Grid, Wrapper } from '.'
import './App.css'
import Container from './components/Container'

function App() {

  return (
    <>
      <Wrapper name="demo">
        <Grid>grid1</Grid>
        <Grid>grid2</Grid>
        <Container>
          <Grid>inner grid3</Grid>
          <Grid>inner grid4</Grid>
        </Container>
      </Wrapper>
    </>
  )
}

export default App
