!(function () {
  const config = {
    size: 32,                  // 按钮大小
    offset: 15,                // 距离右下角距离
    color: '#00BFFF',          // 按钮颜色
    opacity: 1.0,              // 按钮透明度
    scrollDuration: 500,       // 滚动动画时间（毫秒）
    threshold: 100,            // 顶部/底部判定阈值
    hideDelay: 300             // 停止滚动多久后再处理
  };

  let scrollBtn = null;
  let scrollTimeout = null;
  let lastDirection = 'down';  // 初始方向

  function init() {
    if (scrollBtn) scrollBtn.remove();

    scrollBtn = document.createElement('div');
    scrollBtn.className = 'smart-scroll-btn';
    scrollBtn.innerHTML = '<div class="smart-scroll-arrow">↓</div>';
    scrollBtn.title = '跳到底部';

    Object.assign(scrollBtn.style, {
      position: 'fixed',
      width: `${config.size}px`,
      height: `${config.size}px`,
      right: `${config.offset}px`,
      bottom: `${config.offset}px`,
      borderRadius: '50%',
      background: config.color,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      lineHeight: `${config.size}px`,
      cursor: 'pointer',
      opacity: config.opacity,
      zIndex: '9999',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      transition: 'opacity 0.3s, transform 0.3s',
      pointerEvents: 'auto',
    });

    document.body.appendChild(scrollBtn);
    scrollBtn.addEventListener('click', handleClick);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateButtonState);
    updateButtonState();
  }

  function handleScroll() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateButtonState, config.hideDelay);
  }

  function updateButtonState() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.body.scrollHeight;
    const clientHeight = window.innerHeight;
    const atTop = scrollTop <= config.threshold;
    const atBottom = (scrollTop + clientHeight) >= (scrollHeight - config.threshold);

    const arrow = scrollBtn.querySelector('.smart-scroll-arrow');

    if (atTop) {
      arrow.innerHTML = '↓';
      scrollBtn.title = '跳到底部';
      lastDirection = 'down';
    } else if (atBottom) {
      arrow.innerHTML = '↑';
      scrollBtn.title = '回到顶部';
      lastDirection = 'up';
    }
    // 中间区域：保持 lastDirection，不切换方向
  }

  function handleClick() {
    const scrollHeight = document.body.scrollHeight;
    if (lastDirection === 'down') {
      smoothScrollTo(scrollHeight);
    } else {
      smoothScrollTo(0);
    }
  }

  function smoothScrollTo(target) {
    const start = window.pageYOffset;
    const distance = target - start;
    const duration = config.scrollDuration;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      window.scrollTo(0, start + distance * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        setTimeout(updateButtonState, 50);
      }
    }

    function easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    requestAnimationFrame(animation);
  }

  if (window.$docsify) {
    $docsify.plugins = [].concat(function (hook) {
      hook.doneEach(init);
    }, $docsify.plugins);
  } else {
    window.$docsify = {
      plugins: [].concat(function (hook) {
        hook.doneEach(init);
      })
    };
  }
})();
