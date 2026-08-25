(function () {
  "use strict";

  const languageToggle = document.getElementById("language-toggle");
  const languageToggleLabel = languageToggle && languageToggle.querySelector(".language-toggle__label");
  const languageNodes = Array.from(document.querySelectorAll("[data-lang]"));
  const sectionLinks = Array.from(document.querySelectorAll(".section-link"));
  const externalNavLinks = Array.from(document.querySelectorAll(".external-nav-link"));

  function setLanguage(language) {
    const current = language === "zh" ? "zh" : "en";
    document.documentElement.lang = current === "zh" ? "zh-CN" : "en";

    languageNodes.forEach((node) => {
      node.hidden = node.dataset.lang !== current;
    });

    sectionLinks.forEach((link) => {
      link.textContent = current === "zh" ? link.dataset.labelZh : link.dataset.labelEn;
    });

    externalNavLinks.forEach((link) => {
      const label = link.querySelector(".external-nav-label");
      if (label) label.textContent = current === "zh" ? link.dataset.labelZh : link.dataset.labelEn;
    });

    if (languageToggle && languageToggleLabel) {
      languageToggleLabel.textContent = current === "zh" ? "English" : "中文";
      languageToggle.setAttribute("aria-label", current === "zh" ? "Switch to English" : "切换至中文");
      languageToggle.setAttribute("aria-pressed", String(current === "zh"));
    }

    try {
      window.localStorage.setItem("cv-language", current);
    } catch (_error) {
      // The page still works when storage is unavailable.
    }
  }

  let initialLanguage = /^zh\b/i.test(window.navigator.language || "") ? "zh" : "en";
  try {
    const storedLanguage = window.localStorage.getItem("cv-language");
    if (storedLanguage === "zh" || storedLanguage === "en") initialLanguage = storedLanguage;
  } catch (_error) {
    initialLanguage = /^zh\b/i.test(window.navigator.language || "") ? "zh" : "en";
  }
  setLanguage(initialLanguage);

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      setLanguage(document.documentElement.lang === "zh-CN" ? "en" : "zh");
    });
  }

  const sections = Array.from(document.querySelectorAll(".anchor-section"));
  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        sectionLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0, 0.1, 0.5] }
    );
    sections.forEach((section) => observer.observe(section));
  }

  fetch("assets/json/semantic-scholar-citations.json", { cache: "no-cache" })
    .then((response) => {
      if (!response.ok) throw new Error(`Citation cache returned ${response.status}`);
      return response.json();
    })
    .then((data) => {
      document.querySelectorAll(".publication-item[data-paper-key]").forEach((item) => {
        const paper = data.papers && data.papers[item.dataset.paperKey];
        if (!paper) return;
        const badge = item.querySelector(".citation-badge");
        const count = item.querySelector(".citation-count");
        if (badge && paper.url) badge.href = paper.url;
        if (count && Number.isFinite(paper.citationCount)) count.textContent = paper.citationCount;
      });
    })
    .catch(() => {
      // Search links remain usable if the citation service or cache is unavailable.
    });
})();
