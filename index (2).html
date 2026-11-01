document.documentElement.classList.remove("no-js");

const menuButton = document.querySelector("[data-menu]");
const mobileNav = document.querySelector("[data-mobile-nav]");
if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuButton.textContent = open ? "×" : "☰";
  });
  mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => mobileNav.classList.remove("is-open")));
}

document.querySelectorAll("[data-page]").forEach((link) => {
  if (link.getAttribute("data-page") === document.body.dataset.page) link.classList.add("is-active");
});

const revealItems = document.querySelectorAll(".gh2-reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .1, rootMargin: "0px 0px -40px" });
  revealItems.forEach((item, index) => {
    item.style.transitionDelay = (index % 5) * 55 + "ms";
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-contact-form]").forEach((form) => {
  const trap = document.createElement("input");
  trap.type = "text";
  trap.name = "website";
  trap.tabIndex = -1;
  trap.autocomplete = "off";
  trap.setAttribute("aria-hidden", "true");
  trap.style.position = "absolute";
  trap.style.left = "-10000px";
  form.appendChild(trap);

  const status = document.createElement("p");
  status.className = "gh2-form-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  form.appendChild(status);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    const originalLabel = button ? button.innerHTML : "Send enquiry";
    if (button) { button.disabled = true; button.textContent = "Sending…"; }
    status.textContent = "Sending your enquiry…";
    status.className = "gh2-form-status is-pending";
    try {
      const response = await fetch(form.getAttribute("action") || "/.netlify/functions/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries()))
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || "We could not send the enquiry.");
      form.reset();
      status.textContent = result.message || "Thank you. Your enquiry has been sent.";
      status.className = "gh2-form-status is-success";
    } catch (error) {
      status.textContent = `${error.message} You can call or WhatsApp +91 89547 97115.`;
      status.className = "gh2-form-status is-error";
    } finally {
      if (button) { button.disabled = false; button.innerHTML = originalLabel; }
    }
  });
});

const lightbox = document.querySelector("[data-lightbox]");
if (lightbox) {
  const image = lightbox.querySelector("img");
  const caption = lightbox.querySelector("p");
  const close = () => lightbox.classList.remove("is-open");
  document.querySelectorAll("[data-gallery-image]").forEach((item) => {
    item.addEventListener("click", () => {
      image.src = item.dataset.src;
      image.alt = item.dataset.alt || "";
      caption.textContent = item.dataset.alt || "";
      lightbox.classList.add("is-open");
    });
  });
  lightbox.querySelector("button").addEventListener("click", close);
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) close(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
}

document.querySelectorAll("[data-year]").forEach((node) => node.textContent = new Date().getFullYear());

