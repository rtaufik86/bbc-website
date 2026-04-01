const fs = require('fs');
const path = require('path');

const appDir = 'c:/Users/Worknew/Documents/Saas/BBC/app';
const componentsDir = 'c:/Users/Worknew/Documents/Saas/BBC/components';

// 1. Get all pages
function getPages(dir, base = '') {
    let pages = [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const relPath = path.join(base, file);
        if (fs.statSync(fullPath).isDirectory()) {
            pages = pages.concat(getPages(fullPath, relPath));
        } else if (file === 'page.tsx') {
            // Convert directory structure to route
            let route = '/' + base.replace(/\\/g, '/');
            if (route.endsWith('/')) route = route.slice(0, -1);
            if (route === '') route = '/';

            // Handle dynamic routes [id] -> wildcard for comparison
            const standardizedRoute = route.replace(/\[.*?\]/g, '*');
            pages.push({ route, standardizedRoute, filePath: fullPath });
        }
    }
    return pages;
}

const allPages = getPages(appDir);
const pageRoutes = allPages.map(p => p.route);
const standardizedPageRoutes = allPages.map(p => p.standardizedRoute);

// 2. Find all links
const links = new Set();
function findLinks(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            findLinks(fullPath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf8');

            // Match href="/..." or href={"/..."
            const hrefMatches = content.match(/href=["'](\/[^"']*)["']/g);
            if (hrefMatches) {
                hrefMatches.forEach(m => {
                    const link = m.match(/href=["'](\/[^"']*)["']/)[1];
                    links.add(link.split('#')[0].split('?')[0]); // Remove anchor and query
                });
            }

            const hrefBraceMatches = content.match(/href=\{["'](\/[^"']*)["']\}/g);
            if (hrefBraceMatches) {
                hrefBraceMatches.forEach(m => {
                    const link = m.match(/href=\{["'](\/[^"']*)["']\}/)[1];
                    links.add(link.split('#')[0].split('?')[0]);
                });
            }
        }
    }
}

findLinks(appDir);
findLinks(componentsDir);

// 3. Compare
const orphans = [];
const linkedRoutes = Array.from(links);

allPages.forEach(p => {
    // Check if the route is linked
    const isLinked = linkedRoutes.some(link => {
        if (link === p.route) return true;
        // Handle trailing slash consistency
        if (link === p.route + '/') return true;
        if (p.route === link + '/') return true;

        // Handle dynamic routes: if link is /admin/leads/123 and route is /admin/leads/[id]
        // We do a simple regex check
        const regex = new RegExp('^' + p.standardizedRoute.replace(/\*/g, '.*') + '$');
        return regex.test(link);
    });

    if (!isLinked && p.route !== '/') {
        orphans.push(p.route);
    }
});

console.log('--- ALL PAGES ---');
console.log(pageRoutes.join('\n'));
console.log('\n--- ORPHAN PAGES ---');
console.log(orphans.join('\n'));
