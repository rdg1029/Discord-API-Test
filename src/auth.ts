const p = new URLSearchParams(window.location.search);
console.log(`code: ${p.get('code')}`);