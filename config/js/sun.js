function setActiveLink() {
    const activeLink = document.querySelector('.sidebar-nav li a[href="' + window.location.hash + '"]');
    if (activeLink) {
      // 移除所有激活状态
      document.querySelectorAll('.sidebar-nav li a').forEach(function(el) {
        el.classList.remove('active');
      });
    
      // 给当前链接添加激活状态
      activeLink.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
// 监听侧边栏点击事件
document.querySelector('.sidebar-nav').addEventListener('click', function(e) {
  const target = e.target;

  if (target.tagName.toLowerCase() === 'a') {
    // 移除所有激活状态
    document.querySelectorAll('.sidebar-nav li a').forEach(function(el) {
      el.classList.remove('active');
    });

    // 给当前点击的项添加激活状态
    target.classList.add('active');
  }
});

// 初次加载时激活正确项
setTimeout(setActiveLink, 0);
});

// 监听路由变化事件
window.addEventListener('hashchange', function() {
setTimeout(setActiveLink, 0);
});

// 在 Docsify 渲染完成后设置激活状态
window.$docsify.plugins = [].concat(function(hook, vm) {
hook.doneEach(function() {
  setActiveLink();
});
}, window.$docsify.plugins || []);