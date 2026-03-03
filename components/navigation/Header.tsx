"use client"

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Sewa Kantor', href: '/sewa-kantor' },
    { name: 'Virtual Office', href: '/virtual-office' },
    { name: 'Legalitas Usaha', href: '/legal/pendirian-pt-jakarta-selatan' },
    { name: 'Kontak', href: '/kontak' },
]

// Mapping for active state check if needed, or just use pathname.

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    // Helper to check active state
    const isActive = (path: string) => {
        if (path === '/' && pathname !== '/') return false
        return pathname?.startsWith(path)
    }

    return (
        <header className="bg-primary sticky top-0 z-50 font-sans shadow-sm">
            {/* 
                User Spec:
                .header-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; }
                Logo height: 40px
                Header padding vertical: 16px
             */}
            <div className="max-w-full w-full mx-auto px-6 py-4 grid grid-cols-2 lg:grid-cols-3 items-center">

                {/* Left: Logo Section */}
                <div className="flex justify-start">
                    <Link href="/">
                        <img
                            src="/images/logo.png"
                            alt="Bintaro Business Centre"
                            className="h-10 w-auto brightness-0 invert"
                        />
                    </Link>
                </div>

                {/* Middle: Desktop Navigation */}
                <nav className="hidden lg:flex justify-center items-center lg:gap-4 xl:gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-[13px] xl:text-[16px] font-semibold hover:text-accent transition-colors whitespace-nowrap ${isActive(item.href)
                                ? 'text-accent border-b-2 border-accent pb-1'
                                : 'text-white'
                                }`}
                        >
                            {item.name}
                        </Link>
                    )
                    )}
                </nav>

                {/* Right: Desktop CTA & Mobile Toggle */}
                <div className="flex justify-end items-center gap-6">
                    <div className="hidden lg:flex items-center gap-6">


                        <Button
                            className="bg-accent hover:bg-accent/90 text-white font-bold rounded-none px-6 xl:px-8 h-[44px] uppercase tracking-widest text-[9px] xl:text-[10px]"
                            asChild
                        >
                            <Link href="#konsultasi">
                                Konsultasi Gratis
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="xl:hidden fixed inset-0 z-50 bg-primary/95 backdrop-blur-md overflow-y-auto">
                    <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
                        <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                            <img src="/images/logo.png" alt="BBC" className="h-10 w-auto brightness-0 invert" />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="mt-6 flow-root px-6">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-7 text-white hover:bg-white/10"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="py-6 space-y-3">

                                <Button
                                    className="w-full justify-center bg-accent hover:bg-accent/90 text-white font-bold rounded-none h-12 uppercase"
                                    asChild
                                >
                                    <Link href="#konsultasi" onClick={() => setMobileMenuOpen(false)}>
                                        Konsultasi Gratis
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

