import { Building2, Users, Award, MapPin } from 'lucide-react'

interface Stat {
    icon: React.ReactNode
    value: string
    label: string
}

const defaultStats: Stat[] = [
    {
        icon: <Building2 className="w-8 h-8" />,
        value: "72",
        label: "Unit Kantor"
    },
    {
        icon: <Users className="w-8 h-8" />,
        value: "85%",
        label: "Tingkat Okupansi"
    },
    {
        icon: <Award className="w-8 h-8" />,
        value: "2007",
        label: "Berdiri Sejak"
    },
    {
        icon: <MapPin className="w-8 h-8" />,
        value: "Sektor 7",
        label: "Lokasi Strategis"
    }
]

interface StatsProps {
    stats?: Stat[]
    variant?: 'default' | 'compact'
}

export default function Stats({
    stats = defaultStats,
    variant = 'default'
}: StatsProps) {
    const isCompact = variant === 'compact'

    return (
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${isCompact ? 'md:gap-4' : 'md:gap-8'}`}>
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`text-center ${isCompact ? 'p-4' : 'p-6'} bg-white rounded-xl border border-slate-100 hover:border-bbc-gold-200 hover:shadow-md transition-all`}
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-bbc-gold-50 rounded-full text-bbc-gold-600 mb-4">
                        {stat.icon}
                    </div>
                    <div className={`${isCompact ? 'text-3xl' : 'text-4xl'} font-bold text-slate-900 mb-2`}>
                        {stat.value}
                    </div>
                    <div className="text-slate-600 text-sm font-medium">
                        {stat.label}
                    </div>
                </div>
            ))}
        </div>
    )
}
