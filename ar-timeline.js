document.addEventListener("DOMContentLoaded", () => {
  const dots = document.querySelectorAll(".timeline-dot");
  const timeline = document.querySelector(".timeline-content");
  const items = document.querySelectorAll(".timeline-item");
  const barFill = document.querySelector(".timeline-progress-bar-fill");

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const scrollAmount = items[index].offsetLeft - timeline.offsetLeft;
      timeline.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
      });

      // Update active class
      dots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");

      // Animate the progress fill bar
      const progress = (index / (dots.length - 1)) * 100;
      barFill.style.width = `${progress}%`;
    });
  });
});
