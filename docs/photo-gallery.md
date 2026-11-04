# Hackathon photo gallery

The homepage displays a looping Polaroid photo strip below the hero. Drag, swipe,
click a neighboring print, scroll horizontally, or use the left/right arrow keys
to browse. Autoplay pauses on hover or keyboard focus and stays off when reduced
motion is enabled. TBC logo mounts sit on a curved rope; the gallery has no visible
navigation buttons or surrounding headings. The arrow icon opens the full Picdrop
album in a new tab.

Edit photo order, handwritten captions, alt text, and the album URL in
`src/content/photos.ts`. The 17 square WebP crops in
`public/images/hackathon-2026` come from the supplied TBC Hackathon Pics folder.
Crops retain the original camera angle. Five portrait images (L1010947,
L1020605, L1020176, L1020188, L1020319) use high-resolution previews from the
linked Picdrop album because the supplied local JPEGs had already been stretched
into landscape dimensions. Crop the correctly proportioned originals to a square;
never stretch a portrait to fill the frame. The carousel lives in
`src/components/ui/polaroid-line-carousel.tsx` with scoped CSS beside it; homepage
integration is in `src/components/sections/photo-gallery.tsx`.

The hero box retains its original date and location layout and links to the same
full album with a "View all photos" primary action, opening in a new tab. Hero text lives in
`src/content/home.ts`; the album URL remains in `src/content/photos.ts`.

Link directly to `/photos` for a dedicated page displaying the same gallery.
The homepage section also remains available at `/#photos`.

The shared gallery displays the "See you next year" thank-you banner above the
Polaroids on both the homepage and `/photos`.
