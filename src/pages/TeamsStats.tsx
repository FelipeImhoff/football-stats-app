import { useEffect, useState } from 'react'
import Content from '../components/Content'
import Navbar from '../components/Navbar'
import api from '../api'
import SelectField from '../components/SelectField'
import BarChart from '../components/BarChart'
import DonutChart from '../components/DonutChart'

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
                wantedProperty='name'
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
                wantedProperty='name'
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
              {stats &&
                <>
                  <BarChart
                    categories={['Vitórias Local', 'Empates', 'Vitórias Visitantes']}
                    series={[{
                      name: '',
                      data: [
                        { x: '', y: stats.homeTeamWins },
                        { x: '', y: stats.draws },
                        { x: '', y: stats.awayTeamWins }
                      ]
                    }]}
                    horizontal={false}
                    max={undefined}
                    title='Total Resultados'
                  />
                  <DonutChart
                    series={[
                      { label: 'Vitórias Local', value: stats.homeTeamWinPercentage, fairOdd: stats.fairOdds.homeTeamWins},
                      { label: 'Empates', value: stats.drawsPercentage, fairOdd: stats.fairOdds.draws },
                      { label: 'Vitórias Visitantes', value: stats.awayTeamWinPercentage, fairOdd: stats.fairOdds.awayTeamWins}
                    ]}
                    title='Resultados Percentual'
                  />
                  <DonutChart
                    series={[
                      {label: 'Sim', value: stats.bothScoredPercentual, fairOdd: stats.fairOdds.bothScored },
                      {label: 'Não', value: stats.notBothScoredPercentual, fairOdd: stats.fairOdds.notBothScored }
                    ]}
                    title='Ambos Marcam'
                  />
                  <BarChart
                    categories={['Mandante ou Empate', 'Empate ou Visitante', 'Mandante ou Visitante']}
                    series={[
                      {
                        name: '',
                        data: [
                          { x: '', y: stats.homeOrDrawsPercentage, fairOdd: stats.fairOdds.homeOrDraws},
                          { x: '', y: stats.awayOrDrawsPercentage, fairOdd: stats.fairOdds.awayOrDraws },
                          { x: '', y: stats.homeOrAwayWinPercentage, fairOdd: stats.fairOdds.homeOrAwayWins },
                        ]
                      },
                    ]}
                    horizontal={true}
                    max={undefined}
                    title='Chance Dupla'
                  />
                  <BarChart
                    categories={['Pelo menos 1 gol', 'Pelo menos 2 gols', 'Pelo menos 3 gols', 'Pelo menos 4 gols', 'Pelo menos 5 gols']}
                    series={[
                      {
                        name: '',
                        data: [
                          { x: '', y: stats.homeTeamGoalsOverPercentage.atLeast1, fairOdd: stats.fairOdds.homeTeamGoalsOver.atLeast1 },
                          { x: '', y: stats.homeTeamGoalsOverPercentage.atLeast2, fairOdd: stats.fairOdds.homeTeamGoalsOver.atLeast2 },
                          { x: '', y: stats.homeTeamGoalsOverPercentage.atLeast3, fairOdd: stats.fairOdds.homeTeamGoalsOver.atLeast3 },
                          { x: '', y: stats.homeTeamGoalsOverPercentage.atLeast4, fairOdd: stats.fairOdds.homeTeamGoalsOver.atLeast4 },
                          { x: '', y: stats.homeTeamGoalsOverPercentage.atLeast5, fairOdd: stats.fairOdds.homeTeamGoalsOver.atLeast5 },
                        ]
                      },
                    ]}
                    horizontal={true}
                    max={undefined}
                    title='Gols Mandante'
                  />
                  <BarChart
                    categories={['Pelo menos 1 gol', 'Pelo menos 2 gols', 'Pelo menos 3 gols', 'Pelo menos 4 gols', 'Pelo menos 5 gols']}
                    series={[
                      {
                        name: '',
                        data: [
                          { x: '', y: stats.awayTeamGoalsOverPercentage.atLeast1, fairOdd: stats.fairOdds.awayTeamGoalsOver.atLeast1 },
                          { x: '', y: stats.awayTeamGoalsOverPercentage.atLeast2, fairOdd: stats.fairOdds.awayTeamGoalsOver.atLeast2 },
                          { x: '', y: stats.awayTeamGoalsOverPercentage.atLeast3, fairOdd: stats.fairOdds.awayTeamGoalsOver.atLeast3 },
                          { x: '', y: stats.awayTeamGoalsOverPercentage.atLeast4, fairOdd: stats.fairOdds.awayTeamGoalsOver.atLeast4 },
                          { x: '', y: stats.awayTeamGoalsOverPercentage.atLeast5, fairOdd: stats.fairOdds.awayTeamGoalsOver.atLeast5 },
                        ]
                      },
                    ]}
                    horizontal={true}
                    max={undefined}
                    title='Gols Visitante'
                  />
                  <BarChart
                    categories={['Pelo menos 1 gol', 'Pelo menos 2 gols', 'Pelo menos 3 gols', 'Pelo menos 4 gols', 'Pelo menos 5 gols']}
                    series={[
                      {
                        name: '',
                        data: [
                          { x: '', y: stats.gameTotalOverPercentage.atLeast1, fairOdd: stats.fairOdds.gameTotalOver.atLeast1 },
                          { x: '', y: stats.gameTotalOverPercentage.atLeast2, fairOdd: stats.fairOdds.gameTotalOver.atLeast2 },
                          { x: '', y: stats.gameTotalOverPercentage.atLeast3, fairOdd: stats.fairOdds.gameTotalOver.atLeast3 },
                          { x: '', y: stats.gameTotalOverPercentage.atLeast4, fairOdd: stats.fairOdds.gameTotalOver.atLeast4 },
                          { x: '', y: stats.gameTotalOverPercentage.atLeast5, fairOdd: stats.fairOdds.gameTotalOver.atLeast5 },
                        ]
                      },
                    ]}
                    horizontal={true}
                    max={undefined}
                    title='Total Gols'
                  />
                  <BarChart
                    categories={[
                      'Média de Gols Mandante',
                      'Média de Gols Visitante',
                      'Mínimo de Gols Mandante',
                      'Mínimo de Gols Visitante',
                      'Máximo de Gols Mandante',
                      'Máximo de Gols Visitante',
                    ]}
                    series={[
                      {
                        name: '',
                        data: [
                          { x: '', y: stats.homeTeamGoalsAverage },
                          { x: '', y: stats.awayTeamGoalsAverage },
                          { x: '', y: stats.homeTeamMinGoals },
                          { x: '', y: stats.awayTeamMinGoals },
                          { x: '', y: stats.homeTeamMaxGoals },
                          { x: '', y: stats.awayTeamMaxGoals },
                        ]
                      },
                    ]}
                    horizontal={true}
                    max={undefined}
                    title='Gols'
                  />
                </>
              }
            </div>
          </div>
        </>
      </Content>
    </>
  )
}

export default TeamsStats