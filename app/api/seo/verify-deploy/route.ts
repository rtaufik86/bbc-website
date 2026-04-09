import { NextResponse } from 'next/server';
import { auditData } from '@/app/web-audit/audit-data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const urlPath = searchParams.get('url');

    if (!urlPath) {
        return NextResponse.json({ error: 'URL path is required' }, { status: 400 });
    }

    // 1. GET LOCAL SOURCE (FROM AUDIT DB SNAPSHOT)
    const local = auditData.find(p => p.path === urlPath || p.path === urlPath + '/');
    if (!local) {
        return NextResponse.json({ error: 'Local audit data not found for this path' }, { status: 404 });
    }

    try {
        // 2. FETCH LIVE SOURCE
        const liveFullUrl = `https://www.bintarobusinesscentre.com${urlPath}`;
        const response = await fetch(liveFullUrl, {
            headers: { 'Cache-Control': 'no-cache' },
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch live URL: ${response.statusText}`);
        }

        const html = await response.text();

        // 3. NORMALIZATION & EXTRACTION (LITE VERSION FOR COMPARISON)
        const liveMetrics = extractMetricsFromHtml(html);

        // 4. COMPARISON LOGIC
        const diff: any = {};
        let isMatch = true;

        // H1 Match (Hard)
        if (local.h1Texts?.[0] !== liveMetrics.h1) {
            diff.h1 = { local: local.h1Texts?.[0] || 'N/A', live: liveMetrics.h1 || 'N/A' };
            isMatch = false;
        }

        // H2 Count Match (Hard)
        const localH2Count = local.h2Texts?.length || 0;
        if (localH2Count !== liveMetrics.h2Count) {
            diff.h2_count = { local: localH2Count, live: liveMetrics.h2Count };
            isMatch = false;
        }

        // FAQ Count Match (Hard)
        const localFaqCount = (local as any).faqs?.length || 0;
        if (localFaqCount !== liveMetrics.faqCount) {
            diff.faq_count = { local: localFaqCount, live: liveMetrics.faqCount };
            isMatch = false;
        }

        // Word Count Match (Soft: 50 words tolerance)
        const wordDiff = Math.abs(local.wordCount - liveMetrics.wordCount);
        if (wordDiff > 50) {
            diff.word_count = { local: local.wordCount, live: liveMetrics.wordCount };
            // Optional: word count imbalance only blocks if significant (>100) or user desires high precision
            if (wordDiff > 100) isMatch = false; 
        }

        return NextResponse.json({
            status: isMatch ? 'MATCH' : 'MISMATCH',
            url: urlPath,
            environment: {
                local: 'dev',
                live: 'production'
            },
            metricsSnapshot: {
                local: {
                    h1: local.h1Texts?.[0],
                    h2_count: localH2Count,
                    word_count: local.wordCount,
                    faq_count: localFaqCount
                },
                live: liveMetrics
            },
            diff,
            timestamp: new Date().toISOString()
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

function extractMetricsFromHtml(html: string) {
    // Basic extraction logic without heavy DOM parser to keep it light
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1 = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : '';

    const h2Count = (html.match(/<h2[^>]*>/gi) || []).length;
    
    // Simple word count: strip scripts, styles, and tags
    const cleanText = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    
    const wordCount = cleanText.split(' ').filter(w => w.length > 2).length;

    // FAQ Estimation (Look for schema or common class patterns)
    // For BBC, we check for JSON-LD FAQPage or specific FAQ containers
    const faqCount = (html.match(/["']@type["']:\s*["']Question["']/g) || []).length;

    return {
        h1,
        h2Count,
        wordCount,
        faqCount
    };
}
