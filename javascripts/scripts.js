(function () {
  //固定選單
  let siteNav = document.querySelector('.siteNav');
  let siteNavTop = siteNav.offsetTop;
  function navSsticky() {
    if (siteNavTop <= window.scrollY && window.innerWidth >= 768) {
      siteNav.classList.add('siteNav-sticky');
    } else {
      siteNav.classList.remove('siteNav-sticky');
    }
  }
  window.addEventListener("scroll", navSsticky);

  //選單scrolling
  const navTogglerIcon = document.querySelector('.fancy-menu');
  const navToggler = document.querySelector('.nav'); 
  const links = document.querySelectorAll('.siteNav a');
  function navScroll(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;
    scroll({
      top: offsetTop,
      behavior: "smooth"
    });
    navTogglerIcon.classList.remove('active');
    navToggler.classList.remove('active');
  }
  for (const link of links) {
    link.addEventListener("click", navScroll);
  }
  
  navTogglerIcon.addEventListener('click', function() {
    this.classList.toggle('active');
    navToggler.classList.toggle('active');
  })
  //選單底線
  let now = null;
  let navLink = document.querySelectorAll('.nav a');
  let underline = document.querySelector('.underline');
  underline.style.display = 'none';
  function enterHandler() {
    now = this;
    setPosition();
  };
  function setPosition() {
    if (!now) return;
    if (window.innerWidth <= 768) {
      underline.style.display = 'none';
      return
    };
    let rect = now.getBoundingClientRect();
    underline.style.display = '';
    underline.style.width = rect.width + 'px';
    underline.style.height = 4 + 'px';
    underline.style.left = now.offsetLeft + 'px';
  }
  navLink.forEach(element => {
    element.addEventListener("mouseenter", enterHandler);
  });
  window.addEventListener("resize", setPosition)

  //內文scroll動畫
  const targets = document.querySelectorAll(".grid figure");
  const isAnimated = "animated";
  const threshold = 0.5;

  function callback(entries, observer) {
    entries.forEach((entry) => {
      const elem = entry.target;
      if (entry.intersectionRatio >= threshold) {
        elem.classList.add(isAnimated);
        // observer.unobserve(elem);
      } else {
        elem.classList.remove(isAnimated);
      }
    });
  }

  const observer = new IntersectionObserver(callback, { threshold });
  for (const target of targets) {
    observer.observe(target);
  }

})()