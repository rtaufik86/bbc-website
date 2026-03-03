'use client'

import { PricingTier } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface PricingTableProps {
    tiers: PricingTier[]
    productSlug: string
}

export function PricingTable({ tiers, productSlug }: PricingTableProps) {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Pilihan Paket</h2>
                    <p className="text-slate-600">Pilih paket yang sesuai dengan kebutuhan bisnis Anda</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {tiers.map((tier, index) => {
                        const isPopular = index === 1 // Just an example, ideally this logic comes from DB
                        return (
                            <Card
                                key={tier.duration}
                                className={cn(
                                    "flex flex-col h-full",
                                    isPopular && "border-blue-500 shadow-xl relative scale-105 z-10"
                                )}
                            >
                                {isPopular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        Terpopuler
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="capitalize text-center text-lg">{tier.duration.replace('_', ' ')}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 text-center">
                                    <div className="text-3xl font-bold text-slate-900 mb-2">
                                        {formatCurrency(tier.price)}
                                    </div>
                                    <p className="text-sm text-slate-500 mb-6">
                                        {productSlug === 'meeting_room' ? 'per jam' : 'per bulan'}
                                    </p>

                                    {tier.features && tier.features.length > 0 && (
                                        <ul className="space-y-3 text-left">
                                            {tier.features.map((feature, i) => (
                                                <li key={i} className="flex items-start text-sm">
                                                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full" variant={isPopular ? 'default' : 'outline'}>
                                        <a href="#lead-form">Pilih Paket</a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
