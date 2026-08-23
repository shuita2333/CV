# Academic CV Website

Yuanhe Zhang's independent academic homepage, based on [al-folio](https://github.com/alshedivat/al-folio).

## Target URL

`https://shuita2333.github.io/CV/`

## Content

- `_config.yml`: site metadata and `/CV` deployment path
- `_pages/about.md`: biography and research interests
- `_bibliography/papers.bib`: publication metadata imported from Google Scholar
- `_projects/`: research themes and selected projects
- `_data/cv.yml`: structured curriculum vitae
- `_data/socials.yml`: email, Google Scholar, and GitHub profiles

## Deployment

Push the repository to `shuita2333/CV`, enable GitHub Actions with read/write workflow permission, and configure GitHub Pages to publish from the generated `gh-pages` branch.

## Local preview

The upstream project recommends Docker on Windows:

```bash
docker compose pull
docker compose up
```

Then open `http://localhost:8080/CV/`.
