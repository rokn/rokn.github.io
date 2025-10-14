# Antonio Mindov - Developer Portfolio

A modern, fluid, and interactive portfolio website showcasing my journey from systems programming to AI development.

## 🚀 Features

- **Data-Driven Architecture**: All content is managed through a single `data.json` file for easy updates
- **Particle Background**: Dynamic particle system with interconnected nodes
- **Interactive Timeline**: Filterable journey visualization with smooth animations
- **Glassmorphism Design**: Modern UI with glass-like translucent elements
- **Smooth Animations**: Fade-in, slide, and scale animations triggered on scroll
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Performance Optimized**: Lazy loading and intersection observers for smooth performance

## 🎨 Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern animations, glassmorphism, gradients
- **Vanilla JavaScript**: No frameworks, pure performance
- **GitHub Pages**: Static hosting

## 📝 How to Modify Content

All content is stored in `data.json`. Simply edit this file to update:

### Personal Information
```json
"personal": {
  "name": "Your Name",
  "title": "Your Title",
  "email": "your@email.com",
  // ... more fields
}
```

### Journey Timeline
```json
"journey": [
  {
    "id": "unique-id",
    "type": "work" | "education",
    "title": "Position Title",
    "organization": "Company Name",
    "period": "Start - End",
    "yearStart": 2020,
    "yearEnd": 2025,
    "description": "What you did",
    "icon": "🎓", // Any emoji
    "tags": ["Tag1", "Tag2"]
  }
]
```

### Skills
```json
"skills": {
  "languages": ["Go", "Java", "Python"],
  "technologies": ["React", "Docker"],
  "databases": ["PostgreSQL", "Redis"],
  "cloud": ["GCP", "AWS"]
}
```

### Interests
```json
"interests": [
  {
    "name": "Interest Name",
    "description": "Description",
    "icon": "🤖",
    "level": "expert" | "learning" | "hobby"
  }
]
```

### Links Section
```json
"links": [
  {
    "title": "Link Title",
    "url": "https://example.com",
    "description": "Link description"
  }
]
```

## 🚀 Deployment

This site is designed for GitHub Pages:

1. Push all files to your GitHub repository
2. Go to repository Settings → Pages
3. Select "main" branch as source
4. Your site will be live at `https://yourusername.github.io`

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --primary: #00d4ff;
  --secondary: #7c3aed;
  --accent: #ec4899;
  /* ... more colors */
}
```

### Animations
Adjust animation timings in `styles.css` keyframes section.

### Particle System
Modify particle behavior in `app.js` → `initParticles()`:
```javascript
const particleCount = 80; // Number of particles
const connectionDistance = 150; // Connection range
```

## 📱 Responsive Breakpoints

- Desktop: 968px and above
- Tablet: 640px - 968px
- Mobile: Below 640px

## ⚡ Performance Tips

1. Keep images optimized (use WebP format when possible)
2. Minimize JSON file size
3. Use CDN for fonts if needed
4. Enable GitHub Pages compression

## 🎯 Features Highlights

### Interactive Elements
- Smooth scroll navigation
- Hover effects on all interactive elements
- Timeline filtering (All/Work/Education)
- Ripple effects on buttons
- Parallax scrolling

### Visual Effects
- Gradient text
- Glassmorphism cards
- Floating animations
- Rotating circles
- Fade-in on scroll

### Easter Eggs
- Konami code activation (↑↑↓↓←→←→BA)
- Cursor trail effect

## 📄 File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── app.js              # JavaScript logic and interactions
├── data.json           # All content data
└── README.md           # This file
```

## 🔧 Local Development

1. Clone the repository
2. Open `index.html` in a modern browser
3. Edit `data.json` to update content
4. Refresh to see changes

**Note**: Some features (like fetch) require a local server. Use:
```bash
python -m http.server 8000
# or
npx serve
```

Then visit `http://localhost:8000`

## 🌟 Best Practices

1. **Always validate JSON** before deploying (use [JSONLint](https://jsonlint.com/))
2. **Test responsiveness** across devices
3. **Optimize images** before adding
4. **Keep descriptions concise** for better UX
5. **Use semantic HTML** for accessibility

## 📞 Support

For issues or questions, open an issue on GitHub or contact me directly.

## 📜 License

© Antonio Mindov. Feel free to use this template for your own portfolio, just give credit!

---

Built with ❤️, lots of ☕, and attention to every detail.
