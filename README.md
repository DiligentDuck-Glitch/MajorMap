# MajorMap

Arabic degree-planning map for the PAAET College of Basic Education Computer
Teacher program. MajorMap helps students read their completed courses, explore
prerequisites, plan future semesters, and visualize the path to graduation.

## Current beta features

- Interactive 134-credit course map with prerequisite and co-requisite paths.
- Arabic-first interface with English UI toggle and dark mode.
- Client-side transcript image reading with Tesseract.js.
- Course completion tracking stored only in the browser's local storage.
- Flexible semester planning, summer terms, and prerequisite-safe drag and drop.
- Semester eligibility preview: select a future semester header to see which
  courses are available (green) or still blocked by prerequisites (red).
- Weekly schedule workspace for selected sections.

## Current limitation

Banner section availability is temporarily disabled while the Banner integration
is unavailable and being prepared for a verified cached-data workflow. The map,
planning, and transcript features remain usable without it.

## Privacy

Transcript images are processed in the browser. MajorMap has no accounts,
analytics, or remote storage for student progress; progress is saved in the
browser's local storage.

## Run locally

Serve this folder with a simple static server, then open `index.html`:

```powershell
python -m http.server 8000
```

Visit `http://localhost:8000`.

## Technology

Plain HTML, CSS, and JavaScript. OCR uses Tesseract.js loaded from jsDelivr and
Arabic fonts are loaded from Google Fonts.

## Status

Public beta. Course-section data will be added after the PAAET Banner workflow
is available for end-to-end testing.
