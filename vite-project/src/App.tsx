
import { MarketTable } from './components/MarketTable'
import './App.css'
import { usePlayerData } from './hooks/usePlayerData';

function App() {


  const { formattedPlayerData } = usePlayerData()

  return (
    <>
    <MarketTable data={formattedPlayerData}/>
    </>
  )
}

export default App
