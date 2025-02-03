'use client'

import * as React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

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
import { CirclePause, CirclePlay, RotateCcw } from 'lucide-react'

export const description = 'An interactive bar chart'

const chartConfig = {
  views: {
    label: 'Heights',
  },
  height: {
    label: 'Heights',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function Graph() {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>('height')
  const [pausePlayBtnVisible, setPausePlayBtnVisible] = React.useState(false)
  const [play, setPlay] = React.useState(false);
  const [data, setData] = React.useState<{ "height":number }[]>([])
  const [comparisons, setComparisons] = React.useState(0);
  
  const playRef = React.useRef<boolean>(false);
  
  React.useEffect(() => {
    generateRandom();
  }, []); 
  
  // Reset & Generate Random Heights
  const generateRandom = () => {
    setPlay(false); // Stop sorting if running
    const newData = Array.from({ length: 100 }, () => ({
      height: Math.floor(Math.random() * 500) + 1,
    }));
    setData(newData);
    setComparisons(0);
  };
  

  const TogglePlay = () => {
    setPlay((prev) => !prev);
  };

  const BubbleSort = async () => {
    console.log("Sorting Started")
    
    const n = data.length;
    const sortedData = [...data];
    
    
    setPausePlayBtnVisible(true); // Updated the UI for the Control Buttons
    setPlay(true); // Ensures the Playing is True
    for (let i = 0; i < n; i++) {
      for(let j = 0;j < n - i - 1;j++) {
        if(sortedData[j].height > sortedData[j + 1].height) {
          [sortedData[j], sortedData[j + 1]] = [sortedData[j + 1], sortedData[j]];

          await new Promise((resolve) => setTimeout(resolve, 15));
          setComparisons((prev) => prev + 1)
          setData([...sortedData]);
        }

        // If play was set to false during sorting, stop immediately
        if (!play) return;
      }
    }
    setPlay(false) // Ensures the Playing is False
    setPausePlayBtnVisible(false); // Updated the UI for the Control Buttons
  };

  return (
    <Card className='h-full w-full mx-auto m-2'>
      <CardHeader className="my-auto flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Sorting Algorithm - Bubble Sort</CardTitle>
          <CardDescription>
            Visualizing array sorting with a bar chart.
          </CardDescription>
        </div>
        <div className="flex">
            <div
              className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
            >
              <div className='flex flex-row gap-1 h-[36px]'>
                {play ? (
                  <Button variant={'outline'} onClick={TogglePlay} className={`${!pausePlayBtnVisible ? "hidden" : ""} text-black border-black p-2 w-full active:scale-95 active:transition-all`}>
                    <CirclePause />
                  </Button>
                ) : (
                  <Button variant={'outline'} onClick={TogglePlay} className={`${!pausePlayBtnVisible ? "hidden" : ""} text-black border-black p-2 w-full active:scale-95 active:transition-all`}>
                    <CirclePlay />
                  </Button>
                )} 
                {pausePlayBtnVisible ? (
                  <Button variant={'outline'} disabled onClick={generateRandom} className="text-black border-black w-full active:scale-95 active:transition-all">
                    <RotateCcw />
                  </Button>
                ) : (
                  <Button variant={'outline'} onClick={generateRandom} className="text-black border-black w-full active:scale-95 active:transition-all">
                    <RotateCcw />
                  </Button>
                )}
              </div>
              <div className='flex flex-col'>
                <span className="text-muted-foreground text-xs">
                  Total Comparisons: <span className='font-extrabold text-lg'>{comparisons}</span>
                </span>
                {play ? (
                  <Button disabled variant={'outline'} onClick={BubbleSort}>
                    Start
                  </Button>
                ) : (
                  <Button variant={'outline'} onClick={BubbleSort}>
                    Start
                  </Button>
                )}
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
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
