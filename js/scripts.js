/* Fixed pager + drawer + reveals + mobile banner */
(function(){
  const deck = document.getElementById('deck');
  const sections = Array.from(deck.querySelectorAll('.slide'));
  const drawer = document.getElementById('sectionDrawer');
  const drawerToggle = document.getElementById('drawerToggle');
  const drawerClose = document.getElementById('drawerClose');

  /* Reveal on enter */
  const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  },{root: deck, threshold: 0.15}) : null;

  document.querySelectorAll('.slide-inner > *').forEach(el=>{
    el.classList.add('reveal');
    if(io) io.observe(el);
    else el.classList.add('is-visible');
  });

  /* Background pairing */
  const bgPairs = [
    [1, 2],
    [1, 2],
    [3, 4],
    [4, 3],
  ];
  for (let i = 0; i < sections.length; i += 2) {
    const pair = (i === 0)
      ? [1, 2]
      : bgPairs[Math.floor(Math.random() * bgPairs.length)];
    sections[i].dataset.bg = pair[0];
    if (sections[i + 1]) sections[i + 1].dataset.bg = pair[1];
  }

  /* Pager (fixed) */
  const pager = document.getElementById('pager');
  const prevBtn = pager.querySelector('[data-prev]');
  const nextBtn = pager.querySelector('[data-next]');

  const goToIndex = (idx)=>{
    const clamped = Math.max(0, Math.min(idx, sections.length-1));
    sections[clamped].scrollIntoView({behavior:'smooth', block:'start'});
  };
  const visibleIndex = ()=>{
    let best = 0, bestDist = Infinity;
    const rect = deck.getBoundingClientRect();
    sections.forEach((s, i)=>{
      const r = s.getBoundingClientRect();
      const dist = Math.abs(r.top - rect.top);
      if(dist < bestDist){ best=i; bestDist=dist; }
    });
    return best;
  };

  prevBtn.addEventListener('click', ()=> goToIndex(visibleIndex()-1));
  nextBtn.addEventListener('click', ()=> goToIndex(visibleIndex()+1));

  /* Keyboard navigation */
  window.addEventListener('keydown', (e)=>{
    if (['ArrowDown','PageDown','ArrowRight'].includes(e.key)){
      e.preventDefault(); goToIndex(visibleIndex()+1);
    }
    if (['ArrowUp','PageUp','ArrowLeft'].includes(e.key)){
      e.preventDefault(); goToIndex(visibleIndex()-1);
    }
    if (e.key === 'Home'){ goToIndex(0); }
    if (e.key === 'End'){ goToIndex(sections.length-1); }
  });

  /* Drawer toggle */
  const setDrawer = (open)=>{
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', (!open).toString());
    drawerToggle.setAttribute('aria-expanded', open.toString());
  };
  drawerToggle.addEventListener('click', ()=> setDrawer(!drawer.classList.contains('open')));
  drawerClose.addEventListener('click', ()=> setDrawer(false));
  drawer.addEventListener('click', (e)=>{
    if(e.target.matches('a[href^="#"]')) setDrawer(false);
  });

  /* Mobile banner */
  const banner = document.getElementById('mobileBanner');
  const closeBtn = document.getElementById('mobileBannerClose');
  const seenKey = 'deck_mobile_tip_v1';
  if (window.innerWidth < 1024 && !sessionStorage.getItem(seenKey)){
    banner.classList.add('show');
  }
  closeBtn.addEventListener('click', ()=>{
    sessionStorage.setItem(seenKey, '1');
    banner.classList.remove('show');
  });

  /* Hash offset fix for sticky header */
  function offsetHash(){
    if(location.hash){
      const el = document.querySelector(location.hash);
      if(el){
        setTimeout(()=>{
          const y = el.getBoundingClientRect().top + window.scrollY - 64;
          window.scrollTo({top:y, behavior:'auto'});
        }, 0);
      }
    }
  }
  window.addEventListener('hashchange', offsetHash);
  offsetHash();
})();
