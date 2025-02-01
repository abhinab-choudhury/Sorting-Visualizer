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

export const description = 'An interactive bar chart'

const chartData = [
  { height: 222 },
  { height: 97 },
  { height: 167 },
  { height: 242 },
  { height: 373 },
  { height: 301 },
  { height: 245 },
  { height: 409 },
  { height: 59 },
  { height: 261 },
  { height: 327 },
  { height: 292 },
  { height: 342 },
  { height: 137 },
  { height: 120 },
  { height: 138 },
  { height: 446 },
  { height: 364 },
  { height: 243 },
  { height: 89 },
  { height: 137 },
  { height: 224 },
  { height: 138 },
  { height: 387 },
  { height: 215 },
  { height: 75 },
  { height: 383 },
  { height: 122 },
  { height: 315 },
  { height: 454 },
  { height: 165 },
  { height: 293 },
  { height: 247 },
  { height: 385 },
  { height: 481 },
  { height: 498 },
  { height: 388 },
  { height: 149 },
  { height: 227 },
  { height: 293 },
  { height: 335 },
  { height: 197 },
  { height: 197 },
  { height: 448 },
  { height: 473 },
  { height: 338 },
  { height: 499 },
  { height: 315 },
  { height: 235 },
  { height: 177 },
  { height: 82 },
  { height: 81 },
  { height: 252 },
  { height: 294 },
  { height: 201 },
  { height: 213 },
  { height: 420 },
  { height: 233 },
  { height: 78 },
  { height: 340 },
  { height: 178 },
  { height: 178 },
  { height: 470 },
  { height: 103 },
  { height: 439 },
  { height: 88 },
  { height: 294 },
  { height: 323 },
  { height: 385 },
  { height: 438 },
  { height: 155 },
  { height: 92 },
  { height: 492 },
  { height: 81 },
  { height: 426 },
  { height: 307 },
  { height: 371 },
  { height: 475 },
  { height: 107 },
  { height: 341 },
  { height: 408 },
  { height: 169 },
  { height: 317 },
  { height: 480 },
  { height: 132 },
  { height: 141 },
  { height: 434 },
  { height: 448 },
  { height: 149 },
  { height: 103 },
  { height: 446 }
]

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

  const total = React.useMemo(
    () => ({
      height: chartData.reduce((acc, curr) => acc + curr.height, 0),
    }),
    []
  )

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
          {['height'].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
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
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
