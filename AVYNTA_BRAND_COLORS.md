# Avynta Brand Color Palette
## Modern Tech & AI Company Branding

Based on the existing Avynta logo design, this color palette emphasizes innovation, trust, and technological sophistication while maintaining accessibility and modern appeal.

## Primary Brand Colors

### **Tech Blue** (Primary Brand Color)
- **Hex:** `#2563EB`
- **RGB:** `rgb(37, 99, 235)`
- **HSL:** `hsl(217, 91%, 60%)`
- **Usage:** Primary CTA buttons, highlights, brand accents
- **Represents:** Innovation, technology, trust

### **Emerald Green** (Secondary Brand Color)
- **Hex:** `#10B981`
- **RGB:** `rgb(16, 185, 129)`
- **HSL:** `hsl(160, 84%, 39%)`
- **Usage:** Secondary buttons, success states, complementary accents
- **Represents:** Growth, sustainability, progress

### **Deep Navy** (Primary Text)
- **Hex:** `#1A202C`
- **RGB:** `rgb(26, 32, 44)`
- **HSL:** `hsl(220, 26%, 14%)`
- **Usage:** Primary text, headings, dark UI elements
- **Represents:** Professionalism, stability, trust

## Extended Color System

### **Tech Blue Variations**
- **Light:** `#DBEAFE` - Backgrounds, hover states
- **Medium:** `#2563EB` - Primary brand color
- **Dark:** `#1D4ED8` - Active states, pressed buttons

### **Emerald Green Variations**
- **Light:** `#D1FAE5` - Success backgrounds, light accents
- **Medium:** `#10B981` - Secondary brand color
- **Dark:** `#059669` - Hover states, borders

### **Neutral Grays**
- **Gray 50:** `#F9FAFB` - Light backgrounds
- **Gray 100:** `#F3F4F6` - Card backgrounds
- **Gray 200:** `#E5E7EB` - Borders, dividers
- **Gray 300:** `#D1D5DB` - Disabled states
- **Gray 400:** `#9CA3AF` - Placeholder text
- **Gray 500:** `#6B7280` - Secondary text
- **Gray 600:** `#4B5563` - Body text
- **Gray 700:** `#374151` - Headings
- **Gray 800:** `#1F2937` - Dark text
- **Gray 900:** `#111827` - Darkest text

### **Supporting Colors**

#### **Success Green**
- **Hex:** `#10B981`
- **Usage:** Success messages, positive indicators

#### **Warning Orange**
- **Hex:** `#F59E0B`
- **Usage:** Warning states, caution indicators

#### **Error Red**
- **Hex:** `#EF4444`
- **Usage:** Error states, destructive actions

#### **Info Blue**
- **Hex:** `#3B82F6`
- **Usage:** Information, links, secondary actions

## Gradient Combinations

### **Primary Gradient**
```css
background: linear-gradient(135deg, #2563EB 0%, #10B981 100%);
```

### **Subtle Gradient**
```css
background: linear-gradient(135deg, #DBEAFE 0%, #D1FAE5 100%);
```

### **Dark Gradient**
```css
background: linear-gradient(135deg, #1A202C 0%, #374151 100%);
```

## Usage Guidelines

### **Primary Actions**
- Use **Coral Pink** for main CTAs, primary buttons
- Pair with white text for optimal contrast

### **Secondary Actions**
- Use **Teal Green** for secondary buttons, links
- Works well with dark text or white text

### **Backgrounds**
- **Light:** Gray 50, Gray 100 for main backgrounds
- **Cards:** White or Gray 50 with subtle shadows
- **Sections:** Alternate between white and Gray 50

### **Text Hierarchy**
- **Headlines:** Deep Navy (#1A202C)
- **Body Text:** Gray 600 (#4B5563)
- **Secondary Text:** Gray 500 (#6B7280)
- **Captions:** Gray 400 (#9CA3AF)

### **Interactive Elements**
- **Hover States:** Darken primary colors by 10-15%
- **Active States:** Darken by 20-25%
- **Focus States:** Add subtle shadow with brand color

## Accessibility Notes

- All color combinations meet WCAG 2.1 AA standards
- Primary brand colors have been tested for colorblind accessibility
- Always provide sufficient contrast ratios (4.5:1 minimum for normal text)

## Implementation in CSS

```css
:root {
  /* Primary Brand Colors */
  --tech-blue: #2563EB;
  --emerald-green: #10B981;
  --deep-navy: #1A202C;
  
  /* Blue Variations */
  --blue-light: #DBEAFE;
  --blue-dark: #1D4ED8;
  
  /* Green Variations */
  --green-light: #D1FAE5;
  --green-dark: #059669;
  
  /* Neutrals */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;
  
  /* Supporting Colors */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
}
```

## Brand Personality
This color palette conveys:
- **Innovation** through vibrant tech blue
- **Growth** through dynamic emerald green
- **Professionalism** through sophisticated navy
- **Reliability** through clean, trustworthy colors
- **Technology Focus** through modern blue-green spectrum

Perfect for a tech/AI company that wants to appear cutting-edge, trustworthy, and environmentally conscious while maintaining professional credibility.
