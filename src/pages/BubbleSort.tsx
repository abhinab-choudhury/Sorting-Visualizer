import Footer from '../components/Footer'
import Tabnavbar from '../components/Header'
import Visualizer from '../components/Visualizer'

export const BubbleSort = () => {
  return (
    <main className="min-h-screen">
      <Tabnavbar />
      <Visualizer algorithm='bubblesort' />
      <Footer />
    </main>
  )
}
