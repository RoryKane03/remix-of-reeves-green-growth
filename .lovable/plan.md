# Remove three images from the Our Work → Tree Work gallery

## Goal
Delete three photos from the Tree Work photo gallery on the "Our Work" page so they no longer display.

## Images to remove (matched by their alt text in `src/components/gallery/ImageGallery.tsx`)

1. **ID 2020** — "Reeves arborist in orange PPE using a chainsaw at the top of a large tree during aerial dismantle, sawdust spraying against a blue sky" (`tree-work-dismantle-chainsaw-spray`)
2. **ID 2023** — "Nighttime tree dismantle operation with a green ABA Cranes mobile crane lifting an arborist in a MEWP basket, crew in orange PPE managing the roadside site" (`tree-work-night-crane-operation`)
3. **ID 2021** — "Aerial view of Reeves tree surgeon climbing and dismantling a tall tree above dense scrubland beside residential housing in the West Midlands" (`tree-work-aerial-climber-oak`)

## Changes

**`src/components/gallery/ImageGallery.tsx`**
- Remove the three gallery objects listed above from the `tree-work` entries.
- Remove the now-unused imports at the top of the file:
  - `import treeWorkDismantleChainsawSpray from '@/assets/tree-work-dismantle-chainsaw-spray.jpeg.asset.json';`
  - `import treeWorkAerialClimberOak from '@/assets/tree-work-aerial-climber-oak.jpeg.asset.json';`

No other files change. The photos stay in storage; only their gallery entries are removed.

## Notes
- Only these three entries are removed — all other tree-work, hedge-cutting, stump-grinding, and site-clearance photos remain untouched.
- This is the same gallery file edited in prior requests, so no new components are introduced.
