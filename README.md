# syntax-json

Minimal JSON syntax highlighter. Single-pass, zero dependencies, <1 KB.

- **< 600 bytes** brotli, ~900 bytes minified
- **< 0.1 ms** parse time — single-pass character scan
- **Zero dependencies**
- **Zero DOM mutations** — uses CSS Highlight API
- **Dark mode** via `prefers-color-scheme`, Bootstrap, or CSS class
- **Auto-initializes** — just add the script tag

**[Live Demo](https://anvme.github.io/syntax-json/demo.html)**

## Install

```bash
npm install syntax-json
```

```js
import syntaxJSON from 'syntax-json';
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/syntax-json@1.0.1/dist/syntaxjson.min.js" crossorigin="anonymous"></script>
```

## Usage

```html
<pre><code class="json">{
  "name": "example",
  "value": 42,
  "active": true
}</code></pre>

<script src="https://cdn.jsdelivr.net/npm/syntax-json@1.0.1/dist/syntaxjson.min.js" crossorigin="anonymous"></script>
```

That's it. The script auto-highlights all `<pre><code class="json">` elements on page load.

## How It Works

1. Single-pass character scanner identifies strings, numbers, and keywords
2. Creates `StaticRange` objects for each token
3. Registers ranges with the CSS Highlight API (`CSS.highlights`)
4. Injects theme-aware styles via `CSSStyleSheet`

**No innerHTML. No DOM mutations. No reflows.**

## Dark Mode

Auto-adapts via `prefers-color-scheme`. Force theme with:

```html
<html data-bs-theme="dark">   <!-- Bootstrap 5.3 -->
<div class="dark">              <!-- CSS class -->
```

## API

### syntaxJSON(element)

Parse a `<code>` element and return highlight ranges.

```js
const ranges = syntaxJSON(document.querySelector('code.json'));
// { s: [StaticRange...], n: [StaticRange...], k: [StaticRange...] }
```

| Key | Token | Light | Dark |
|-----|-------|-------|------|
| `s` | Strings | `#22863a` | `#a5d6ff` |
| `n` | Numbers | `#005cc5` | `#79c0ff` |
| `k` | Keywords (`true`, `false`, `null`) | `#d73a49` | `#ff7b72` |

## License

MIT
