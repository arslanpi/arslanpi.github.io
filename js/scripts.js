(() => {
  const preloader = document.querySelector(".preloader");
  const nav = document.querySelector(".navigation");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  const links = document.querySelectorAll(".nav-menu a, .page-scroll");
  const backTop = document.querySelector(".back-to-top");
  const skillFills = document.querySelectorAll(".skill-fill");
  let skillsAnimated = false;

  window.addEventListener("load", () => {
    if (preloader) preloader.classList.add("hidden");
    animateSkillsIfNeeded();
  });
  setTimeout(() => {
    if (preloader) preloader.classList.add("hidden");
  }, 2500);

  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("sticky", y > 40);
    if (backTop) backTop.classList.toggle("show", y > 500);
    highlightNav();
    animateSkillsIfNeeded();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", menu.classList.contains("open"));
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = nav ? nav.offsetHeight + 8 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      if (menu) menu.classList.remove("open");
    });
  });

  function highlightNav() {
    const sections = document.querySelectorAll("section[id], header[id]");
    const scrollPos = window.scrollY + (nav ? nav.offsetHeight + 40 : 100);
    let current = "home";
    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) current = section.id;
    });
    document.querySelectorAll(".nav-menu a").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
  }

  function animateSkillsIfNeeded() {
    if (skillsAnimated || !skillFills.length) return;
    const block = document.querySelector(".skills-block");
    if (!block) return;
    const rect = block.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      skillFills.forEach((el) => {
        el.style.width = el.dataset.width || "0%";
      });
      skillsAnimated = true;
    }
  }
})();
