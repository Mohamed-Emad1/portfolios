// Pricing card hover lift + recommended plan emphasis
export function initPricingCards() {
  const cards = document.querySelectorAll(".pricing-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener("pointerenter", () => {
      cards.forEach((c) => c.classList.toggle("is-dimmed", c !== card && !c.classList.contains("pricing-card--featured")));
    });
    card.addEventListener("pointerleave", () => {
      cards.forEach((c) => c.classList.remove("is-dimmed"));
    });
  });
}
