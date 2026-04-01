require('ts-node').register({ transpileOnly: true, compilerOptions: { module: 'commonjs' } });
require('./scripts/generate-audit-data.ts');
