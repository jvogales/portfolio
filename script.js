(() => {
  "use strict";

  const lines = [...document.querySelectorAll(".code-line")];
  const sections = [...document.querySelectorAll("[data-nav]")];
  const navLinks = [...document.querySelectorAll(".file-link")];
  const explorer = document.querySelector(".explorer");
  const menuToggle = document.querySelector(".menu-toggle");
  const clock = document.querySelector("#clock");
  const position = document.querySelector("#status-position");
  const themeToggle = document.querySelector(".theme-toggle");
  const palette = document.querySelector(".command-palette");
  const paletteInput = document.querySelector("#palette-input");
  const toast = document.querySelector(".toast");
  const minimapViewport = document.querySelector(".minimap-viewport");
  let toastTimer;

  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
  };

  const updateClock = () => {
    clock.textContent = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date());
  };

  const setActiveSection = (id) => {
    navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveSection(visible.target.dataset.nav);
  }, { rootMargin: "-20% 0px -55%", threshold: [0.05, 0.25, 0.5] });

  sections.forEach((section) => sectionObserver.observe(section));

  const updateActiveLine = () => {
    const targetY = window.innerHeight * 0.42;
    let closest = lines[0];
    let smallestDistance = Infinity;

    lines.forEach((line) => {
      const rect = line.getBoundingClientRect();
      const distance = Math.abs(rect.top - targetY);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closest = line;
      }
    });

    lines.forEach((line) => line.classList.toggle("is-active", line === closest));
    const lineNumber = closest?.querySelector(".line-number")?.textContent || "1";
    position.textContent = `Ln ${lineNumber}, Col 1`;

    if (minimapViewport) {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pageHeight > 0 ? window.scrollY / pageHeight : 0;
      minimapViewport.style.transform = `translateY(${progress * 400}%)`;
    }
  };

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLine();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  menuToggle.addEventListener("click", () => {
    const isOpen = explorer.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar navegação" : "Abrir navegação");
  });

  navLinks.forEach((link) => link.addEventListener("click", () => {
    explorer.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    themeToggle.textContent = isLight ? "◑" : "◐";
    showToast(isLight ? "Tema claro ativado — plot twist!" : "De volta ao lado escuro do código.");
  });

  const closePalette = () => {
    palette.hidden = true;
    paletteInput.value = "";
  };

  const openPalette = () => {
    palette.hidden = false;
    window.setTimeout(() => paletteInput.focus(), 0);
  };

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      palette.hidden ? openPalette() : closePalette();
    }
    if (event.key === "Escape" && !palette.hidden) closePalette();
  });

  palette.addEventListener("click", (event) => {
    if (event.target === palette) closePalette();
  });

  paletteInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const aliases = {
      inicio: "hero", home: "hero", joao: "hero",
      sobre: "about", about: "about",
      skills: "skills", tecnologias: "skills",
      projetos: "projects", projects: "projects",
      contato: "contact", contact: "contact"
    };
    const query = paletteInput.value.trim().toLowerCase();
    const destination = document.querySelector(`#${aliases[query] || query}`);
    if (destination) {
      destination.scrollIntoView({ behavior: "smooth" });
      closePalette();
    } else {
      showToast("Comando não encontrado. Tente “projetos” ou “contato”.");
    }
  });

  document.querySelector(".status-smile").addEventListener("click", () => {
    showToast("Achievement unlocked: você lê a status bar! ☕");
  });

  let typedKeys = "";
  document.addEventListener("keyup", (event) => {
    if (event.key.length !== 1 || event.ctrlKey || event.metaKey) return;
    typedKeys = (typedKeys + event.key.toLowerCase()).slice(-5);
    if (typedKeys === "hello") showToast("Olá também! 👋 — João Vitor");
  });

  updateClock();
  updateActiveLine();
  window.setInterval(updateClock, 30000);
})();
