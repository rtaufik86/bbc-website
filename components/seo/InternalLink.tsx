import Link from 'next/link'
import { cn } from '@/lib/utils'

export type AnchorType = 'brand-service' | 'service-location' | 'generic' | 'descriptive'
export type LinkPosition = 'intro' | 'mid-content' | 'cta' | 'related'

interface InternalLinkProps {
    href: string
    children: React.ReactNode
    anchorType?: AnchorType
    position?: LinkPosition
    className?: string
    variant?: 'inline' | 'button'
}

/**
 * Internal Link component with anchor text tracking for SEO audit
 * Follows the 40/30/20/10 anchor text distribution strategy:
 * - Brand+Service: 40%
 * - Service+Location: 30%
 * - Generic: 20%
 * - Descriptive: 10%
 */
export default function InternalLink({
    href,
    children,
    anchorType = 'generic',
    position = 'mid-content',
    className,
    variant = 'inline'
}: InternalLinkProps) {

    const baseStyles = variant === 'button'
        ? 'inline-flex items-center gap-2 px-6 py-3 bg-bbc-blue-500 hover:bg-bbc-blue-600 text-white font-semibold rounded-lg transition-colors'
        : 'text-bbc-blue-600 hover:text-bbc-blue-700 underline decoration-2 underline-offset-4 font-medium transition-colors'

    return (
        <Link
            href={href}
            className={cn(baseStyles, className)}
            data-anchor-type={anchorType}
            data-position={position}
            data-internal-link="true"
        >
            {children}
        </Link>
    )
}
