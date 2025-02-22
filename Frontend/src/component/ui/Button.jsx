import * as React from "react"

export const Button = React.forwardRef(({ className, children, variant, size, ...props }, ref) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
  }

  const classes = [baseStyles, variants[variant || "default"], sizes[size || "default"], className].join(" ")

  return (
    <button className={classes} ref={ref} {...props}>
      {children}
    </button>
  )
})
Button.displayName = "Button"

