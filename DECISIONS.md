# Decisions

## Drag-and-drop
I used `@hello-pangea/dnd` because it is stable, accessible, and easy to wire
into a column-based layout. It provides good drag feedback and keeps the
implementation concise without custom pointer logic.

## State management
I used React Context for the inquiries store to keep the setup lightweight for
this single-page feature. It supports loading/error state and optimistic updates
for phase changes without adding an external dependency.
If the application grew, I would likely move to Zustand for simpler scaling and
less re-render churn.

## Filters + URL sync
Filters are stored in component state, debounced, and synced to URL params so
they are shareable and survive refreshes. URL sync keeps the app behavior
transparent for reviewers.

## Mock API
Next.js route handlers provide a simple mock backend with a 500ms delay, which
is enough to validate loading states and optimistic updates.

## UI/UX
I leaned into a dark theme with phase-based accents for quick scanning. The
detail modal uses a structured layout so key data is readable on both desktop
and mobile.

## Styling approach
I considered extracting Tailwind classes into CVA-based style modules for
clearer reuse. I chose to keep inline Tailwind here because the project is
small, and the inline styles remain readable without adding extra indirection.

## Component library
I used shadcn components for speed and consistency, with minimal edits to match
the dark theme and layout requirements.

## If I had more time
- Persist data in a real backend or local storage.
- Add tests for filter logic and optimistic updates.
- Use CVA to extract styles into shared modules and further refine component
  styling.
- Improve overall visual polish and responsiveness across breakpoints.
- Move state management to Zustand if the app scope grows.
