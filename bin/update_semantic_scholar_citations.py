#!/usr/bin/env python3
"""Refresh cached Semantic Scholar citation counts for the academic homepage."""

from __future__ import annotations

import json
import os
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "assets" / "json" / "semantic-scholar-citations.json"
API_URL = "https://api.semanticscholar.org/graph/v1/paper/batch?fields=paperId,title,url,citationCount"

PAPERS = {
    "he2025mitigating": "DOI:10.1016/j.ipm.2025.104150",
    "zhou2026corba": "ARXIV:2502.14529",
    "zhang2025crabs": "DOI:10.18653/v1/2025.findings-acl.580",
    "zhu2025demonagent": "ARXIV:2502.12575",
    "lin2026hidden": "ARXIV:2508.02175",
    "zhang2025pd3f": "DOI:10.18653/v1/2025.findings-emnlp.195",
    "zhou2026mcpshield": "ARXIV:2602.14281",
    "zhang2025lifebench": "ARXIV:2505.16234",
    "luo2026survey": "ARXIV:2605.20266",
    "zhang2026see": "DOI:10.18653/v1/2026.acl-long.866",
    "zhang2026resource": "ARXIV:2603.16068",
    "wang2026recur": "ARXIV:2602.08214",
    "gao2025resource": "ARXIV:2507.18053",
    "wang2026helpfulness": "ARXIV:2602.04197",
    "zhang2025leechhijack": "ARXIV:2512.02321",
    "zhang2026structure": "ARXIV:2605.27927",
    "lin2026echodistill": "ARXIV:2605.23954",
    "zhang2026larft": "ARXIV:2603.19255",
}


def fetch_batch() -> list[dict | None]:
    payload = json.dumps({"ids": list(PAPERS.values())}).encode("utf-8")
    headers = {"Content-Type": "application/json", "User-Agent": "shuita2333-CV/1.0"}
    api_key = os.environ.get("SEMANTIC_SCHOLAR_API_KEY")
    if api_key:
        headers["x-api-key"] = api_key

    request = urllib.request.Request(API_URL, data=payload, headers=headers, method="POST")
    delay = 4
    for attempt in range(8):
        try:
            with urllib.request.urlopen(request, timeout=45) as response:
                return json.load(response)
        except urllib.error.HTTPError as error:
            if error.code != 429 or attempt == 7:
                raise
            time.sleep(delay)
            delay = min(delay * 2, 30)

    raise RuntimeError("Semantic Scholar request did not complete")


def main() -> None:
    previous = json.loads(OUTPUT_PATH.read_text(encoding="utf-8")) if OUTPUT_PATH.exists() else {"papers": {}}
    results = fetch_batch()
    refreshed: dict[str, dict] = {}

    for (key, external_id), result in zip(PAPERS.items(), results, strict=True):
        if result is None:
            cached = previous.get("papers", {}).get(key)
            if cached:
                refreshed[key] = cached
            continue
        refreshed[key] = {
            "citationCount": result.get("citationCount", 0),
            "externalId": external_id,
            "paperId": result.get("paperId"),
            "title": result.get("title"),
            "url": result.get("url"),
        }

    output = {
        "source": "Semantic Scholar Academic Graph API",
        "updated_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "papers": refreshed,
    }
    OUTPUT_PATH.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Updated {len(refreshed)} Semantic Scholar citation records.")


if __name__ == "__main__":
    main()
