import { VariantProps, cva } from "class-variance-authority"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export const myBtnsStyles = cva(["hover:bg-secondary-hover", "transition-colors "], {
    variants: {
        variant: {
            default: ["bg-secondary", "hover:bg-secondary-hover"],
            ghost: ["hover:bg-gray-100"],
            dark: ['bg-secondary-dark', 'hover:bg-secondary-dark-hover', "text-secondary"]
        },
        size: {
            default: ["rounded", "p-2"],
            icon: ["rounded-full", "w-10", "h-10", "flex", "items-center", "justify-center"]
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
})

type buttonProps = VariantProps<typeof myBtnsStyles> & ComponentProps<'button'>

export default function Button({ variant, size, className, ...props }: buttonProps) {
    return <button {...props} className={twMerge(myBtnsStyles({ variant, size }), className)} />
}
