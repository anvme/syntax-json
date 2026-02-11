function syntaxJSON(el) {
  const t = el.firstChild;
  const j = t.data;
  let i = 0, c, s; const n = j.length;
  const R = { s: [], n: [], k: [] };

  while (i < n) {
    c = j.charCodeAt(i);
    if (c <= 32) { while (++i < n && j.charCodeAt(i) <= 32); continue; }
    s = i;
    if (c === 34) {
      for (i++; i < n; i++) { c = j.charCodeAt(i); if (c === 92) i++; else if (c === 34) { i++; break; } }
      R.s.push(s, i); continue;
    }
    if (c >= 48 && c <= 57 || c === 45) {
      while (++i < n && ((c = j.charCodeAt(i)) >= 48 && c <= 57 || c === 46 || c === 43 || c === 45 || c === 101 || c === 69));
      R.n.push(s, i); continue;
    }
    if (c === 116 && j[i + 1] === 'r' && j[i + 2] === 'u' && j[i + 3] === 'e') { i += 4; R.k.push(s, i); continue; }
    if (c === 102 && j[i + 1] === 'a' && j[i + 2] === 'l' && j[i + 3] === 's' && j[i + 4] === 'e') { i += 5; R.k.push(s, i); continue; }
    if (c === 110 && j[i + 1] === 'u' && j[i + 2] === 'l' && j[i + 3] === 'l') { i += 4; R.k.push(s, i); continue; }
    i++;
  }
  for (let k in R) { let a = R[k], m; for (m = 0; m < a.length; m += 2) a[m >> 1] = new StaticRange({startContainer:t,startOffset:a[m],endContainer:t,endOffset:a[m+1]}); a.length = a.length >> 1; }
  return R;
}

if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', function () {
  let h = {s:[],n:[],k:[]}, els = document.querySelectorAll('pre code.json'), i, k, R;
  for (i = 0; i < els.length; i++) { R = syntaxJSON(els[i]); for (k in R) h[k] = h[k].concat(R[k]); }
  for (k in h) if (h[k].length) CSS.highlights.set('sj-' + k, new Highlight(...h[k]));
  const d = new CSSStyleSheet;
  d.replaceSync('::highlight(sj-s){color:#22863a}::highlight(sj-n){color:#005cc5}::highlight(sj-k){color:#d73a49}@media(prefers-color-scheme:dark){::highlight(sj-s){color:#a5d6ff}::highlight(sj-n){color:#79c0ff}::highlight(sj-k){color:#ff7b72}}[data-bs-theme=dark] ::highlight(sj-s),.dark ::highlight(sj-s){color:#a5d6ff}[data-bs-theme=dark] ::highlight(sj-n),.dark ::highlight(sj-n){color:#79c0ff}[data-bs-theme=dark] ::highlight(sj-k),.dark ::highlight(sj-k){color:#ff7b72}[data-bs-theme=light] ::highlight(sj-s),.light ::highlight(sj-s){color:#22863a}[data-bs-theme=light] ::highlight(sj-n),.light ::highlight(sj-n){color:#005cc5}[data-bs-theme=light] ::highlight(sj-k),.light ::highlight(sj-k){color:#d73a49}');
  document.adoptedStyleSheets.push(d);
});

export default syntaxJSON;
