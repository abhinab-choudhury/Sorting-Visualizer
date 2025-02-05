'use client'

import * as React from 'react'
import { Bar, BarChart, CartesianGrid } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart'
import { Button } from './ui/button'
import { CirclePause, RotateCcw } from 'lucide-react'

export const description = 'An interactive bar chart'

interface Data {
    height: number;
}

const chartConfig = {
  views: {
    label: 'Heights',
  },
  height: {
    label: 'Heights',
    color: 'hsl(var(--chart-6))',
  },
} satisfies ChartConfig

export function Graph() {
  const [activeChart] = React.useState<keyof typeof chartConfig>('height')
  const [pausePlayBtnVisible, setPausePlayBtnVisible] = React.useState(false)
  const [play, setPlay] = React.useState(false);
  const [data, setData] = React.useState<Data[]>([])
  const [comparisons, setComparisons] = React.useState(0);
  const [swaps, setSwaps] = React.useState(0);
  
  const playRef = React.useRef<boolean>(false);
  
  React.useEffect(() => {
    generateRandom();
  }, []);

  const generateRandom = () => {
    setPlay(false);
    playRef.current = false;
    const newData: Data[] = Array.from({ length: 100 }, () => ({
      height: Math.floor(Math.random() * 500) + 1,
    }));
    setData(newData);
    setComparisons(0);
    setSwaps(0);
    setPausePlayBtnVisible(false);
  };

  const TogglePlay = () => {
    playRef.current = !playRef.current;
    setPlay(playRef.current);
  };

  const partition = async (arr: Data[], low: number, high: number): Promise<number> => {
    const randomIndex = low + Math.floor(Math.random() * (high - low + 1));
    [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]];
    const pivot = arr[high].height;
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (!playRef.current) return high; 
      
      setComparisons((prev) => prev + 1);
      if (arr[j].height < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setSwaps((prev) => prev + 1);
        setData([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setSwaps((prev) => prev + 1);
    setData([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 20));
    return i + 1;
  };

  const quickSort = async (arr: Data[], low: number, high: number) => {
    if (low < high && playRef.current) {
      const pi = await partition(arr, low, high);
      if (!playRef.current) return;
      await quickSort(arr, low, pi - 1);
      if (!playRef.current) return;
      await quickSort(arr, pi + 1, high);
    }
  };

  const startQuickSort = async () => {
    // Check if the array is already sorted
    const isAlreadySorted = data.every((val, i, arr) => 
      i === 0 || arr[i - 1].height <= val.height
    );
  
    if (isAlreadySorted) {
      generateRandom();
      return;
    }
  
    setPausePlayBtnVisible(true); 
    playRef.current = true; 
    setPlay(true);
  
    const sortedData = [...data];
    await quickSort(sortedData, 0, sortedData.length - 1);
  
    playRef.current = false;
    setPlay(false);
    setPausePlayBtnVisible(false);
  };  

  return (
    <Card className='h-full w-full mx-auto m-2'>
      <CardHeader className="my-auto flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Sorting Algorithm - Quick Sort</CardTitle>
          <CardDescription>
            Visualizing array sorting with a bar chart.
          </CardDescription>
        </div>
        <div className="flex">
            <div
              className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
            >
              <div className='flex flex-row gap-1 h-[36px]'>
                <Button variant={'outline'} onClick={TogglePlay} className={`${!pausePlayBtnVisible ? 'hidden' : ''} text-black border-black p-2 w-full active:scale-95 active:transition-all`}>
                  { play && <CirclePause />  }
                </Button>
                <Button variant={'outline'} onClick={generateRandom} disabled={pausePlayBtnVisible} className="text-black border-black w-full active:scale-95 active:transition-all">
                  <RotateCcw />
                </Button>
              </div>
              <div className='flex flex-col'>
                <span className="text-muted-foreground text-xs">
                  Total Comparisons: <span className="font-extrabold text-lg">{comparisons}</span>
                </span>
                <span className="text-muted-foreground text-xs">
                  Total Swaps: <span className="font-extrabold text-lg">{swaps}</span>
                </span>
                <Button disabled={play} variant={'outline'} onClick={startQuickSort}>
                  Start
                </Button>
              </div>
            </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey={activeChart} fill="var(--color-height)" />            
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}