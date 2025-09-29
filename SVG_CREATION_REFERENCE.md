# SVG Creation Reference for Team Member Icons

## Method for Creating Team Member SVG Icons

When creating new team member SVG icons, use this template structure:

```xml
<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-[name]" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:[color1];stop-opacity:1" />
      <stop offset="100%" style="stop-color:[color2];stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="40" cy="40" r="39" fill="url(#grad-[name])" stroke="#fff" stroke-width="2"/>
  <text x="40" y="40" font-family="Arial, sans-serif" font-size="32" font-weight="bold"
        text-anchor="middle" dominant-baseline="central" fill="#333">[INITIAL]</text>
</svg>
```

## Color Schemes Used

### Brand-Appropriate Gradient Colors:
- **Pink/Rose Theme**: `#FFF0F5` to `#F4ADB8` (Helen)
- **Peach Theme**: `#FFF8E7` to `#FFCBB6` (Sandy)
- **Lavender Theme**: `#F3E5F5` to `#E1BEE7` (Fiona)

### Steps:
1. Replace `[name]` with lowercase team member name
2. Replace `[color1]` and `[color2]` with gradient colors
3. Replace `[INITIAL]` with first letter of team member's name
4. Save as `/public/images/team/[location]/[name].svg`

## Example Implementation:
```xml
<!-- Helen's SVG -->
<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-helen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFF0F5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#F4ADB8;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="40" cy="40" r="39" fill="url(#grad-helen)" stroke="#fff" stroke-width="2"/>
  <text x="40" y="40" font-family="Arial, sans-serif" font-size="32" font-weight="bold"
        text-anchor="middle" dominant-baseline="central" fill="#333">H</text>
</svg>
```

## Files Created:
- `/public/images/team/tustin/helen.svg`
- `/public/images/team/tustin/sandy.svg`
- Fixed: `/public/images/team/irvine/fiona.svg` (removed corrupted EOF text)

## Notes:
- Each gradient should have a unique ID to avoid conflicts
- Use brand colors that match the salon's aesthetic
- Ensure accessibility with good contrast between text and background
- SVG files are lightweight and scalable for all screen sizes