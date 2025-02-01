import { Graph } from './graph'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Slider } from './ui/slider'
import { cn } from './../lib/utils'
import { Label } from './ui/label'

const Visualizer = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center align-middle items-center gap-4 m-10">
      <Graph />
      <Card className='md:w-[40%] h-[70vh]'>
        <CardHeader>
          <CardTitle>Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <Label htmlFor='size' className="leading-7 mb-5">Select the Size of Array:</Label>
            <Slider
              id="size"
              defaultValue={[50]}
              max={100}
              min={10}
              step={1}
              className={cn('md:w-[50%]')}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Adjust the slider to change the number of elements in the array (10-100).
            </p>

            {/* Speed Selector */}
            <div className="mt-6">
              <Label htmlFor="speed" className="leading-7 mb-5">Select the speed of visualization:</Label>
              <Slider
                id="speed"
                defaultValue={[50]}
                max={100}
                min={10}
                step={10}
                className={cn('md:w-[50%]')}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Adjust the slider to set the visualization speed (10-100).
              </p>
            </div>

            {/* Submit Button */}
            <Button variant="secondary" className="bg-black text-white mt-6 w-full">Start Visualization</Button>
          </form>
        </CardContent>
        <CardFooter>          
          <p className="text-muted-foreground text-sm mt-24">
            Tip: Use the controls above to configure the sorting process and click "Start Visualization" to begin!
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Visualizer
