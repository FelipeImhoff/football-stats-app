import Content from '../components/Content'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <>
      <Navbar />
      <Content>
        <div className='text-white'>
          <h1>
            Página Inicial
          </h1>
          <h2>Seja bem-vindo(a)</h2>
        </div>
      </Content>
    </>
  )
}

export default Home