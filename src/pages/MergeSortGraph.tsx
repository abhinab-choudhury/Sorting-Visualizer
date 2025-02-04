import Footer from '../components/Footer'
import Tabnavbar from '../components/Header'
import Visualizer from '../components/Visualizer'

export const MergeSort = () => {
  return (
    <main className="min-h-screen">
      <Tabnavbar />
      <Visualizer algorithm='mergesort' />
      <Footer />
    </main>
  )
}
