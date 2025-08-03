document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.querySelector(".timeline-content");
  const items = document.querySelectorAll(".timeline-item");
  const leftArrow = document.querySelector(".timeline-arrow-left");
  const rightArrow = document.querySelector(".timeline-arrow-right");
  const barFill = document.querySelector(".timeline-progress-bar-fill");
  const dotsContainer = document.querySelector(".timeline-dots");
  const scroller = document.querySelector(".timeline-scroller');

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
    // Highlight dots
    dots.forEach((dot, i) => dot.classList.toggle("active", i === idx));
    // Fill progress bar
    if (barFill) barFill.style.width = ((idx) / (items.length - 1)) * 100 + "%";
    // Arrow enable/disable
    leftArrow.setAttribute("aria-disabled", idx === 0 ? "true" : "false");
    rightArrow.setAttribute("aria-disabled", idx === items.length - 1 ? "true" : "false");
    currentIndex = idx;
  }

  function scrollToItem(idx, smooth = true) {
    const item = items[idx];
    if (!item) return;
   const scrollerRect = scroller.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  const scrollLeft =
    item.offsetLeft -
    scroller.offsetLeft -
    scrollerRect.width / 2 +
    itemRect.width / 2;
  scroller.scrollTo({
    left: scrollLeft,
    behavior: smooth ? "smooth" : "auto",
  });
  updateNav(idx);
}
  }

  // Dot click
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => scrollToItem(idx));
  });

  // Arrows
  leftArrow.addEventListener("click", () => {
    if (currentIndex > 0) scrollToItem(currentIndex - 1);
  });
  rightArrow.addEventListener("click", () => {
    if (currentIndex < items.length - 1) scrollToItem(currentIndex + 1);
  });

  // Arrow bop animation
  document.querySelectorAll(".timeline-arrow").forEach(arrow => {
    arrow.addEventListener("click", function() {
      arrow.classList.remove("bopping");
      void arrow.offsetWidth; // Force reflow
      arrow.classList.add("bopping");
    });
  });

  // Keyboard arrow navigation
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") rightArrow.click();
    if (e.key === "ArrowLeft") leftArrow.click();
  });

  // Sync nav on scroll
  timeline.addEventListener("scroll", function () {
    let idx = 0;
    items.forEach((item, i) => {
      if (timeline.scrollLeft >= item.offsetLeft - timeline.offsetLeft - 10) {
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
