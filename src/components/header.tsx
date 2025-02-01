import * as React from 'react'
import { cn } from './../lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'

export default function Tabnavbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <a href="#" className="text-2xl font-bold">
            Sorting Visualizer
          </a>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Algorithms</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white">
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="hover:bg-gray-100 rounded-2xl bg-gray-50 from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
                          href="#"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Quick Sort
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            Time Complexity <strong>O(n.log(n))</strong>
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="#" title="Merge Sort">
                      <p className="text-muted-foreground text-sm leading-tight">
                        Time Complexity <strong>O(n.log(n))</strong>
                      </p>
                    </ListItem>
                    <ListItem href="#" title="Bubble Sort">
                      <p className="text-muted-foreground text-sm leading-tight">
                        Time Complexity{' '}
                        <strong>
                          O(n<sup>2</sup>)
                        </strong>
                      </p>
                    </ListItem>
                    <ListItem href="#" title="Selection Sort">
                      <p className="text-muted-foreground text-sm leading-tight">
                        Time Complexity{' '}
                        <strong>
                          O(n<sup>2</sup>)
                        </strong>
                      </p>
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="rounded-lg">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'hover:bg-gray-100 bg-gray-50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
