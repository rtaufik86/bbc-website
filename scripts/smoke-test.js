const https = require('https');
const http = require('http');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

console.log(`Running smoke tests against ${BASE_URL}...`);

function checkEndpoint(path) {
    return new Promise((resolve, reject) => {
        const url = `${BASE_URL}${path}`;
        const client = url.startsWith('https') ? https : http;

        client.get(url, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                console.log(`✅ ${path} - OK (${res.statusCode})`);
                resolve(true);
            } else {
                console.error(`❌ ${path} - FAILED (${res.statusCode})`);
                resolve(false);
            }
        }).on('error', (e) => {
            console.error(`❌ ${path} - ERROR: ${e.message}`);
            resolve(false);
        });
    });
}

async function runTests() {
    const endpoints = [
        '/',
        '/api/health',
        '/login',
        '/signup'
    ];

    let allPassed = true;
    for (const endpoint of endpoints) {
        const passed = await checkEndpoint(endpoint);
        if (!passed) allPassed = false;
    }

    if (allPassed) {
        console.log('\nAll smoke tests PASSED! 🚀');
        process.exit(0);
    } else {
        console.error('\nSome smoke tests FAILED. 💥');
        process.exit(1);
    }
}

runTests();
