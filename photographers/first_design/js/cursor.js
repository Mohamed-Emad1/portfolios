/* ==========================================================================
   Custom Cursor — desktop only, glow/follower with hover states
   ========================================================================== */
(function () {
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isTouch || prefersReducedMotion || window.innerWidth < 769) return;

  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  if (!cursor || !follower) return;

  document.body.classList.add("has-custom-cursor");

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let hasMoved = false;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

    if (!hasMoved) {
      hasMoved = true;
      followerX = mouseX;
      followerY = mouseY;
      cursor.classList.add("is-active");
      follower.classList.add("is-active");
    }
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateFollower);
  }
  requestAnimationFrame(animateFollower);

  const hoverTargets = "a, button, .filter-btn, [data-lightbox-trigger], input, textarea, select, .faq-question";
  const textTargets = "h1, h2, h3, p";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) {
      follower.classList.add("is-hover");
    } else if (e.target.closest(textTargets)) {
      follower.classList.add("is-text");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) {
      follower.classList.remove("is-hover");
    }
    if (e.target.closest(textTargets)) {
      follower.classList.remove("is-text");
    }
  });

  document.addEventListener("mouseleave", () => {
    if (!hasMoved) return;
    cursor.style.opacity = "0";
    follower.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    if (!hasMoved) return;
    cursor.style.opacity = "1";
    follower.style.opacity = "1";
  });
})();
