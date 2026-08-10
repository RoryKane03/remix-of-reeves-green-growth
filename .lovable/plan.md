# Remove two images from the Our Work → Tree Work gallery

## Goal
Delete two photos from the Tree Work photo gallery on the "Our Work" page so they no longer display. Keep ID 2023 (the ABA Cranes nighttime operation) — only the two listed below are removed.

## Images to remove (matched by their alt text in `src/components/gallery/ImageGallery.tsx`)

1. **ID 2020** — "Reeves arborist in orange PPE using a chainsaw at the top of a large tree during aerial dismantle, sawdust spraying against a blue sky" (`tree-work-dismantle-chainsaw-spray`)
2. **ID 2021** — "Aerial view of Reeves tree surgeon climbing and dismantling a tall tree above dense scrubland beside residential housing in the West Midlands" (`tree-work-aerial-climber-oak`)

## Changes

**`src/components/gallery/ImageGallery.tsx`**
- Remove the two gallery objects above from the `tree-work` entries.
- Remove the now-unused imports at the top of the file:
  - `import treeWorkDismantleChainsawSpray from '@/assets/tree-work-dismantle-chainsaw-spray.jpeg.asset.json';`
  - `import treeWorkAerialClimberOak from '@/assets/tree-work-aerial-climber-oak.jpeg.asset.json';`

No other files change. The photos stay in storage; only their gallery entries are removed.

## Notes
- ID 2023 (nighttime ABA Cranes tree dismantle operation) is KEPT.
- Only these two entries are removed — all other tree-work, hedge-cutting, stump-grinding, and site-clearance photos remain untouched.
