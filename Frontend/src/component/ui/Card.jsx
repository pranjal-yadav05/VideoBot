import * as React from "react"

export const Card = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={["rounded-lg border bg-card text-card-foreground shadow-sm", className].join(" ")}
      {...props}
    />
  )
})
Card.displayName = "Card"

