import Home from './pages'
import { BubbleSort } from './pages/BubbleSort'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SelectionSort } from './pages/SelectionSort'
import { QuickSort } from './pages/QuickSort'
import { MergeSort } from './pages/MergeSortGraph'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bubble-sort'  element={<BubbleSort />} />
        <Route path='/selection-sort' element={<SelectionSort />} />
        <Route path='/quick-sort' element={<QuickSort />} />
        <Route path='/merge-sort' element={<MergeSort />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
