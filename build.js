const esbuild = require('esbuild');
const fs = require('node:fs');
const path = require('node:path');

const dist = path.join(__dirname, 'dist');
if (!fs.existsSync(dist)) fs.mkdirSync(dist);

// Read source, strip ESM export for IIFE build
const src = fs.readFileSync('src/index.js', 'utf8')
  .replace(/\nexport default syntaxJSON;\n?$/, '');

// IIFE (for CDN / <script> tag) — zero wrapper overhead
const iife = esbuild.transformSync(
  '(function(){' + src + 'return syntaxJSON})()',
  { minify: true, target: ['es2015'] }
);
fs.writeFileSync(path.join(dist, 'syntaxjson.min.js'), 'var syntaxJSON=' + iife.code);

// ESM
esbuild.buildSync({
  entryPoints: ['src/index.js'],
  outfile: 'dist/syntaxjson.esm.js',
  bundle: true,
  minify: true,
  format: 'esm',
  target: ['es2015'],
});

// Report sizes
['syntaxjson.min.js', 'syntaxjson.esm.js'].forEach(f => {
  const size = fs.statSync(path.join(dist, f)).size;
  console.log(`  ${f}  ${size} bytes`);
});
