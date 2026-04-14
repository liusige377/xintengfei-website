// 四川鑫腾飞气体 · 全局脚本
(function(){
  // 导航
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => navbar.classList.toggle('on', window.scrollY > 60));
  
  // 移动端菜单
  const hamburger = document.getElementById('hamburger');
  if(hamburger) hamburger.addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('open');
  });

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if(t) t.scrollIntoView({ behavior:'smooth', block:'start' });
      const menu = document.getElementById('navMenu');
      if(menu) menu.classList.remove('open');
    });
  });

  // 淡入动画
  const io = new IntersectionObserver((entries) => {
    entries.forEach((el, i) => {
      if(el.isIntersecting){
        setTimeout(() => el.target.classList.add('visible'), i * 80);
        io.unobserve(el.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));
  document.querySelectorAll('.fade-left').forEach(el => io.observe(el));
  document.querySelectorAll('.fade-right').forEach(el => io.observe(el));
  
  // 数字滚动动画
  function animateNum(el){
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if(current >= target) clearInterval(timer);
    }, 20);
  }
  
  const numObserver = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if(el.isIntersecting){
        animateNum(el.target);
        numObserver.unobserve(el.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.stat-n').forEach(el => numObserver.observe(el));

  // 全屏图片懒加载
  document.querySelectorAll('img[data-src]').forEach(img => {
    const lazy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          lazy.unobserve(img);
        }
      });
    });
    lazy.observe(img);
  });

  // 返回顶部
  const backBtn = document.getElementById('backTop');
  if(backBtn){
    window.addEventListener('scroll', () => backBtn.style.opacity = window.scrollY > 500 ? 1 : 0);
    backBtn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  }
})();