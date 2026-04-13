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

    // FIX: permanent redirect normalization (301, not default 308).
    if (path === '/meeting-room') {
        return NextResponse.redirect(new URL('/ruang-meeting', request.url), 301)
    }

    // ALLOWLIST: guard against false positives for core canonical routes.
    const allowList: RegExp[] = [
        /^\/$/,
        /^\/sewa-kantor(?:\/|$)/,
        /^\/virtual-office(?:\/|$)/,
        /^\/legal(?:\/|$)/,
        /^\/ruang-meeting(?:\/|$)/,
    ]

    if (!allowList.some(r => r.test(path))) {
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

            // GROUP D — FEED / RSS
            /(?:^|\/)comments\/feed\/?$/,
            /(?:^|\/)feed\/?$/,
        ]

        // GROUP E — DUPLICATE PATH (selective 301 if mapped, else 410)
        const canonicalRedirects: Record<string, string> = {
            '/home': '/',
            '/home/': '/',
            '/index.php': '/',
            '/index.php/': '/',
        }

        if (path in canonicalRedirects) {
            return NextResponse.redirect(new URL(canonicalRedirects[path], request.url), 301)
        }

        if (
            killPatterns.some(r => r.test(path)) ||
            /^\/index\.php(?:\/|$)/.test(path) ||
            /^\/home(?:\/|$)/.test(path) ||
            (isBlogKillActive && /^\/blog(?:\/|$)/.test(path)) ||
            path.endsWith('.html')
        ) {
            return kill()
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
        '/wp-json/:path*',
        '/wp-content/:path*',
        '/wp-includes/:path*',
        '/wp-include/:path*',
        '/attachment/:path*',
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
