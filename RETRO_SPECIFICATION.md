# TechWatching.dev - Retro Specification

**Website URL:** https://techwatching.dev/  
**Specification Date:** January 2025  
**Analysis Tool:** Playwright MCP

---

## Executive Summary

This document provides a comprehensive retro specification of the TechWatching.dev website, a personal website and technical blog created by Alexandre Nédélec, a software developer based in Bordeaux, France. The website serves as a platform for sharing technical articles, information about speaking engagements, and professional background.

---

## Technical Stack

### Framework & Core Technologies
- **Frontend Framework:** Nuxt 3 (Vue.js-based)
- **Content Management:** Nuxt Content
- **UI Framework:** NuxtUI Pro (based on the SaaS template)
- **Styling:** Tailwind CSS
- **Package Manager:** pnpm
- **Deployment Platform:** Netlify
- **Static Site Generation:** Nuxt Generate

### Dependencies (Key)
- `@nuxt/content` - Content management
- `@nuxt/ui-pro` - UI components
- `@nuxt/image` - Image optimization
- `@giscus/vue` - Comment system
- `nuxt-og-image` - Open Graph image generation
- `@nuxtjs/seo` - SEO optimization
- `posthog-js` - Analytics
- Various icon sets (@iconify-json/*)

### Development Tools
- **Linting:** ESLint with Nuxt ESLint config
- **Type Checking:** TypeScript with vue-tsc
- **Build Commands:**
  - `pnpm run dev` - Development server
  - `pnpm run build` - Production build
  - `pnpm run generate` - Static site generation
  - `pnpm run lint` - Code linting
  - `pnpm run typecheck` - Type checking

---

## Site Structure & Pages

### Primary Navigation

The website features a consistent top navigation bar with the following sections:

1. **Home** (`/`)
2. **Blog** (`/posts`)
3. **Speaking** (`/speaking`)
4. **Goodies** (`/goodies`)
5. **About** (`/about`)

Additional features in the header:
- Logo/Brand (Alexandre Nédélec with profile picture)
- Search button
- Dark mode toggle (context-sensitive)

### Page Inventory

#### 1. Homepage (`/`)

**Purpose:** Welcome page and personal introduction

**Main Sections:**
- **Hero Section:**
  - Profile picture
  - Heading: "Hi, I'm Alexandre"
  - Tagline: "Welcome to my personal website"
  - CTAs: "See my blog" and "Check the code" (links to GitHub repo)

- **Who am I? Section:**
  Six cards describing different roles:
  - **Developer:** Links to GitHub, focuses on C# and TypeScript
  - **Blogger:** Links to blog, shares technical knowledge
  - **Teacher:** Links to ENSEIRB-MATMECA, teaches DevOps
  - **Speaker:** Links to speaking page, conference participation
  - **Eternal learner:** Philosophy about continuous learning
  - **Meetup organizer:** Links to Microsoft Tech Group Bordeaux

- **Social Media Section:**
  "You can find me on" with links to:
  - LinkedIn
  - Mastodon
  - Bluesky
  - Hashnode
  - Dev.to
  - GitHub

- **Microsoft MVP Section:**
  - Badge image
  - Recognition details (December 2024, Azure category)
  - Link to MVP profile

- **Puluminary Section:**
  - Badge image
  - Description of Puluminary program
  - Three key principles of IaC:
    - Easy to learn, use, and be productive with
    - Up to date with main cloud providers
    - Secure by default
  - Link to Pulumi community

- **Microsoft Tech Bordeaux Section:**
  - Mascot image (raccoon with cannelé)
  - Description of meetup group
  - Two key aspects:
    - Tech meetups
    - Networking
  - Link to Meetup page

- **Contact Section:**
  - Brief message
  - "Let's talk" CTA linking to contact form

#### 2. Blog Page (`/posts`)

**Purpose:** List all blog articles

**Features:**
- Page heading: "Blog"
- Description: "Here is a list of articles I wrote to share my learnings about Development, Tooling and DevOps."
- Feed options: RSS Feed, Atom Feed buttons
- "See all tags" link
- Header image (fountain pen)

**Article Display:**
- Grid layout of article cards
- Each article card contains:
  - Featured image
  - Category badge (Development, DevOps, Tooling, Tips, Essay)
  - Title
  - Excerpt/description
  - Publication date

**Visible Categories:**
- Development (primary focus)
- DevOps
- Tooling
- Tips (weekly learning posts)
- Essay

**Sample Articles Visible (Most Recent):**
1. "Deploying a Nuxt Static Website on Azure with Pulumi" - Apr 6, 2025
2. ".NET Aspirations - Use ASP.NET Core HTTPS Development Certificate" - Mar 18, 2025
3. "Week 11, 2025 - Tips I learned this week" - Mar 17, 2025
4. ".NET Aspirations - Embracing OpenTelemetry" - Mar 12, 2025
5. "How to Develop an Open Telemetry Plugin for Nuxt" - Mar 9, 2025
6. And many more dating back to 2019

#### 3. Blog Post Detail Pages (`/posts/[slug]`)

**Purpose:** Display individual blog article content

**Structure:**
- **Hero Section:**
  - Featured image (full width)
  - Category badge
  - Publication date
  - Article title (H1)
  - Subtitle/description

- **Content Section:**
  - Article body (markdown-based)
  - Code blocks with syntax highlighting
  - Copy code buttons
  - Inline code formatting
  - Links (internal and external)
  - Collapsible sections (e.g., "Show the code...")
  - Images and diagrams
  - Paragraphs with proper formatting
  - Lists (ordered and unordered)

- **Sidebar (Right):**
  - Table of Contents (when applicable)
  - Tags section with clickable tags
  - Share section with options:
    - Bluesky
    - LinkedIn
    - Reddit
    - Email

- **Footer Section:**
  - Related articles (Previous/Next navigation)
  - Article recommendations

**Example Tags Seen:**
- .NET Aspire
- HTTP
- Nuxt
- .NET
- Security
- Azure
- Pulumi
- TypeScript
- DevOps

#### 4. Speaking Page (`/speaking`)

**Purpose:** Information about public speaking engagements

**Current State:**
- Heading: "Public speaking"
- Status: "Coming soon"
- Note: This page is currently a placeholder

#### 5. Goodies Page (`/goodies`)

**Purpose:** Useful resources and tools

**Features:**
- Page heading: "Goodies"
- Description: "Some things you might find useful."

**Current Content:**
1. **My Git Cheat Sheet** (`/goodies/gitcheatsheet`)
   - Featured image
   - Description: "Another git cheat sheet like you'll find plenty of, but this one doesn't list basic commands. Instead it focuses on explaining which less-known git commands you will need depending on the situation you find yourself in."

#### 6. About Page (`/about`)

**Purpose:** Personal information and website details

**Structure:**
- **Hero Section:**
  - Page title: "About"
  - Description: "A few words about me and this website."
  - Featured image (Place de la Bourse, Bordeaux at night)

- **Content Sections:**

  **Personal Background:**
  - Name: Alexandre Nédélec
  - Location: Bordeaux, France
  - Education: ENSEIRB-MATMECA Engineer School, Computer Sciences
  - Experience: 10+ years
  - Current work: IT consulting company specialized in Microsoft Technologies
  - Focus: .NET and Azure enthusiast, primarily C#
  - Philosophy: Continuous learning

  **About the Blog:**
  - Purpose: Document learning, solutions, workarounds
  - Goal: Share knowledge and help others
  - Content focus: Technical topics of interest

  **Technical Details:**
  - Built using: Nuxt Content and NuxtUI Pro
  - Template: NuxtUI Pro SaaS template
  - Inspiration: Nuxt website and others
  - Previous version: Statiq (static site generator in .NET)
  - Migration reason: Benefit from Vue.js/Nuxt ecosystem

- **Visual Elements:**
  - Profile picture (right side)
  - Scenic Bordeaux image

#### 7. Contact Page (`/contact`)

**Purpose:** Allow visitors to send messages

**Features:**
- Page heading: "Contact"
- Description: "If you have any questions or would like to discuss anything, don't hesitate to drop me a line."

**Form Fields:**
- Name (text input)
- Email (text input)
- Message (textarea)
- Send button

**Form Implementation:**
- Uses submitjson package for form handling
- No visible captcha (but likely spam protection)

#### 8. Tags Pages (`/tags` and `/tags/[tag]`)

**Purpose:** Filter blog posts by topic

**Expected Features:**
- List of all tags
- Tag cloud or list
- Click to filter posts by tag
- Shows count of posts per tag

---

## Common Components & Features

### Header/Navigation
- **Sticky header** that remains visible on scroll
- **Logo area:** Profile picture + "Alexandre Nédélec" text
- **Main navigation links:** Home, Blog, Speaking, Goodies, About
- **Utility buttons:**
  - Search functionality
  - Dark/Light mode toggle
- **Responsive design:** Mobile menu (hamburger) on smaller screens

### Footer
- **Social Media Links:**
  - LinkedIn
  - Mastodon
  - Bluesky
  - Hashnode
  - Dev.to
  - GitHub

- **Repository Link:**
  - "GitHub" link to the source code repository

- **Legal Information:**
  - Disclaimer: "The opinions expressed herein are my own and do not represent those of my employer or any other third-party views in any way."
  - Copyright: "Copyright © 2025 Alexandre Nédélec. All rights reserved."

- **Additional Utilities:**
  - Dark mode toggle (repeated in footer on some pages)

### Theme System
- **Light Mode** (default)
- **Dark Mode** (toggle available)
- Smooth transitions between themes
- Persistent preference (likely stored in localStorage)

### Search Functionality
- Search button in header
- Likely indexes:
  - Blog post titles
  - Blog post content
  - Page titles
  - Page content

### Image Optimization
- Using `@nuxt/image` module
- Netlify image transformation
- Responsive images with srcset
- Lazy loading

### SEO Features
- Open Graph meta tags
- Twitter Card support
- Structured data (likely)
- Sitemap generation
- RSS/Atom feeds
- Proper heading hierarchy
- Semantic HTML

### Analytics & Tracking
- PostHog integration for analytics
- Privacy-conscious implementation

### Comment System
- Giscus integration (GitHub Discussions-based comments)
- Available on blog posts

---

## Content Organization

### Blog Categories

1. **Development**
   - Focus: Programming, frameworks, languages
   - Topics: .NET, C#, TypeScript, Vue.js, Nuxt, ASP.NET Core
   - Examples: Azure SDK usage, .NET features, framework integration

2. **DevOps**
   - Focus: Infrastructure, deployment, automation
   - Topics: Pulumi, Terraform, Azure, GitHub Actions, CI/CD
   - Examples: IaC, cloud provisioning, deployment automation

3. **Tooling**
   - Focus: Developer tools and productivity
   - Topics: CLI tools, IDEs, API clients, package managers
   - Examples: Azure CLI, winget, pnpm, HTTP clients

4. **Tips**
   - Focus: Weekly learning summaries
   - Format: "Week X, YYYY - Tips I learned this week"
   - Content: Quick tips and discoveries

5. **Essay**
   - Focus: Reflective and opinion pieces
   - Topics: Developer experience, career thoughts, retrospectives
   - Examples: Annual retrospectives, technology watch, DevOps philosophy

### Content Features

**Code Blocks:**
- Syntax highlighting
- File name labels
- Line numbers (when appropriate)
- Copy to clipboard button
- Language-specific formatting
- Support for: TypeScript, C#, JavaScript, PowerShell, Bash, YAML, etc.

**Markdown Support:**
- Standard markdown formatting
- Extended features via @nuxtjs/mdc
- Custom components
- Collapsible sections
- Definition lists
- Tables
- Task lists

**Images:**
- Featured images for each post
- In-article images and diagrams
- Proper alt text
- Responsive sizing
- Netlify image optimization

**Links:**
- Internal navigation
- External resources
- Proper styling (underlined, distinct color)
- Opens external links appropriately

---

## User Flows

### Primary User Journeys

#### 1. Discovering Content
```
Homepage → Blog → Article Details → Related Articles
```
- User lands on homepage
- Reads about Alexandre
- Clicks "See my blog"
- Browses article list
- Clicks article of interest
- Reads article
- Explores related articles or tags

#### 2. Finding Specific Topics
```
Blog → Tags → Filtered Posts → Article
```
- User navigates to blog
- Clicks "See all tags"
- Selects topic of interest
- Views filtered posts
- Reads relevant articles

#### 3. Making Contact
```
Homepage → Contact → Form Submission
```
- User wants to reach out
- Clicks "Let's talk" or navigates to Contact
- Fills out form
- Submits message

#### 4. Exploring Developer Identity
```
Homepage → Sections → External Links
```
- User reads "Who am I?" section
- Explores different roles
- Clicks through to:
  - GitHub profile
  - ENSEIRB-MATMECA
  - Microsoft Tech Group
  - MVP profile
  - Pulumi community

#### 5. Checking Resources
```
Homepage → Goodies → Resource Details
```
- User looks for tools/resources
- Navigates to Goodies
- Accesses Git Cheat Sheet or other resources

---

## Design System

### Color Palette
- **Primary colors:** Likely blues/teals (based on Nuxt UI Pro)
- **Accent colors:** For CTAs and highlights
- **Neutral colors:** Grays for text and backgrounds
- **Dark mode palette:** Inverted with careful contrast

### Typography
- **Font loading:** Via @nuxt/fonts module
- **Heading hierarchy:** H1-H6 properly structured
- **Body text:** Readable size and line height
- **Code font:** Monospace for code blocks
- **Responsive sizing:** Fluid typography

### Spacing & Layout
- **Consistent spacing:** Using Tailwind spacing scale
- **Responsive grid:** Adapts to screen sizes
- **Container widths:** Max-width for readability
- **Card-based layout:** For article lists and sections
- **Whitespace:** Generous padding and margins

### Components
- **Buttons:** Primary, secondary, ghost variants
- **Cards:** Article cards, feature cards
- **Badges:** Category/tag badges
- **Forms:** Inputs, textareas, buttons
- **Navigation:** Menu, breadcrumbs (where applicable)
- **Icons:** From multiple icon sets via Iconify

### Responsive Design
- **Mobile-first approach**
- **Breakpoints:** Following Tailwind defaults
- **Hamburger menu:** For mobile navigation
- **Touch-friendly:** Tap targets appropriately sized
- **Optimized images:** Per viewport size

---

## External Integrations

### Social Media Platforms
1. **LinkedIn:** Professional profile and sharing
2. **Mastodon:** @techwatching on mas.to
3. **Bluesky:** techwatching.bsky.social
4. **Hashnode:** techwatching.hashnode.dev
5. **Dev.to:** @techwatching
6. **GitHub:** TechWatching (personal and organization)

### Developer Platforms
1. **Microsoft MVP:** Profile link
2. **Pulumi Puluminaries:** Community membership
3. **Meetup:** Microsoft Tech Group Bordeaux

### Content Syndication
1. **RSS Feed:** `/feed.rss`
2. **Atom Feed:** `/feed.atom`
3. **Cross-posting:** To Hashnode and Dev.to

### Comments
- **Giscus:** GitHub Discussions-based commenting
- Requires GitHub account to comment
- Threaded discussions
- Reactions support

---

## Performance Considerations

### Optimization Techniques
1. **Static Site Generation:** Pre-rendered pages for fast loading
2. **Image Optimization:** Via Netlify and @nuxt/image
3. **Code Splitting:** Automatic with Nuxt
4. **Lazy Loading:** Images and components
5. **CDN Delivery:** Via Netlify
6. **Caching:** Aggressive caching strategies

### Build Process
- **Generation:** Static files via `nuxt generate`
- **Deployment:** Automated via Netlify (or similar)
- **Redirects:** Configured via `_redirects` file
- **Netlify Config:** `netlify.toml` for build settings

---

## Security & Privacy

### Certificate Management
- **HTTPS:** Enforced via Netlify
- **Development Certificates:** ASP.NET Core dev certs for local HTTPS

### Privacy Considerations
- **Analytics:** PostHog for privacy-conscious tracking
- **Comments:** External (Giscus) - users control their data
- **Forms:** Handled via submitjson
- **Cookies:** Minimal usage (theme preference, analytics consent)

### Content Security
- **Copyright:** Clearly stated (MIT for code, CC-BY-SA-4.0 for content)
- **License Files:** CC-BY-SA-4.0, LICENSE files in repo
- **Attribution:** For images from Unsplash

---

## Accessibility

### WCAG Compliance Considerations
- **Semantic HTML:** Proper use of headings, landmarks
- **Alt Text:** For images
- **Keyboard Navigation:** Full site navigable via keyboard
- **Focus Indicators:** Visible focus states
- **Color Contrast:** Sufficient contrast ratios
- **Screen Reader Support:** ARIA labels where needed
- **Responsive Text:** Scalable fonts

---

## Content Strategy

### Publishing Frequency
- **Regular Articles:** Technical deep-dives
- **Weekly Tips:** "Tips I learned this week" series
- **Annual Retrospectives:** Year-end reviews
- **Occasional Essays:** Reflective pieces

### Topics Covered
1. **.NET Ecosystem:** C#, ASP.NET Core, Azure Functions
2. **Infrastructure as Code:** Pulumi (heavily featured), some Terraform
3. **Frontend Development:** Nuxt, Vue.js, TypeScript
4. **DevOps Practices:** CI/CD, automation, Azure DevOps, GitHub Actions
5. **Developer Tooling:** CLI tools, IDEs, package managers
6. **Cloud Platforms:** Primarily Microsoft Azure
7. **Open Source:** Contributing, tools, community

### Writing Style
- **Educational:** Clear explanations with examples
- **Practical:** Real-world scenarios and solutions
- **Code-Heavy:** Lots of code samples
- **Personal:** First-person perspective, shares learning journey
- **Encouraging:** Promotes continuous learning

---

## Maintenance & Updates

### Content Management
- **Markdown Files:** In `content/` directory
- **File Structure:** Organized by type (posts, pages)
- **Numbering System:** Posts numbered (e.g., `1.posts/73.aspire-devcert.md`)
- **Metadata:** YAML frontmatter for post details

### Version Control
- **Repository:** GitHub (TechWatching/techwatching.dev)
- **Branches:** Main branch for production
- **Public Repository:** Open source for transparency
- **Commit History:** Available for reference

### Dependency Management
- **Package Manager:** pnpm with lockfile
- **Renovate:** Automated dependency updates (`renovate.json`)
- **Specific Versions:** Pinned major versions for stability

---

## Future Considerations

### Planned Features (Based on Current State)
1. **Speaking Page:** Currently placeholder - content coming soon
2. **Additional Goodies:** More resources beyond Git cheat sheet
3. **Continuous Improvements:** Regular updates to design and features

### Potential Enhancements
1. **Newsletter:** Email subscription for new posts
2. **Series/Collections:** Grouping related articles
3. **Advanced Search:** Filtering, sorting options
4. **Reading Time:** Estimated time to read articles
5. **Code Playground:** Interactive code examples
6. **Translations:** Multi-language support

---

## Technical Notes

### Repository Structure
```
/
├── .devcontainer/       # Dev container configuration
├── .git/                # Git repository
├── components/          # Vue components
├── content/             # Markdown content
│   ├── 0.index.yml      # Homepage content
│   ├── 1.posts/         # Blog posts
│   ├── 2.speaking/      # Speaking content
│   ├── 3.goodies/       # Resources
│   └── about.md         # About page
├── layouts/             # Nuxt layouts
├── pages/               # Nuxt pages
│   ├── about.vue
│   ├── contact.vue
│   ├── index.vue
│   ├── posts.vue
│   ├── goodies/
│   ├── posts/
│   ├── speaking/
│   └── tags/
├── plugins/             # Nuxt plugins
├── public/              # Static assets
├── server/              # Server middleware
├── types/               # TypeScript types
├── utils/               # Utility functions
├── app.config.ts        # App configuration
├── app.vue              # Root component
├── eslint.config.mjs    # ESLint config
├── netlify.toml         # Netlify config
├── nuxt.config.ts       # Nuxt configuration
├── package.json         # Dependencies
├── pnpm-lock.yaml       # Lock file
├── tailwind.config.ts   # Tailwind config
└── tsconfig.json        # TypeScript config
```

### Key Configuration Files

**nuxt.config.ts:**
- Module registration
- SEO configuration
- Content settings
- UI Pro setup
- Image optimization
- OG image generation

**app.config.ts:**
- Theme configuration
- UI customization

**package.json:**
- Scripts for development and build
- Dependencies management
- pnpm configuration

---

## Screenshots

### Homepage
![Homepage Screenshot](https://github.com/user-attachments/assets/00787b33-4427-47f8-9abe-c42aa95481fc)
*The homepage showcasing Alexandre's profile, roles, achievements, and community involvement*

### Blog Page
![Blog Page Screenshot](https://github.com/user-attachments/assets/6b94079e-7774-4d18-8c53-310ed5ab54e4)
*The blog page displaying a grid of technical articles with featured images and metadata*

---

## Conclusion

TechWatching.dev is a well-architected personal website and technical blog that demonstrates modern web development practices. Built with Nuxt 3 and leveraging the power of the Vue.js ecosystem, it provides an excellent platform for sharing technical knowledge, particularly around .NET, Azure, DevOps, and Infrastructure as Code.

### Key Strengths:
1. **Clean, Modern Design:** Professional appearance with good UX
2. **Technical Excellence:** Modern stack, good performance, proper SEO
3. **Rich Content:** Extensive library of high-quality technical articles
4. **Open Source:** Transparent development, available for learning
5. **Community Focus:** Active in developer communities and sharing knowledge
6. **Continuous Evolution:** Regular updates and improvements

### Target Audience:
- .NET developers
- Azure cloud practitioners
- DevOps engineers
- Infrastructure as Code enthusiasts
- Web developers interested in Nuxt/Vue.js
- Developers interested in continuous learning

### Overall Assessment:
The website successfully serves its purpose as both a personal portfolio and a valuable technical resource for the developer community. It reflects the author's expertise and commitment to sharing knowledge while maintaining a professional and approachable presence online.

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Created by:** Automated analysis using Playwright MCP  
**Repository:** https://github.com/TechWatching/techwatching.dev
