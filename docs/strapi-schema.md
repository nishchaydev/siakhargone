# Strapi Content Models & Configuration

## 1. Content Types

### Homepage (Single Type)
- **hero** (Component)
  - `title` (Text)
  - `subtitle` (Text)
  - `sanskrit` (Text)
  - `video` (Media: Video)
  - `grid` (Media: Images, Multiple)
  - `cta1Href` (Text)
  - `cta2Href` (Text)
- **stats** (Component, Repeatable)
  - `label` (Text)
  - `value` (Text)
- **whyChoose** (Component, Repeatable)
  - `title` (Text)
  - `desc` (Rich Text / Text)
  - `icon` (Text / Enumeration)

### Pages (Collection Type)
- `slug` (UID)
- `title` (Text)
- **sections** (Dynamic Zone)
  - `textBlock`
  - `hero`
  - `gallery`
  - `cta`

### Gallery (Collection Type)
- `title` (Text)
- `images` (Media: Images, Multiple)
- `category` (Text / Enumeration)
- `caption` (Text)

### Notices (Collection Type)
- `title` (Text)
- `date` (Date/Time)
- `content` (Rich Text)
- `attachments` (Media: Files, Multiple)

### Faculty (Collection Type)
- `name` (Text)
- `designation` (Text)
- `bio` (Text / Rich Text)
- `photo` (Media: Image)
- `subjects` (Text)

### Admissions (Single Type)
- **processSteps** (Component, Repeatable)
  - `stepName`
  - `description`
- `prospectus` (Media: File)
- `feesPdf` (Media: File)
- **faqs** (Component, Repeatable)
  - `question`
  - `answer`

### Testimonials (Collection Type)
- `name` (Text)
- `relation` (Text)
- `photo` (Media: Image)
- `text` (Text / Long Text)
- `rating` (Number: 1-5)
- `video` (Media: Video, Optional)

## 2. Configuration Requirements
- **Media Library**: Must be enabled.
- **API Roles**: Public role must have `find` and `findOne` access for all above endpoints.
- **Security**: Implement CORS in `config/middleware.js` when deploying.
