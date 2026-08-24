(() => {
  const scriptUrl = document.currentScript?.src;
  const cacheUrl = scriptUrl ? new URL("../json/semantic-scholar-citations.json", scriptUrl).href : null;
  const papers = {
    he2025mitigating: {
      id: "DOI:10.1016/j.ipm.2025.104150",
      title: "Mitigating privacy risks in retrieval-augmented generation via locally private entity perturbation",
    },
    zhou2026corba: {
      id: "ARXIV:2502.14529",
      title: "CORBA: Contagious Recursive Blocking Attacks on Multi-Agent Systems Based on Large Language Models",
    },
    zhang2025crabs: {
      id: "DOI:10.18653/v1/2025.findings-acl.580",
      title: "Crabs: Consuming Resource via Auto-generation for LLM-DoS Attack under Black-box Settings",
    },
    zhu2025demonagent: {
      id: "ARXIV:2502.12575",
      title: "DemonAgent: Dynamically Encrypted Multi-Backdoor Implantation Attack on LLM-based Agent",
    },
    lin2026hidden: {
      id: "ARXIV:2508.02175",
      title: "Hidden in the Noise: Unveiling Backdoors in Audio LLMs Alignment through Latent Acoustic Pattern Triggers",
    },
    zhang2025pd3f: {
      id: "DOI:10.18653/v1/2025.findings-emnlp.195",
      title: "PD3F: A Pluggable and Dynamic DoS-Defense Framework against Resource Consumption Attacks Targeting Large Language Models",
    },
    zhou2026mcpshield: {
      id: "ARXIV:2602.14281",
      title: "MCPShield: A Security Cognition Layer for Adaptive Trust Calibration in Model Context Protocol Agents",
    },
    zhang2025lifebench: {
      id: "ARXIV:2505.16234",
      title: "LIFEBench: Evaluating Length Instruction Following in Large Language Models",
    },
    luo2026survey: {
      id: "ARXIV:2605.20266",
      title: "A Survey of Large Audio Language Models: Generalization, Trustworthiness, and Outlook",
    },
    zhang2026see: {
      id: "DOI:10.18653/v1/2026.acl-long.866",
      title: "SEE: Signal Embedding Energy for Quantifying Noise Interference in Large Audio Language Models",
    },
    zhang2026resource: {
      id: "ARXIV:2603.16068",
      title: "Resource Consumption Threats in Large Language Models",
    },
    wang2026recur: {
      id: "ARXIV:2602.08214",
      title: "RECUR: Resource Exhaustion Attack via Recursive-Entropy Guided Counterfactual Utilization and Reflection",
    },
    gao2025resource: {
      id: "ARXIV:2507.18053",
      title: "Resource Consumption Red-Teaming for Large Vision-Language Models",
    },
    wang2026helpfulness: {
      id: "ARXIV:2602.04197",
      title: "From Helpfulness to Toxic Proactivity: Diagnosing Behavioral Misalignment in LLM Agents",
    },
    zhang2025leechhijack: {
      id: "ARXIV:2512.02321",
      title: "LeechHijack: Covert Computational Resource Exploitation in Intelligent Agent Systems",
    },
    zhang2026structure: {
      id: "ARXIV:2605.27927",
      title: "Structure-Guided Visual Perturbation Neutralization for LVLMs",
    },
    lin2026echodistill: {
      id: "ARXIV:2605.23954",
      title: "EchoDistill: Alignment Noisy-to-Clean Self-Distillation for Robust Audio LLMs",
    },
    zhang2026larft: {
      id: "ARXIV:2603.19255",
      title: "LARFT: Closing the Cognition-Action Gap for Length Instruction Following in Large Language Models",
    },
  };

  const apiBase = "https://api.semanticscholar.org/graph/v1";
  const targets = [];

  const makeSearchUrl = (title) => `https://www.semanticscholar.org/search?q=${encodeURIComponent(title)}&sort=relevance`;

  const makeBadgeUrl = (count) =>
    `https://img.shields.io/badge/Semantic_Scholar-${encodeURIComponent(count)}-1857B6?logo=semanticscholar&labelColor=f5f5dc`;

  const applyResult = (target, result) => {
    if (!result) return;
    const count = Number.isInteger(result.citationCount) ? result.citationCount : "unavailable";
    target.link.href = result.url || (result.paperId ? `https://www.semanticscholar.org/paper/${result.paperId}` : makeSearchUrl(target.paper.title));
    target.image.src = makeBadgeUrl(count);
    target.image.alt = `${count} Semantic Scholar citations for ${target.paper.title}`;
  };

  Object.entries(papers).forEach(([key, paper]) => {
    const entry = document.getElementById(key);
    const link = entry?.querySelector('.badges a[aria-label="Google Scholar link"]');
    const image = link?.querySelector("img");
    if (!link || !image) return;

    link.href = makeSearchUrl(paper.title);
    link.target = "_blank";
    link.rel = "external nofollow noopener";
    link.setAttribute("aria-label", "Semantic Scholar citations");
    link.dataset.semanticScholarId = paper.id;

    image.src = makeBadgeUrl("loading");
    image.alt = `Semantic Scholar citation count for ${paper.title}`;
    image.onerror = () => {
      image.onerror = null;
      image.src = "https://img.shields.io/badge/Semantic_Scholar-unavailable-lightgrey?logo=semanticscholar";
    };

    targets.push({ key, link, image, paper });
  });

  if (targets.length === 0) return;

  if (cacheUrl) {
    fetch(cacheUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Citation cache returned ${response.status}`);
        return response.json();
      })
      .then((cache) => {
        targets.forEach((target) => applyResult(target, cache.papers?.[target.key]));
      })
      .catch(() => {
        targets.forEach((target) => applyResult(target, null));
      });
  }

  fetch(`${apiBase}/paper/batch?fields=paperId,url,citationCount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids: targets.map(({ paper }) => paper.id) }),
  })
    .then((response) => {
      if (!response.ok) throw new Error(`Semantic Scholar returned ${response.status}`);
      return response.json();
    })
    .then((results) => {
      results.forEach((result, index) => {
        applyResult(targets[index], result);
      });
    })
    .catch(() => {
      // The scheduled cache remains visible when the optional live lookup is rate-limited.
    });
})();
