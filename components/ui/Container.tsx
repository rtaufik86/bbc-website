import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-6xl',
    full: 'max-w-7xl'
}

export default function Container({
    children,
    className,
    size = 'xl',
    ...props
}: ContainerProps) {
    return (
        <div
            className={cn(
                "container mx-auto px-4",
                sizeClasses[size],
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}
