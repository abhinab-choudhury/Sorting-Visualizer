import Footer from '../components/footer'
import Tabnavbar from '../components/header'
import Visualizer from '../components/visualizer'

export const Index = () => {
  return (
    <main className="min-h-screen">
      <Tabnavbar />
      <Visualizer />
      <Footer />
    </main>
  )
}
