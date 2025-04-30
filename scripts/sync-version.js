import fs from 'fs';
import path from 'path';

const root = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'));
const manifestPath = path.join(root, 'manifest.json');

let manifest = fs.readFileSync(manifestPath, 'utf-8');
manifest = manifest.replace(/"version":\s*"[^"]+"/, `"version": "${pkg.version}"`);
fs.writeFileSync(manifestPath, manifest);
console.log(`✅ Synced manifest version to ${pkg.version}`);