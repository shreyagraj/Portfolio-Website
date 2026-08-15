# Shreya Gangaraj Portfolio

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build
```

## Usage

Every prop is optional and merges over the defaults, so you can override one
field and inherit the rest:

```tsx
<RingCarousel
  background="#0a0a0a"
  interaction={{ autoRotate: true, autoSpeed: 6 }}
  titleBar={{ barFill: '#111111', titleColor: '#ffffff' }}
/>
```

### Prop groups

| Group | Controls |
| --- | --- |
| `items` | Per-item media (image or video), poster, alt, title, link |
| `ringGeometry` | `radius`, `ellipseHeight`, `perspective`, `itemWidth`, `aspect`, `visibleArc` |
| `itemAppearance` | `frontScale`, `sideScale`, `minOpacity`, `sideBlur`, `itemRadius`, `faceAmount` |
| `centerPreviewSettings` | Preview size, aspect, radius, shadow, click-through, `frontHandoff`, `fadeDuration` |
| `interaction` | `dragSense`, `dragFriction`, `snap`, `snapStrength`, `wheelStrength`, `autoRotate`, `autoSpeed` |
| `mouseTiltSettings` | `mouseTilt`, `tiltX`, `tiltY`, `tiltShift`, `tiltShiftY`, `tiltSmooth` |
| `titleBar` / `caseButton` | Typography, colours, padding, hover states, visibility |
| `responsive` | `enabled`, `referenceWidth`, `minScale`, plus the `mobile*` props |

## How the depth effect works

Each item is rendered **twice** — once in a back layer (`z-index: 0`) and once
in a front layer (`z-index: 2`) — with the centre preview sandwiched between
them at `z-index: 1`. A smoothstep on the item's cosine depth crossfades
opacity between the two copies, so items appear to pass in front of and behind
the preview without a real 3D compositing context.

The cost is 2× the DOM nodes. With more than ~24 items, consider windowing.

## Changes from the Framer original

**Required, to run outside Framer**

- Removed the `framer` SDK import. `RenderTarget` / `useIsStaticRenderer` are
  replaced by a local SSR check; `addPropertyControls` is dropped, since the
  property panel only exists inside the Framer editor.
- Public props are deeply partial. Framer always supplied every field from the
  panel; a React caller wants to override one. The component already merged
  against defaults internally, so this only aligns the type with the runtime.

**Bug fixes**

- **Wheel scrolling.** The original used React's `onWheel`, which registers
  passively, so its `preventDefault()` silently failed and the page scrolled
  while the ring spun. Now a native listener with `{ passive: false }`.
- **Placeholder detection.** `isUnsetItemText` regex-matched titles like
  `/^project( \d+)?$/i` to guess whether a field was customised, so an item
  legitimately titled "Project 3" had its title overwritten with a default
  name. Only absence is now treated as unset.
- **Keyboard access.** Ring items are `pointer-events: none` and only the
  centre preview was focusable, so the carousel could not be operated without
  a pointer (WCAG 2.1.1). The stage is now focusable and arrow keys rotate it.

## Known limitations

- Ring items always render the poster image; only the centre preview plays
  video. This is deliberate — a dozen simultaneous autoplaying videos is
  expensive — but the per-item `media.type` prop implies otherwise.
- Default images are hosted on `framerusercontent.com`. Replace them with your
  own assets before shipping.
