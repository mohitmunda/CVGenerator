# Professional CV Generator — v6

A browser-based A4 CV/resume generator designed around a clean professional reference layout, with multiple layouts, icons, custom fields, live preview and PDF printing.

## What's new in v6

- **Section arranger:** drag sections into any order or use the ↑ / ↓ controls.
- Section order is saved in the CV JSON and browser local storage.
- **Reset Order** returns to the reference order.
- Custom sections can also be arranged.
- Existing professional SVG icons and multiple layout options are retained.
- Additional options remain available inside individual sections, experience entries and education entries.

## Default section order

1. Personal Information
2. Skills & Interests
3. Experience
4. Educational Details
5. Professional Summary
6. Projects
7. Certifications & Training
8. Achievements

The default layout remains the reference-style A4 design.

## Run

No server or build process is required. Open `index.html` in a modern browser.

For GitHub Pages, upload the files to a repository and enable Pages for the repository branch/folder containing `index.html`.

## Data privacy

The included demo information is fictional. Replace it with your own information locally. Do not commit private CV data, photos, phone numbers, email addresses or other sensitive information to a public repository.

## License

See `LICENSE`.


## Version 7 — Professional Layouts
The generator now includes 8 selectable layouts. **Reference Pro** is the default and is designed to stay closest to the supplied reference CV while giving it a more polished professional finish. Other layouts include Classic, Modern Two Column, Executive Split, Professional Sidebar, Minimal Clean, Elegant Editorial, and Corporate ATS.

The layout can be changed from the layout selector or the visual layout gallery. The selected layout is remembered in the browser.


## Version 8 — Professional Tools
Added an optional professional tools panel with:
- A4 auto-fit/compact controls
- Draft watermark
- Page numbers
- Print background preference
- Browser-saved settings
- CV duplication in local browser storage
- Standalone HTML export
- Privacy checklist for public GitHub demos

These tools work client-side; no CV data is sent to a server by this package.


## Version 9 — Expanded Fonts
Added a larger professional font library and a visual font picker. Choices include Arial, Helvetica, Calibri, Aptos, Inter, Roboto, Open Sans, Lato, Montserrat, Poppins, Raleway, Nunito Sans, Source Sans 3, Merriweather, Georgia, Times New Roman, Garamond, Trebuchet MS, Verdana and Tahoma.

Font selection is stored locally in the browser and can be changed independently of the CV layout.


## Version 10 — Layout & Section Fixes
- Fixed Modern layout page alignment using bounded A4 flex/grid geometry.
- Fixed Sidebar layout so its accent/sidebar stays inside the printable A4 page.
- Reworked Custom Sections so only the entered title, content and optional additional detail are rendered in the CV preview; editor controls/text no longer leak into the CV.
- Added Nationality to Personal Information.
- Added a dedicated Career Objective section with optional additional detail.


## Version 11 — Final Fix Pass
- Nationality is now explicitly included in the Personal Information editor and preview.
- Replaced the previous custom-section renderer with an isolated renderer that updates only its dedicated preview container, preventing continuous/recursive text generation.
- Custom sections now render only their title, content and optional additional detail.
- Sidebar layout was rebuilt with fixed A4 geometry, bounded content widths, predictable sidebar dimensions, and safer text wrapping.


## Version 12 — Sidebar & Final Sections
- Removed the Custom Section option and its preview renderer.
- Added Nationality directly below Languages Spoken in Personal Information.
- Added a Declaration section that is always the final CV section.
- Declaration supports text, place, date, and signature/name.
- Rebuilt Sidebar layout using a fixed A4 content box and stable inner padding so text remains aligned and inside the printable page.


## Version 13 — Final Layout Update
- Removed Sidebar Layout from the available layout choices.
- Nationality is now explicitly visible directly below Languages Spoken in Personal Information.
- Declaration is forced to the final CV position and pushed toward the bottom of the A4 page.
- Declaration remains print/PDF friendly.
