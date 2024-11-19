import { Link } from 'react-router-dom'

const menuOptions = [{
  id: 1,
  name: 'Teams Stats',
  route: '/teams-stats'
}]

function Navbar() {
  return (
    <>
      <nav className='flex bg-green-400 h-16 w-screen'>
        <div className='p-7 border-gray-800 flex items-center justify-center'>
          <h2>
            <Link to={'/'}>Estatísticas</Link>
          </h2>
        </div>
        <ul className='flex text-nowrap'>
          {menuOptions.map(option => {
            return (
              <li key={option.id} className='hover:bg-green-500 w-full px-4 flex items-center justify-center'>
                <Link to={option.route}>{option.name}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
