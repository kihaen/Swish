
import { MarketTable } from './components/MarketTable'
import './App.css'
import { usePlayerData } from './hooks/usePlayerData';

function App() {


  const { formattedPlayerData, playerFilter, updatePlayer } = usePlayerData()

  return (
    <>
    <MarketTable data={formattedPlayerData} playerFilter={playerFilter} updatePlayer={updatePlayer}/>
    </>
  )
}

export default App
