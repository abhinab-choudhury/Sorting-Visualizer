import Footer from '../components/Footer'
import Tabnavbar from '../components/Header'
import Visualizer from '../components/Visualizer'

export const QuickSort = () => {
  return (
    <main className="min-h-screen">
      <Tabnavbar />
      <Visualizer algorithm='quicksort' />
      <Footer />
    </main>
  )
}
