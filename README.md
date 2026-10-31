# NekoMind — AI Video Prompts & YouTube Automation Hub

A professional, editorial website for **NekoMind**, focused on AI video creation, prompt engineering, and YouTube channel automation.

---

## 🚀 Key Highlights & New Updates

1. **Website Brand**: **NekoMind** — AI Video & Automation Hub.
2. **Zero Picture Dependency for Content Updates**:
   - Prompts, courses, modules, and lessons can be created or updated purely in JSON without requiring any images or thumbnail URLs.
   - When any JSON file under `/content/` is updated, the website immediately reflects the new content.
3. **Thumbnail-Free Prompt Library**:
   - The AI Prompt Library (`/prompts`) now features sleek, typography- and code-driven prompt cards with instant one-click copy buttons, tool badges, generation parameters, and tags without image thumbnails.
4. **Focused Learning Hub**:
   - Single flagship course: **YouTube Automation: AI Faceless Video Blueprint** (`/learn/youtube-automation`).
   - 4 modules and 8 in-depth lessons covering niche selection, viral scriptwriting formulas, AI b-roll generation, ElevenLabs narration, and automated timeline assembly.
5. **Streamlined Navigation**:
   - Resources section removed from navigation, footer, and sitemap.

---

## 🛠️ Quick Commands

```bash
# Validate content schema and relationships
npm run validate-content

# Start dev server
npm run dev

# Lint check
npm run lint

# Production build
npm run build
```

---

## ✍️ How to Add Prompts or Course Content (No Pictures Required)

### 1. Adding a Prompt (`content/prompts.json`)

```json
{
  "id": "prompt-006",
  "slug": "stealth-drone-canyon",
  "title": "Autonomous Drone Valley Run",
  "description": "Dynamic low-altitude canyon tracking shot with dramatic sunset lighting.",
  "prompt": "FPV drone camera flying rapidly through narrow sandstone canyon at golden hour, dust trailing, motion blur, 8k, photorealistic --ar 16:9 --v 6.1",
  "negativePrompt": "low resolution, plastic textures",
  "category": "Cinematic",
  "tools": ["Midjourney v6.1", "Runway Gen-3 Alpha"],
  "tags": ["drone", "canyon", "cinematic"],
  "generationSettings": {
    "Aspect Ratio": "16:9",
    "Motion Score": "5"
  },
  "creationNotes": "Keep motion magnitude at 5 for high-speed tracking.",
  "projectIds": [],
  "featured": false,
  "status": "published",
  "createdAt": "2026-03-20"
}
```

Notice: **No picture or thumbnail field is required!**

### 2. Updating Lessons (`content/lessons.json`)

Edit or add lesson objects referencing `"courseId": "course-youtube-automation"` and the relevant `"moduleId"`. Educational content is formatted in standard Markdown.
