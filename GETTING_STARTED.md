# Getting Started Guide

## Quick Start

1. **Test Locally**
   ```bash
   # Navigate to the project directory
   cd rokn.github.io

   # Start a local server (choose one):
   python -m http.server 8000
   # or
   python3 -m http.server 8000
   # or
   npx serve
   ```

2. **Open in Browser**
   - Visit `http://localhost:8000`
   - You should see your portfolio!

3. **Make Your First Edit**
   - Open `data.json`
   - Update the `links` section:
   ```json
   "links": [
     {
       "title": "My Blog",
       "url": "https://yourblog.com",
       "description": "Check out my technical blog"
     }
   ]
   ```
   - Save and refresh the browser

## Deploying to GitHub Pages

### First Time Setup

1. **Initialize Git** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   ```

2. **Create GitHub Repository**
   - Go to GitHub and create a new repository
   - Name it `yourusername.github.io` (replace with your actual username)
   - **Important**: Use your exact GitHub username!

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Wait 1-2 minutes

5. **Visit Your Site**
   - Your portfolio will be live at: `https://yourusername.github.io`

### Updating Your Portfolio

1. **Edit content in `data.json`**
2. **Commit and push**:
   ```bash
   git add data.json
   git commit -m "Update portfolio content"
   git push
   ```
3. **Wait 1-2 minutes** for GitHub Pages to rebuild

## Customization Checklist

### Essential Updates

- [ ] Update `data.json` with your information
- [ ] Replace all "Random Link" entries with actual links
- [ ] Update social media URLs
- [ ] Add your actual phone number and email
- [ ] Update the journey timeline with your experiences
- [ ] Add your skills
- [ ] Customize interests section

### Optional Customizations

- [ ] Change color scheme in `styles.css` (`:root` variables)
- [ ] Adjust particle count in `app.js`
- [ ] Add custom domain (edit `CNAME` file)
- [ ] Add favicon (place `favicon.ico` in root)
- [ ] Add custom fonts

## Color Customization

Edit these variables in `styles.css`:

```css
:root {
  --primary: #00d4ff;      /* Main accent color (cyan) */
  --secondary: #7c3aed;    /* Secondary color (purple) */
  --accent: #ec4899;       /* Accent highlights (pink) */
  --bg-dark: #0a0a0f;      /* Background color */
}
```

**Popular Color Schemes:**

### Tech Blue
```css
--primary: #0066ff;
--secondary: #00ccff;
--accent: #6366f1;
```

### Cyber Green
```css
--primary: #00ff41;
--secondary: #00d4aa;
--accent: #39ff14;
```

### Sunset Orange
```css
--primary: #ff6b35;
--secondary: #f7931e;
--accent: #c1292e;
```

## Adding Custom Sections

Want to add a blog section or projects? Here's how:

1. **Add data to `data.json`**:
```json
"projects": [
  {
    "title": "Project Name",
    "description": "What it does",
    "url": "https://github.com/...",
    "tech": ["React", "Node.js"]
  }
]
```

2. **Add HTML section in `index.html`** (before footer):
```html
<section id="projects" class="projects">
  <div class="container">
    <h2 class="section-title">
      <span class="section-number">06</span>
      Projects
    </h2>
    <div class="projects-grid" id="projects-grid">
      <!-- Will be populated by JavaScript -->
    </div>
  </div>
</section>
```

3. **Add function in `app.js`**:
```javascript
function populateProjects() {
  if (!portfolioData) return;

  const projectsGrid = document.getElementById('projects-grid');
  const { projects } = portfolioData;

  projectsGrid.innerHTML = projects.map(project => `
    <div class="project-card">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a href="${project.url}">View Project →</a>
    </div>
  `).join('');
}
```

4. **Call in DOMContentLoaded**:
```javascript
document.addEventListener('DOMContentLoaded', async () => {
  // ... existing code ...
  populateProjects(); // Add this line
});
```

## Troubleshooting

### Site not loading?
- Check browser console (F12) for errors
- Ensure you're running a local server (not opening file:// directly)
- Validate `data.json` at https://jsonlint.com

### GitHub Pages not updating?
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait 2-3 minutes after pushing
- Check GitHub Actions tab for build status

### Particles not showing?
- Check if canvas is being blocked by browser
- Ensure JavaScript is enabled
- Try different browser

### Mobile menu not working?
- Clear cache and hard reload
- Check if JavaScript loaded properly

## Performance Tips

1. **Optimize images**: Use tools like TinyPNG or ImageOptim
2. **Minimize JSON**: Remove unnecessary whitespace in production
3. **Use WebP format**: For better compression
4. **Enable caching**: GitHub Pages does this automatically

## SEO Optimization

1. **Update meta tags** in `index.html`:
```html
<meta name="description" content="Your custom description">
<meta name="keywords" content="developer, portfolio, your, keywords">
<meta property="og:title" content="Your Name - Portfolio">
<meta property="og:description" content="Your description">
<meta property="og:image" content="path/to/preview-image.jpg">
```

2. **Add structured data** for better search results

3. **Submit to Google Search Console**

## Adding a Custom Domain

1. Buy a domain (Namecheap, Google Domains, etc.)
2. Add your domain to `CNAME` file:
   ```
   yourdomain.com
   ```
3. Configure DNS with your registrar:
   - Add A records pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or add CNAME record: `yourusername.github.io`

4. Enable HTTPS in GitHub Pages settings (wait 24 hours for SSL)

## Need Help?

- Check the main README.md for detailed documentation
- Open an issue on GitHub
- Contact: mindov.antonio@gmail.com

## Next Steps

1. ✅ Get site running locally
2. ✅ Customize data.json with your info
3. ✅ Deploy to GitHub Pages
4. ✅ Share your portfolio!

Happy coding! 🚀
