# Avynta Website Translation System

## Overview
The Avynta website now uses a modular translation system with individual locale files and flexible HTML tag support for easy translation management.

## File Structure
```
avynta/
├── locales/
│   ├── en.json    # English translations
│   ├── es.json    # Spanish translations
│   └── pt.json    # Portuguese translations
├── languages.js   # Translation manager
└── index.html     # Main website
```

## Translation Methods

### 1. Using `<t>` Tags (Recommended)
```html
<t key="nav.home">Home</t>
<t key="hero.title">Transform Your Business with</t>
<t key="hero.titleHighlight">AI & Automation</t>
```

### 2. Using `data-t` Attribute
```html
<span data-t="solutions.title">Real</span>
<button data-t="hero.cta">Start Your Transformation</button>
<p data-t="hero.subtitle">We specialize in...</p>
```

### 3. Using `data-translate` Attribute (Legacy)
```html
<h1 data-translate="hero.title">Transform Your Business</h1>
<p data-translate="hero.subtitle">We specialize in...</p>
```

### 4. Form Elements
```html
<!-- For placeholders -->
<input type="text" data-t="contact.form.name" placeholder="Full Name">
<textarea data-t="contact.form.message" placeholder="Message"></textarea>

<!-- For button text -->
<button data-t="contact.form.submit">Send Message</button>
```

## Translation Keys Structure
Translation keys use dot notation to access nested objects:

```json
{
  "nav": {
    "home": "Home",
    "solutions": "Solutions"
  },
  "hero": {
    "title": "Transform Your Business with",
    "titleHighlight": "AI & Automation"
  },
  "contact": {
    "form": {
      "name": "Full Name",
      "email": "Email Address"
    }
  }
}
```

## Adding New Languages

1. Create a new JSON file in the `locales/` folder (e.g., `fr.json`)
2. Add the language code to the `availableLanguages` array in `languages.js`
3. Follow the same structure as existing locale files

## Features

- **Automatic Detection**: Scans for translation elements on page load
- **Persistent Language**: Saves user's language preference in localStorage
- **Dynamic Loading**: Loads translation files asynchronously
- **Fallback Support**: Falls back to English if translation fails
- **Form Support**: Handles placeholders and button text automatically
- **Flexible Tags**: Supports multiple HTML attributes and custom tags

## Usage Examples

See `translation-example.html` for comprehensive examples of all translation methods.
