# Screenshots

Real screenshots of work we have actually delivered. Each file is rendered by
`components/SiteScreenshot.tsx` inside the same browser chrome the abstract
wireframes use.

Required files, all **1600 x 1000** (2x for retina, so they display at 800 x 500):

| File | Used on |
|---|---|
| `websites.png` | Homepage "Websites" card, `/services/web-design` hero |
| `marketing.png` | Homepage "Marketing and SEO" card, `/marketing` hero |
| `software.png` | Homepage "Software and automation" card, `/technology/web-applications` hero |
| `hosting.png` | Homepage "Hosting and support" card, `/technology/hosting` hero |

Until a file exists here, that slot falls back to the abstract wireframe
automatically. Nothing breaks and nothing 404s, so these can be added one at a
time.

## Rules

- Never label a screenshot with a client name, and never pair one with a claim
  about results. The alt text describes the interface, not whose it is.
- Get written permission before showing anything built for a client.
- Crop to the interface. The component supplies the browser chrome, so a
  screenshot that already includes a browser frame will look doubled.
- The image is anchored to the top and cropped to fill, so put the important
  part of the interface in the upper portion of the frame.
