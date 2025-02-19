import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/app/libs/utils";

const buttonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "whitespace-nowrap",
    "rounded-lg",
    "text-sm",
    "font-medium",
    "transition-colors",
    "focus-visible:outline-none",
    "focus-visible:ring-1",
    "focus-visible:ring-ring",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "gap-2",
  ],
  {
    variants: {
      variant: {
        default: ["bg-blue-normal", "text-white", "hover:bg-blue-normal-hover"],
        destructive: ["bg-destructive", "text-destructive-foreground", "hover:bg-destructive/90"],
        outline: [
          "border",
          "border-blue-normal",
          "bg-transparent",
          "hover:bg-accent",
          "hover:text-accent-foreground",
          "text-blue-normal",
        ],
        secondary: ["bg-blue-light", "text-blue-normal", "hover:bg-blue-light-hover", "dark:bg-[#8571F51F]", "dark:hover:bg-[#8571F51F]", "dark:hover:text-white"],
        ghost: ["hover:bg-accent", "hover:text-accent-foreground"],
        link: ["text-primary", "underline-offset-4", "hover:underline"],
      },
      size: {
        default: ["h-10", "px-4", "py-2"],
        sm: ["h-9", "rounded-md", "px-3", "text-sm"],
        lg: ["h-12", "rounded-lg", "px-8"],
        icon: ["h-10", "w-10"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
