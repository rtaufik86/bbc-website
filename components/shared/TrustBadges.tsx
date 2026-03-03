import { CheckCircle2 } from 'lucide-react'

const defaultBadges = [
    "Sejak 2007",
    "Okupansi 85%",
    "72 Unit Tersedia",
    "Gedung Milik Sendiri",
    "Lokasi Strategis",
    "All-Inclusive Package"
]

interface TrustBadgesProps {
    badges?: string[]
    variant?: 'default' | 'compact'
}

export default function TrustBadges({
    badges = defaultBadges,
    variant = 'default'
}: TrustBadgesProps) {
    const isCompact = variant === 'compact'

    return (
        <div className={`flex flex-wrap gap-3 ${isCompact ? 'justify-start' : 'justify-center'}`}>
            {badges.map((badge, index) => (
                <div
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-bbc-gold-50 border border-bbc-gold-200 rounded-full text-bbc-gold-700 font-medium text-sm"
                >
                    <CheckCircle2 className="w-4 h-4" />
                    {badge}
                </div>
            ))}
        </div>
    )
}
