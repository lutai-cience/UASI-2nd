($ => {
  
  let scrollBtnToTopBtn = document.querySelector(".scrollBtnToTop");
  let rootElement = document.documentElement;
  let height = document.getElementsByClassName('header')[0];
  let heightId = document.getElementById('intro');
  let heightClass = document.getElementsByClassName('intro')[0];

  if (height != null) { 
    height = height.offsetHeight;
  } else if (heightId != null) {
    height = heightId.offsetHeight;
  } else if (heightClass != null) {
    height = heightClass.offsetHeight;
  }

  function handleScroll() {
    // Do something on scroll
    if (rootElement.scrollTop > height) {
      // Show button
      scrollBtnToTopBtn.classList.add("showBtn");
    } else {
      // Hide button
      scrollBtnToTopBtn.classList.remove("showBtn");
    }
  }
  
  function scrollToTop() {
    // Scroll to top 
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  scrollBtnToTopBtn.addEventListener("click", scrollToTop);
  document.addEventListener("scroll", handleScroll);

})(jQuery);