import { Graph as BubbleSortGraph } from './BubbleSortGraph'
import { Graph as QuickSortGraph } from './QuickSortGraph';
import { Graph as MergeSortGraph } from './MergeSortGraph';
import { Graph as SelectionSortGraph } from './SelectionSortGraph';

interface VisualizerProps {
  algorithm: "bubblesort" | "quicksort" | "mergesort" | "selectionsort"
}

const algorithmComponents = {
  bubblesort: BubbleSortGraph,
  quicksort: QuickSortGraph,
  mergesort: MergeSortGraph,
  selectionsort: SelectionSortGraph,
};

const Visualizer = ({ algorithm }:VisualizerProps ) => {
  const AlgorithmComponent = algorithmComponents[algorithm] || null;

  return (
    <div className="flex flex-col lg:flex-row justify-center align-middle items-center gap-4 m-10">
      {AlgorithmComponent ? <AlgorithmComponent /> : <p> Select an algorithm </p>}
    </div>
  )
}

export default Visualizer
