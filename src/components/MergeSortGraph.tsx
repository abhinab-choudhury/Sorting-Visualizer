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
    color: 'hsl(var(--chart-4))',
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

  const merge = async (arr: Data[], left: number, mid: number, right: number) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (!playRef.current) return;
      setComparisons((prev) => prev + 1);

      if (leftArr[i].height <= rightArr[j].height) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
        setSwaps((prev) => prev + 1);
      }
      setData([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 20));
      k++;
    }

    while (i < leftArr.length) {
      if (!playRef.current) return;
      arr[k] = leftArr[i];
      i++;
      k++;
      setData([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }

    while (j < rightArr.length) {
      if (!playRef.current) return;
      arr[k] = rightArr[j];
      j++;
      k++;
      setData([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
  };

  const mergeSort = async (arr: Data[], left: number, right: number) => {
    if (left < right && playRef.current) {
      const mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  };

  const startMergeSort = async () => {
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
    await mergeSort(sortedData, 0, sortedData.length - 1);
  
    playRef.current = false;
    setPlay(false);
    setPausePlayBtnVisible(false);
  };
  

  return (
    <Card className='h-full w-full mx-auto m-2'>
      <CardHeader className="my-auto flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Sorting Algorithm - Merge Sort</CardTitle>
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
                  { play && <CirclePause /> }
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
                <Button disabled={play} variant={'outline'} onClick={startMergeSort}>
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
  )
}
