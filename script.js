(() => {
  "use strict";
  document.documentElement.classList.add("js");

  const $ = (selector) => document.querySelector(selector);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const header = $(".header");
  const menuButton = $(".menu-toggle");
  const nav = $("#main-nav");
  const links = [...nav.querySelectorAll("a")];
  const sections = links.map((link) => $(link.getAttribute("href")));

  function closeMenu(restoreFocus = false) {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    $(".menu-label").textContent = "Menu";
    if (restoreFocus) menuButton.focus();
  }

  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    $(".menu-label").textContent = open ? "Fechar" : "Menu";
  });
  links.forEach((link) => link.addEventListener("click", () => closeMenu()));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open"))
      closeMenu(true);
  });
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) closeMenu();
  });
  window
    .matchMedia("(min-width: 821px)")
    .addEventListener("change", () => closeMenu());

  let scrollPending = false;
  function updateNavigation() {
    const offset = header.offsetHeight + 100;
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= offset) active = section;
    }
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 5
    ) {
      active = sections[sections.length - 1];
    }
    links.forEach((link) => {
      if (link.hash === `#${active.id}`)
        link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    header.classList.toggle("scrolled", window.scrollY > 20);
    scrollPending = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!scrollPending) {
        scrollPending = true;
        window.requestAnimationFrame(updateNavigation);
      }
    },
    { passive: true },
  );
  updateNavigation();

  const disclosure = $(".disclosure-button");
  const extraExperience = $("#more-experience");
  extraExperience.hidden = true;
  disclosure.hidden = false;
  disclosure.addEventListener("click", () => {
    const expanded = disclosure.getAttribute("aria-expanded") !== "true";
    disclosure.setAttribute("aria-expanded", String(expanded));
    extraExperience.hidden = !expanded;
    $(".disclosure-label").textContent = expanded
      ? "Mostrar menos da trajetória"
      : "Mostrar mais da trajetória";
    $(".disclosure-symbol").textContent = expanded ? "−" : "+";
    if (
      expanded &&
      !reducedMotion.matches &&
      !document.body.classList.contains("motion-paused")
    ) {
      extraExperience.animate(
        [
          { opacity: 0, transform: "translateY(-8px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 300, easing: "ease-out" },
      );
    }
  });

  const projectPreviewLink = $("[data-project-preview]");
  const projectPreviewDialog = $("#site-preview");
  const projectPreviewFrame = projectPreviewDialog.querySelector("iframe");
  const projectPreviewLoading = projectPreviewDialog.querySelector(
    ".site-preview-loading",
  );
  let previewTimer;

  projectPreviewLink.addEventListener("click", (event) => {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      !projectPreviewDialog.showModal
    )
      return;
    event.preventDefault();
    projectPreviewLoading.textContent = "Carregando o site…";
    projectPreviewLoading.hidden = false;
    projectPreviewDialog.showModal();
    document.body.classList.add("preview-open");
    projectPreviewFrame.src = projectPreviewLink.href;
    previewTimer = window.setTimeout(() => {
      projectPreviewLoading.textContent =
        "O carregamento pode levar alguns instantes. Se o site não aparecer, use o link abaixo.";
    }, 12000);
  });
  projectPreviewFrame.addEventListener("load", () => {
    window.clearTimeout(previewTimer);
    projectPreviewLoading.hidden = true;
  });
  projectPreviewDialog
    .querySelector(".site-preview-close")
    .addEventListener("click", () => projectPreviewDialog.close());
  projectPreviewDialog.addEventListener("click", (event) => {
    if (event.target !== projectPreviewDialog) return;
    const bounds = projectPreviewDialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      projectPreviewDialog.close();
  });
  projectPreviewDialog.addEventListener("close", () => {
    window.clearTimeout(previewTimer);
    projectPreviewFrame.removeAttribute("src");
    document.body.classList.remove("preview-open");
    projectPreviewLink.focus({ preventScroll: true });
  });

  document.querySelectorAll("[data-project-summary]").forEach((trigger) => {
    const dialog = document.getElementById(
      trigger.getAttribute("aria-controls"),
    );
    trigger.addEventListener("click", (event) => {
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        !dialog.showModal
      )
        return;
      event.preventDefault();
      dialog.showModal();
      document.body.classList.add("preview-open");
    });
    dialog
      .querySelector("button")
      .addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      )
        dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("preview-open");
      trigger.focus({ preventScroll: true });
    });
  });

  const copyButton = $(".copy-button");
  const copyStatus = $("#copy-status");
  copyButton.addEventListener("click", async () => {
    copyButton.disabled = true;
    try {
      await navigator.clipboard.writeText("orlandinijoao9@gmail.com");
      copyStatus.textContent = "E-mail copiado para a área de transferência.";
    } catch {
      copyStatus.textContent =
        "Não foi possível copiar. Selecione o endereço acima ou clique nele para enviar um e-mail.";
    } finally {
      copyButton.disabled = false;
    }
  });
  $("#year").textContent = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

  // All content stays visible without JavaScript or when motion is reduced.
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("pending");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07 },
    );
    document
      .querySelectorAll(
        ".section-heading, .about-grid, .skills-grid, .project, .timeline-item",
      )
      .forEach((element) => {
        if (!element.closest("[hidden]")) {
          element.classList.add("reveal", "pending");
          revealObserver.observe(element);
        }
      });
  }

  const canvas = $("#particles");
  const context = canvas.getContext("2d");
  const hero = $(".hero");
  const motionButton = $("#motion-toggle");
  let pausedByUser = false;
  let heroVisible = true;
  let frame = null;
  let previousTime = 0;
  let width = 0;
  let height = 0;
  let points = [];

  function resizeCanvas() {
    width = hero.clientWidth;
    height = hero.clientHeight;
    const scale = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    if (!context) return;
    context.setTransform(scale, 0, 0, scale, 0, 0);
    points = Array.from(
      { length: Math.min(45, Math.round(width / 30)) },
      () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.11,
        vy: (Math.random() - 0.5) * 0.11,
        radius: Math.random() * 1.1 + 0.5,
      }),
    );
    drawParticles(0);
  }

  function drawParticles(delta) {
    if (!context) return;
    context.clearRect(0, 0, width, height);
    points.forEach((point, index) => {
      point.x = (point.x + point.vx * delta + width) % width;
      point.y = (point.y + point.vy * delta + height) % height;
      context.beginPath();
      context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(168,85,247,0.38)";
      context.fill();
      for (let next = index + 1; next < points.length; next++) {
        const other = points[next];
        const distance = Math.hypot(point.x - other.x, point.y - other.y);
        if (distance < 115) {
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = `rgba(168,85,247,${0.07 * (1 - distance / 115)})`;
          context.lineWidth = 0.6;
          context.stroke();
        }
      }
    });
  }

  function tick(time) {
    frame = null;
    const delta = previousTime ? Math.min((time - previousTime) / 16.67, 3) : 1;
    previousTime = time;
    drawParticles(delta);
    frame = window.requestAnimationFrame(tick);
  }

  function updateMotion() {
    const paused = pausedByUser || reducedMotion.matches;
    document.body.classList.toggle("motion-paused", paused);
    motionButton.hidden = reducedMotion.matches;
    motionButton.setAttribute("aria-pressed", String(pausedByUser));
    motionButton.innerHTML = pausedByUser
      ? 'Retomar animações <span aria-hidden="true">▶</span>'
      : 'Pausar animações <span aria-hidden="true">Ⅱ</span>';
    if (frame !== null) window.cancelAnimationFrame(frame);
    frame = null;
    previousTime = 0;
    if (!paused && !document.hidden && heroVisible && context)
      frame = window.requestAnimationFrame(tick);
    else drawParticles(0);
  }

  motionButton.addEventListener("click", () => {
    pausedByUser = !pausedByUser;
    updateMotion();
  });
  reducedMotion.addEventListener("change", updateMotion);
  document.addEventListener("visibilitychange", updateMotion);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      updateMotion();
    }).observe(hero);
  }
  if ("ResizeObserver" in window)
    new ResizeObserver(resizeCanvas).observe(hero);
  else window.addEventListener("resize", resizeCanvas, { passive: true });
  resizeCanvas();
  updateMotion();
})();
