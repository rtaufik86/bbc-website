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
    const normalizedPath = path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path

    if (url.search && path !== '/') {
        return NextResponse.redirect(new URL(path, request.url), 301)
    }

    // ALLOWLIST: guard against false positives for core canonical routes.
    const allowList: RegExp[] = [
        /^\/$/,
        /^\/sewa-kantor(?:\/|$)/,
        /^\/virtual-office(?:\/|$)/,
        /^\/legal(?:\/|$)/,
        /^\/ruang-meeting(?:\/|$)/,
    ]

    if (!allowList.some(r => r.test(normalizedPath))) {
        // KILL ENGINE (P0): legacy WP + archives + landing + feeds + duplicates.
        const isBlogKillActive =
            process.env.SEO_KILL_BLOG === '1' ||
            process.env.SEO_KILL_BLOG === 'true' ||
            process.env.SEO_KILL_BLOG === 'TRUE'

        const kill = () =>
            new NextResponse('Gone', {
                status: 410,
                statusText: 'Gone',
                headers: {
                    'X-Robots-Tag': 'noindex',
                },
            })

        const killPatterns: RegExp[] = [
            // GROUP A — CORE WORDPRESS SYSTEM
            /^\/wp-admin(?:\/|$)/,
            /^\/wp-login\.php(?:\/|$)/,
            /^\/wp-json(?:\/|$)/,
            /^\/xmlrpc\.php(?:\/|$)/,
            /^\/wp-content(?:\/|$)/,
            /^\/wp-includes(?:\/|$)/,

            // GROUP B — TAXONOMY & ARCHIVE
            /^\/category(?:\/|$)/,
            /^\/tag(?:\/|$)/,
            /^\/author(?:\/|$)/,
            /^\/date(?:\/|$)/,
            /^\/page(?:\/|$)/,
            /^\/attachment(?:\/|$)/,

            // GROUP C — LEGACY LANDING
            /^\/lp(?:\/|$)/,
            /^\/promo(?:\/|$)/,
            /^\/campaign(?:\/|$)/,
            /^\/landing(?:\/|$)/,
            /^\/amp(?:\/|$)/,
            /^\/bookingroom(?:\/|$)/,

            // GROUP D — FEED / RSS
            /(?:^|\/)comments\/feed(?:\/|$)/,
            /(?:^|\/)feed(?:\/|$)/,
        ]

        // GROUP E — DUPLICATE PATH (selective 301 if mapped, else 410)
        const canonicalRedirects: Record<string, string> = {
            '/home': '/',
            '/home/': '/',
            '/index.php': '/',
            '/index.php/': '/',
        }

        if (normalizedPath in canonicalRedirects) {
            return NextResponse.redirect(
                new URL(canonicalRedirects[normalizedPath], request.url),
                301
            )
        }

        if (
            killPatterns.some(r => r.test(normalizedPath)) ||
            /^\/index\.php(?:\/|$)/.test(normalizedPath) ||
            /^\/home(?:\/|$)/.test(normalizedPath) ||
            (isBlogKillActive && /^\/blog(?:\/|$)/.test(normalizedPath)) ||
            normalizedPath.endsWith('.html')
        ) {
            return kill()
        }
    }

    if (normalizedPath !== path) {
        return NextResponse.redirect(new URL(normalizedPath, request.url), 301)
    }

    // FIX: permanent redirect normalization (301, not default 308).
    if (normalizedPath === '/meeting-room') {
        return NextResponse.redirect(new URL('/ruang-meeting', request.url), 301)
    }

    // Refresh session if expired
    await supabase.auth.getSession()

    return response
}

export const config = {
    matcher: ['/((?!_next|favicon.ico).*)'],
}
