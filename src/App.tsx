import { Index } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Index />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
