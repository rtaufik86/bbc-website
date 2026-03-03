export function getMetaParams() {
    if (typeof document === 'undefined') return { fbp: undefined, fbc: undefined }

    // Get _fbp cookie
    const fbp = document.cookie
        .split('; ')
        .find(row => row.startsWith('_fbp='))
        ?.split('=')[1]

    // Get _fbc cookie or construct from fbclid
    const urlParams = new URLSearchParams(window.location.search)
    const fbclid = urlParams.get('fbclid')

    let fbc = document.cookie
        .split('; ')
        .find(row => row.startsWith('_fbc='))
        ?.split('=')[1]

    if (!fbc && fbclid) {
        fbc = `fb.1.${Date.now()}.${fbclid}`
    }

    return { fbp, fbc }
}

export function getUTMParams() {
    if (typeof window === 'undefined') return {}

    const params = new URLSearchParams(window.location.search)
    return {
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
        utm_content: params.get('utm_content') || undefined,
        utm_term: params.get('utm_term') || undefined,
    }
}

export function trackLeadEvent(leadData: any) {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
            content_name: leadData.product_type,
            value: 0,
            currency: 'IDR',
        })
    }
}

// Add types for window.fbq
declare global {
    interface Window {
        fbq: any
    }
}
