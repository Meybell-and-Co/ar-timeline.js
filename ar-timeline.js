document.addEventListener("DOMContentLoaded", () => {
  const scroller = document.querySelector(".timeline-content");
  const items = document.querySelectorAll(".timeline-item");
  const leftArrow = document.querySelector(".timeline-arrow-left");
  const rightArrow = document.querySelector(".timeline-arrow-right");
  const barFill = document.querySelector(".timeline-progress-bar-fill");
  const dotsContainer = document.querySelector(".timeline-dots");

  // Generate dots
  dotsContainer.innerHTML = "";
  items.forEach(() => {
    const dot = document.createElement("div");
    dot.className = "timeline-dot";
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll(".timeline-dot");

  let currentIndex = 0;

  function updateNav(idx) {
    dots.forEach((dot, i) => dot.classList.toggle("active", i === idx));
    if (barFill) barFill.style.width = ((idx) / (items.length - 1)) * 100 + "%";
    leftArrow.setAttribute("aria-disabled", idx === 0 ? "true" : "false");
    rightArrow.setAttribute("aria-disabled", idx === items.length - 1 ? "true" : "false");
    currentIndex = idx;
  }

  function scrollToItem(idx, smooth = true) {
    const item = items[idx];
    if (!item) return;
    const scroller = document.querySelector('.timeline-content');
    const scrollerRect = scroller.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
  // Calculate scroll so item is centered
  const scrollLeft =
    item.offsetLeft
    - scroller.offsetLeft
    - (scrollerRect.width / 2)
    + (itemRect.width / 2);

  scroller.scrollTo({
    left: scrollLeft,
    behavior: smooth ? "smooth" : "auto",
  });
  updateNav(idx);
}
  function updateGradientEdges() {
  const scroller = document.querySelector('.timeline-content');
  scroller.classList.toggle('at-start', scroller.scrollLeft === 0);
  scroller.classList.toggle(
    'at-end',
    Math.ceil(scroller.scrollLeft + scroller.offsetWidth) >= scroller.scrollWidth
  );
}
scroller.addEventListener('scroll', updateGradientEdges);
updateGradientEdges();
// Only create dots for non-buffer cards
  const realItems = Array.from(items).filter(item => !item.classList.contains('timeline-buffer'));
realItems.forEach(() => {
  const dot = document.createElement('div');
  dot.className = 'timeline-dot';
  dotsContainer.appendChild(dot);
});
  // Dot click
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => scrollToItem(idx));
  });

  // Arrows
  leftArrow.addEventListener("click", () => {
    if (currentIndex > 0) scrollToItem(currentIndex - 1);
    updateNav(currentIndex - 1);
  });
  rightArrow.addEventListener("click", () => {
    if (currentIndex < items.length - 1) scrollToItem(currentIndex + 1);
updateNav(currentIndex + 1);
  });

  // Arrow bop animation
  document.querySelectorAll(".timeline-arrow").forEach(arrow => {
    arrow.addEventListener("click", function() {
      arrow.classList.remove("bopping");
      void arrow.offsetWidth;
      arrow.classList.add("bopping");
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") rightArrow.click();
    if (e.key === "ArrowLeft") leftArrow.click();
  });

  // Sync nav on scroll
  scroller.addEventListener("scroll", function () {
    let idx = 0;
    items.forEach((item, i) => {
      if (scroller.scrollLeft >= item.offsetLeft - scroller.offsetLeft - 10) {
        idx = i;
      }
    });
    updateNav(idx);
  });

  // Dynamic arrow sizing (25% of card height)
  function setArrowHeight() {
    var card = document.querySelector(".timeline-item");
    var arrows = document.querySelectorAll(".timeline-arrow");
    if(card) {
      var cardHeight = card.offsetHeight;
      var arrowHeight = Math.round(cardHeight * 0.25);
      arrows.forEach(function(arrow) {
        arrow.style.height = arrowHeight + "px";
        arrow.style.width = arrowHeight + "px";
      });
    }
  }
  window.addEventListener("resize", setArrowHeight);
  setArrowHeight();

  // Initialize state
  updateNav(0);
});
