# David da Silva's Website

This is my personal website built with Jekyll and hosted on GitHub Pages.

## Local Development

### Prerequisites

- Ruby (3.4.5 or later recommended)
- Bundler

### Setup

1. Install Ruby dependencies:
   ```bash
   bundle install
   ```

2. Start the development server:
   ```bash
   ./serve.sh
   ```
   
   If you encounter port conflicts, use the simple version:
   ```bash
   ./serve-simple.sh
   ```
   
   Or manually:
   ```bash
   export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
   bundle exec jekyll serve --livereload
   ```

3. Open your browser and navigate to `http://localhost:4000`

### Building for Production

To build the site for production:

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
bundle exec jekyll build
```

The built site will be in the `_site` directory.

## GitHub Pages

This site is configured to work with GitHub Pages. When you push to the main branch, GitHub Pages will automatically build and deploy your site.

## Structure

- `_config.yml` - Jekyll configuration
- `_layouts/` - HTML templates
- `_includes/` - Reusable HTML components
- `_posts/` - Blog posts (Markdown files)
- `images/` - Static images
- `index.html` - Homepage

## Adding Content

### Blog Posts

Create new Markdown files in the `_posts/` directory with the format:
```
YYYY-MM-DD-title.md
```

Each post should have front matter:
```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS
---
```

### Pages

Create new HTML or Markdown files in the root directory with front matter:
```yaml
---
layout: page
title: "Page Title"
---
``` 