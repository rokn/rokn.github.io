# Quick Edit Guide

## 🚀 Adding Your Random Links (The Section You Wanted!)

Open `data.json` and find the `"links"` section at the bottom:

```json
"links": [
  {
    "title": "Your Link Title Here",
    "url": "https://yourlink.com",
    "description": "Brief description of what this is"
  },
  {
    "title": "Another Cool Link",
    "url": "https://another.com",
    "description": "Another description"
  }
]
```

**Add as many as you want!** Just copy the pattern and separate with commas.

## 📝 Common Edits You'll Make

### 1. Update Email/Phone/Location
```json
"personal": {
  "email": "mindov.antonio@gmail.com",  ← Change this
  "phone": "+359 895 460 670",          ← Change this
  "location": "Sofia, Bulgaria"          ← Change this
}
```

### 2. Add New Job/Experience
Find the `"journey"` array and add a new item:

```json
{
  "id": "new-job-2025",
  "type": "work",
  "title": "New Position",
  "subtitle": "What makes it special",
  "organization": "Company Name",
  "period": "Oct 2025 - Present",
  "yearStart": 2025,
  "yearEnd": 2025,
  "description": "What you're doing there",
  "icon": "💼",
  "tags": ["Tech1", "Tech2"]
}
```

**Important**: Add a comma after the previous item!

### 3. Update Interests
Change your hobbies, AI focus, or bioinformatics interest:

```json
"interests": [
  {
    "name": "Artificial Intelligence",
    "description": "Update this with your latest AI projects",
    "icon": "🤖",
    "level": "expert"
  }
]
```

**Levels**: Use `"expert"`, `"learning"`, or `"hobby"`

### 4. Change Your Philosophy
```json
"philosophy": {
  "title": "Your Approach",
  "content": "Your detailed philosophy here..."
}
```

### 5. Add New Skills
```json
"skills": {
  "languages": ["Go", "Java", "Python", "Add New Here"],
  "technologies": ["React", "Docker", "Add New Here"]
}
```

## 🎨 Quick Style Changes

### Change Main Color
Open `styles.css` and find line 2:
```css
--primary: #00d4ff;  ← Change this hex code
```

Popular alternatives:
- Green: `#00ff41`
- Purple: `#a855f7`
- Orange: `#ff6b35`
- Red: `#ef4444`

### Adjust Particle Count
Open `app.js` and find line 39:
```javascript
const particleCount = 80;  ← Increase or decrease
```

More particles = cooler effect but slower performance

## 🔧 Testing Your Changes

1. **Validate JSON**: Copy your `data.json` content to https://jsonlint.com
2. **Test locally**: Run `python3 -m http.server 8000`
3. **Open browser**: Go to `http://localhost:8000`
4. **Check console**: Press F12, look for errors

## ⚠️ Common Mistakes

### JSON Syntax Errors
❌ **WRONG:**
```json
{
  "title": "Test",  ← Extra comma at end
}
```

✅ **CORRECT:**
```json
{
  "title": "Test"
}
```

### Missing Quotes
❌ **WRONG:**
```json
{ title: "Test" }
```

✅ **CORRECT:**
```json
{ "title": "Test" }
```

### Multiple Items - Missing Commas
❌ **WRONG:**
```json
[
  { "id": 1 }
  { "id": 2 }
]
```

✅ **CORRECT:**
```json
[
  { "id": 1 },
  { "id": 2 }
]
```

## 🚀 Deploy to GitHub

After making changes:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

Wait 1-2 minutes, then check your site!

## 💡 Pro Tips

1. **Always validate JSON before committing** - Saves headaches!
2. **Keep descriptions concise** - Better UX
3. **Use emoji icons** - Makes it more visual (find them at https://emojipedia.org)
4. **Test on mobile** - Open browser dev tools (F12) and toggle device toolbar
5. **Backup before major changes** - Copy `data.json` somewhere safe

## 📞 Need More Help?

- See `README.md` for full documentation
- See `GETTING_STARTED.md` for setup instructions
- See `data-template.json` for all available fields

---

**Remember**: The beauty of this portfolio is that 90% of changes happen in just ONE file: `data.json`!
