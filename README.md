# Yuanhe Zhang — Academic Homepage

Single-page bilingual academic homepage for Yuanhe Zhang, based on [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io).

## Site structure

- One generated content page at `/CV/`
- Header links scroll to `About`, `Research`, `Publications`, and `Contact`
- English/Chinese text switches in place without changing the URL
- Publication titles remain in English
- Citation counts are refreshed from Semantic Scholar by GitHub Actions

## Local development

```bash
bundle install
bundle exec jekyll serve --baseurl /CV
```

Open `http://127.0.0.1:4000/CV/`.

## Content

- Main page: `_pages/about.md`
- Publications: `_data/publications.yml`
- Author configuration: `_config.yml`
- Citation cache: `assets/json/semantic-scholar-citations.json`

The AcadHomepage source is distributed under the MIT License; see `LICENSE`.
