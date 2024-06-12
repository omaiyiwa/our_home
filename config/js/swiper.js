document.addEventListener('DOMContentLoaded', function() {
  window.$docsify.plugins = [].concat(window.$docsify.plugins, function(hook, vm) {
    hook.doneEach(function() {
      // 第一个 Swiper
      const swiper1Element = document.querySelector('#swiper1');
      if (swiper1Element) {
        document.querySelectorAll('#swiper1 .swiper-slide img').forEach(function(img) {
          var caption = document.createElement('div');
          caption.className = 'image-caption';
          caption.innerText = img.alt;
          img.parentNode.appendChild(caption);
        });

        // 生成随机初始索引
        const slideCount1 = document.querySelectorAll('#swiper1 .swiper-slide').length;
        const initialSlide1 = Math.floor(Math.random() * slideCount1);

        var mySwiper1 = new Swiper('#swiper1', {
          initialSlide: initialSlide1, // 设置随机初始索引
          direction: 'horizontal',  // vertical  horizontal
          loop: true,
          effect: 'coverflow',
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
        });
      }

      // 第二个 Swiper
      const swiper2Element = document.querySelector('#swiper2');
      if (swiper2Element) {
        document.querySelectorAll('#swiper2 .swiper-slide img').forEach(function(img) {
          var caption = document.createElement('div');
          caption.className = 'image-caption';
          caption.innerText = img.alt;
          img.parentNode.appendChild(caption);
        });

        // 生成随机初始索引
        const slideCount2 = document.querySelectorAll('#swiper2 .swiper-slide').length;
        const initialSlide2 = Math.floor(Math.random() * slideCount2);

        var mySwiper2 = new Swiper('#swiper2', {
          initialSlide: initialSlide2, // 设置随机初始索引
          direction: 'horizontal',  // 横向
          loop: true,
          effect: 'coverflow',
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
        });
      }
    });
  });
});