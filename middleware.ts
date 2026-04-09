import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: any) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: any) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    // SEO Redirects & 410 Gone Handling (MASTER CLEANUP MAP)
    const url = request.nextUrl
    const path = url.pathname
    const searchParams = url.searchParams
    const canonicalBase = 'https://www.bintarobusinesscentre.com'

    // 1. Parameter & Extension Cleanup (410 GONE)
    const hasJunkParams = searchParams.has('amp') || 
                         searchParams.has('replytocom') || 
                         Array.from(searchParams.keys()).some(k => k.startsWith('utm_'))
    
    if (hasJunkParams || path.endsWith('.html')) {
        return new NextResponse(null, { status: 410, statusText: 'Gone' })
    }

    // 2. Global 410 Patterns (Legacy Footprints)
    const blockedPrefixes = [
        '/wp-',          // Core WordPress
        '/xmlrpc.php',   // Pingback junk
        '/feed',         // Legacy RSS
        '/thrive_',      // Builder junk
        '/lp/',          // Legacy landing pages (non-redirected)
        '/nggallery',    // NextGEN Gallery
        '/gallery/',     // Gallery subpaths
        '/client',       // Client portals
        '/author',       // Author archives
        '/category',     // Category archives
        '/tag',          // Tag archives
        '/page',         // Legacy pagination
        '/event',        // Junk events
        '/available-room',
        '/pengertian-perseroan-terbatas',
        '/tips-pintar-memilih-sewa-kantor'
    ]

    // Check for exact matches or prefix matches
    if (blockedPrefixes.some(p => path === p || path.startsWith(p + '/'))) {
        // Preserved exceptions for business-critical landing pages
        const isPreserved = path === '/lp/jasa-sewa-kantor' || path === '/lp/jasa-sewa-kantor/'
        
        if (!isPreserved) {
            return new NextResponse(null, { status: 410, statusText: 'Gone' })
        }
    }

    // Refresh session if expired
    await supabase.auth.getSession()

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (public folder)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
