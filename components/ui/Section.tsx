import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode
    variant?: 'default' | 'dark' | 'light' | 'accent'
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const variantClasses = {
    default: 'bg-white',
    dark: 'bg-slate-900 text-white',
    light: 'bg-slate-50',
    accent: 'bg-bbc-blue-50'
}

const paddingClasses = {
    none: '',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
    xl: 'py-20 md:py-32'
}

export default function Section({
    children,
    className,
    variant = 'default',
    padding = 'lg',
    ...props
}: SectionProps) {
    return (
        <section
            className={cn(
                variantClasses[variant],
                paddingClasses[padding],
                className
            )}
            {...props}
        >
            {children}
        </section>
    )
}
