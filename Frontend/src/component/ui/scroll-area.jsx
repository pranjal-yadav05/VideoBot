import * as React from "react"

export const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={["overflow-auto", className].join(" ")} {...props}>
      {children}
    </div>
  )
})
ScrollArea.displayName = "ScrollArea"

