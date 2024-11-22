import { useEffect, useState } from 'react'
import Content from '../components/Content'
import Navbar from '../components/Navbar'
import api from '../api'
import SelectField from '../components/SelectField'
import ChartsGroup from '../components/ChartsGroup'

type Stats = {
  games: number,
  homeTeamWins: number,
  draws: number,
  awayTeamWins: number,
  homeTeamWinPercentage: string,
  homeOrDrawsPercentage: string,
  drawsPercentage: string,
  awayOrDrawsPercentage: string,
  awayTeamWinPercentage: string,
  homeOrAwayWinPercentage: string,
  homeTeamGoalsAverage: string,
  awayTeamGoalsAverage: string,
  bothScored: number,
  bothScoredPercentual: string,
  notBothScoredPercentual: string
  homeTeamMinGoals: number,
  awayTeamMinGoals: number,
  homeTeamMaxGoals: number,
  awayTeamMaxGoals: number,
  homeTeamGoalsOver: {
    atLeast1: number,
    atLeast2: number,
    atLeast3: number,
    atLeast4: number,
    atLeast5: number
  },
  homeTeamGoalsOverPercentage: {
    atLeast1: string,
    atLeast2: string,
    atLeast3: string,
    atLeast4: string,
    atLeast5: string
  },
  awayTeamGoalsOver: {
    atLeast1: number,
    atLeast2: number,
    atLeast3: number,
    atLeast4: number,
    atLeast5: number
  },
  awayTeamGoalsOverPercentage: {
    atLeast1: string,
    atLeast2: string,
    atLeast3: string,
    atLeast4: string,
    atLeast5: string
  },
  gameTotalOverPercentage: {
    atLeast1: string,
    atLeast2: string,
    atLeast3: string,
    atLeast4: string,
    atLeast5: string
  },
  fairOdds: {
    homeTeamWins: string,
    homeOrAwayWins: string,
    homeOrDraws: string,
    draws: string,
    awayOrDraws: string,
    awayTeamWins: string,
    bothScored: string,
    notBothScored: string,
    homeTeamGoalsOver: {
      atLeast1: string,
      atLeast2: string,
      atLeast3: string,
      atLeast4: string,
      atLeast5: string,
    },
    awayTeamGoalsOver: {
      atLeast1: string,
      atLeast2: string,
      atLeast3: string,
      atLeast4: string,
      atLeast5: string,
    },
    gameTotalOver: {
      atLeast1: string,
      atLeast2: string,
      atLeast3: string,
      atLeast4: string,
      atLeast5: string,
    },
  }
}

type OptionType = {
  id: string
  [key: string]: string;
}

const TeamsStats = () => {
  const [homeManagers, setHomeManagers] = useState<OptionType[]>([])
  const [homeManager, setHomeManager] = useState<string>('')
  const [awayManagers, setAwayManagers] = useState<OptionType[]>([])
  const [awayManager, setAwayManager] = useState<string>('')
  const [homeTeams, setHomeTeams] = useState<OptionType[]>([])
  const [homeTeam, setHomeTeam] = useState<string>('')
  const [awayTeams, setAwayTeams] = useState<OptionType[]>([])
  const [awayTeam, setAwayTeam] = useState<string>('')
  const [stats, setStats] = useState<Stats | null>(null)

  const getHomeManagers = async () => {
    try {
      const { data } = await api.get('games/homeManagers')

      setHomeManagers(data)
    } catch (error) {
      console.error(error)
    }
  }

  const getAwayManagers = async () => {
    try {
      const { data } = await api.get('games/awayManagers')

      setAwayManagers(data)
    } catch (error) {
      console.error(error)
    }
  }

  const getTeams = async () => {
    try {
      const { data } = await api.get('teams')

      setHomeTeams(data)
      setAwayTeams(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleHomeManagerChange = (newValue: string) => {
    setHomeManager(newValue)
  }

  const handleAwayManagerChange = (newValue: string) => {
    console.log(newValue)
    setAwayManager(newValue)
  }

  const handleHomeTeamChange = (newValue: string) => {
    setHomeTeam(newValue)
  }
  
  const handleAwayTeamChange = (newValue: string) => {
    setAwayTeam(newValue)
  }

  const getStats = async () => {
    try {
      let query = ''
      if (homeManager) {
        query += `"homeManager":"${homeManager}"`
      }
      if (homeTeam) {
        if (query !== '') {
          query += ','
        }
        query += `"homeTeamId":"${homeTeam}"`
      }
      if (awayManager) {
        if (query !== '') {
          query += ','
        }
        query += `"awayManager":"${awayManager}"`
      }
      if (awayTeam) {
        if (query !== '') {
          query += ','
        }
        query += `"awayTeamId":"${awayTeam}"`
      }
      const { data } = await api.get(`games/GameStats?game={${query}}`)

      setStats(data)
    } catch (error) {
      console.error(error)
    }
  }

  const clearFilters = async () => {
    setHomeManager('')
    setHomeTeam('')
    setAwayManager('')
    setAwayTeam('')
  }

  const renderContent = () => {
    if(!stats) {
      return (
        <></>
      )
    } else if(stats.games == 0){
      return (
        <div className='text-white'>
          <p>Nenhum jogo encontrado para os filtros selecionados!</p>
        </div>
      )
    } else {
      return (
        <ChartsGroup stats={stats}/>
      )
    }
  }

  useEffect(() => {
    getHomeManagers()
    getAwayManagers()
    getTeams()
  }, [])

  return (
    <>
      <Navbar />
      <Content>
        <>
          <div className='flex p-2 gap-2'>
            <div className='flex flex-col gap-5 p-2 min-w-56'>
              <SelectField
                options={homeTeams}
                labelText='Time Local'
                selectedValue={homeTeam}
                onValueChange={handleHomeTeamChange}
                displayProperty='name'
                wantedProperty='id'
              />
              <SelectField
                options={homeManagers}
                labelText='Treinador Local'
                selectedValue={homeManager}
                onValueChange={handleHomeManagerChange}
                displayProperty='homeManager'
                wantedProperty='homeManager'
              />
              <SelectField
                options={awayTeams}
                labelText='Time Visitante'
                selectedValue={awayTeam}
                onValueChange={handleAwayTeamChange}
                displayProperty='name'
                wantedProperty='id'
              />
              <SelectField
                options={awayManagers}
                labelText='Treinador Visitante'
                selectedValue={awayManager}
                onValueChange={handleAwayManagerChange}
                wantedProperty='awayManager'
                displayProperty='awayManager'
              />
              <div className='flex flex-col gap-5 items-end'>
                <button
                  className='bg-green-400 h-6 w-full rounded text-gray-800 font-semibold'
                  onClick={getStats}
                >
                  Filtrar
                </button>
                <button
                  className='bg-green-400 h-6 w-full rounded text-gray-800 font-semibold'
                  onClick={clearFilters}
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
            <div className='flex gap-5 flex-wrap'>
              {renderContent()}
            </div>
          </div>
        </>
      </Content>
    </>
  )
}

export default TeamsStats