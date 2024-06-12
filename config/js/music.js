window.$docsify.plugins = [].concat(window.$docsify.plugins, function(hook, vm) {
  hook.doneEach(function() {
    const lyrics = document.querySelectorAll('.lyric');
    const lyricsContainer = document.querySelector('.lyrics-container');
    let currentLine = 0;
    let intervalId;

    function showLyrics() {
      lyrics.forEach((lyric, index) => {
        lyric.classList.remove('active', 'previous', 'next');
        lyric.style.display = 'none';  // 默认隐藏
      });

      const totalLines = lyrics.length;
      let linesToShow = 3;

      // 处理不足三行的情况
      if (totalLines < 3) {
        linesToShow = totalLines;
      }
  
      // 上一行
      if (linesToShow > 1 && totalLines > 1) {
        const prevLine = (currentLine - 1 + totalLines) % totalLines;
        lyrics[prevLine].classList.add('previous');
        lyrics[prevLine].style.display = 'block';
      }
  
      // 当前行
      lyrics[currentLine].classList.add('active');
      lyrics[currentLine].style.display = 'block';
  
      // 下一行
      if (linesToShow > 1 && totalLines > 1) {
        const nextLine = (currentLine + 1) % totalLines;
        lyrics[nextLine].classList.add('next');
        lyrics[nextLine].style.display = 'block';
      }

      // 滚动歌词容器
      const activeLine = lyrics[currentLine];
      const containerCenter = lyricsContainer.offsetHeight / 2;
      const activeLineCenter = activeLine.offsetTop + activeLine.offsetHeight / 2;
      lyricsContainer.scrollTop = activeLineCenter - containerCenter;

      // 更新当前行
      currentLine = (currentLine + 1) % totalLines;

      // 当歌词数量不足时，停止定时器或调整逻辑
      if (totalLines < 3 && currentLine === 0) {
        clearInterval(intervalId);
      }
    }

    // 检查是否有歌词存在
    if (lyrics.length > 0) {
      showLyrics();
      intervalId = setInterval(showLyrics, 3000); // 每隔3秒更新一次
    }
  });
});