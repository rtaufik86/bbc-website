const fs = require('fs');
const path = require('path');

const appDir = path.join(process.cwd(), 'app');
const componentsDir = path.join(process.cwd(), 'components');

const linkData = [];

function scanDir(dir, baseDir = '') {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            scanDir(fullPath, path.join(baseDir, file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            // Basic regex to find <Link href="/...">...</Link> or <a href="/...">...</a>
            // Note: This is a simplified regex and won't catch everything (e.g. dynamic variables)
            // but it's a good start for a report.
            const linkRegex = /<(Link|a)\s+[^>]*href=["'](\/[^"']+)["'][^>]*>([\s\S]*?)<\/\1>/gi;
            let match;
            while ((match = linkRegex.exec(content)) !== null) {
                const type = match[1];
                const href = match[2];
                let anchor = match[3].replace(/<[^>]*>?/gm, '').trim(); // Strip HTML tags within anchor
                
                // If anchor is empty (maybe an image), try to find aria-label or just note it
                if (!anchor) {
                    const labelMatch = match[0].match(/aria-label=["']([^"']+)["']/i);
                    anchor = labelMatch ? `[Aria: ${labelMatch[1]}]` : '[Image/Icon/Empty]';
                }

                linkData.push({
                    source: path.relative(process.cwd(), fullPath).replace(/\\/g, '/'),
                    destination: href,
                    anchor: anchor.substring(0, 100), // Trim long anchors
                });
            }
        }
    }
}

console.log('Scanning directories...');
scanDir(appDir);
scanDir(componentsDir);

fs.writeFileSync('links_inventory.json', JSON.stringify(linkData, null, 2));
console.log(`Extraction complete. Found ${linkData.length} links. Saved to links_inventory.json`);
