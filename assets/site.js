(() => {
  // ---- menu do celular
  const nav = document.querySelector('.tc-nav'), burger = document.querySelector('.tc-burger');
  if (nav && burger) {
    const abre = (v) => { nav.dataset.open = v ? 'true' : 'false'; burger.setAttribute('aria-expanded', String(v)); burger.setAttribute('aria-label', v ? 'Fechar menu' : 'Abrir menu'); };
    burger.addEventListener('click', () => abre(nav.dataset.open !== 'true'));
    nav.querySelectorAll('.tc-links a').forEach((a) => a.addEventListener('click', () => abre(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') abre(false); });
  }

  const $$ = (q) => Array.from(document.querySelectorAll(q));
  // ---- cartões do relatório: um aceso por vez
  let ativo = 0, t;
  function mostra(i) {
    ativo = i;
    $$('[data-glow]').forEach((el) => { el.style.opacity = Number(el.dataset.glow) === i ? '1' : '0'; });
    $$('[data-page]').forEach((el) => {
      const k = Number(el.dataset.page);
      el.style.opacity = k === i ? '1' : '0';
      el.style.transform = k === i ? 'none' : (k < i ? 'translateY(-12px) scale(0.98)' : 'translateY(18px) scale(0.98)');
    });
  }
  function agenda(ms) { clearTimeout(t); t = setTimeout(() => { mostra((ativo + 1) % 4); agenda(4000); }, ms); }
  $$('[data-pick]').forEach((el) => {
    const i = Number(el.dataset.pick);
    const escolhe = () => { mostra(i); agenda(9000); };
    el.addEventListener('click', escolhe);
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); escolhe(); } });
  });
  agenda(4000);

  // ---- o modelo é da organização: Indústria x Startup
  let ramo = 0, r;
  function aplicaRamo(i) {
    ramo = i; const st = i === 1;
    const pill = document.querySelector('[data-pill]'); if (pill) pill.style.left = st ? '50%' : '4px';
    $$('[data-cramo]').forEach((el) => { el.style.color = Number(el.dataset.cramo) === i ? '#FFFFFF' : '#B5C4CF'; });
    $$('[data-badge]').forEach((el) => {
      el.textContent = st ? 'Favorece' : 'Atenção';
      el.style.background = st ? 'rgba(20,158,181,0.22)' : 'rgba(234,138,74,0.18)';
      el.style.color = st ? '#7FD3E1' : '#F5B68A';
    });
    const faixas = st ? ['6%', '8%', '28%'] : ['64%', '62%', '66%'];
    $$('[data-band]').forEach((el) => { el.style.left = faixas[Number(el.dataset.band)]; });
  }
  function agendaRamo(ms) { clearTimeout(r); r = setTimeout(() => { aplicaRamo(1 - ramo); agendaRamo(5000); }, ms); }
  $$('[data-ramo]').forEach((el) => el.addEventListener('click', () => { aplicaRamo(Number(el.dataset.ramo)); agendaRamo(10000); }));
  agendaRamo(5000);
})();
