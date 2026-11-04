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
Crops retain the original camera angle. The carousel lives in
`src/components/ui/polaroid-line-carousel.tsx` with scoped CSS beside it; homepage
integration is in `src/components/sections/photo-gallery.tsx`.
