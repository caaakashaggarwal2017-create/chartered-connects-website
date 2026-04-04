# CC Podcast — YouTube Channel Setup Guide

This document is a reference guide for the Chartered Connects team to set up and manage the CC Podcast YouTube channel.

> **Channel joined: March 26, 2026** — The channel is brand new. Complete Section 2 (Branding) before uploading any videos.

---

## 0. Brand Assets (Ready to Use)

Three SVG brand assets are provided in `public/brand/`. Open each file in Chrome, zoom to fit, then use the browser print/screenshot to export as PNG.

| File | Purpose | Export size |
|------|---------|-------------|
| `public/brand/youtube-profile.svg` | Channel profile picture | Export at 800×800 px |
| `public/brand/youtube-banner.svg` | Channel banner | Export at 2560×1440 px |
| `public/brand/youtube-thumbnail-template.svg` | Per-episode thumbnail base | Export at 1280×720 px |

**To export SVG → PNG (free, browser-based):**
1. Open the SVG file in Chrome (File → Open, or drag into browser)
2. In Chrome DevTools console run: `document.querySelector('svg').style.transform = 'scale(1)'`
3. Or simply screenshot the full browser window at the correct zoom level
4. Alternatively, paste the SVG into [Figma](https://figma.com) (free) or [SVGtoPNG.com](https://svgtopng.com) and export at the required size

**Brand colours used in all assets:**

| Token | Hex | Usage |
|-------|-----|-------|
| Navy (primary) | `#0A1628` | Background |
| Gold (accent) | `#F5A623` | Taglines, accents, logo centre |
| Podcast Red | `#E53E3E` | Thumbnail labels, episode pills |
| White | `#FFFFFF` | Body text, node dots |

---

## 1. Create the YouTube Channel

> ✅ Already done — channel exists at `https://youtube.com/@CharteredConnects`

---

## 2. Channel Branding (Do This First)

Go to [YouTube Studio → Customisation](https://studio.youtube.com/channel/customisation).

### 2a. Profile Picture

- Upload `public/brand/youtube-profile.svg` exported as 800×800 PNG
- YouTube crops profile pictures to a circle — the logo mark is centred and fully within the circle
- Minimum accepted size: 98×98 px

### 2b. Channel Banner

- Upload `public/brand/youtube-banner.svg` exported as 2560×1440 PNG
- **Safe zone** (text/logos visible on all devices): centre 1546×423 px
- The logo mark and all text in the banner SVG are within this safe zone
- YouTube accepts JPG, PNG, GIF, BMP (max 6 MB)

### 2c. Video Watermark

- Use the same profile picture export (800×800 PNG)
- Display time: **End of video** (shows Subscribe button overlay)

### 2d. Channel Name & Handle

- Channel name: `Chartered Connects`
- Handle: `@CharteredConnects` ← already set, do not change

### 2e. Channel Description

Paste this exactly into **YouTube Studio → Customisation → Basic info → Description**:

```
Chartered Connects — India's Community for Chartered Accountants

Real, long-form conversations with practicing CAs, Big 4 professionals, CA rankers, articleship students and finance leaders across India.

Topics: Career growth · CA exams · Big 4 life · Articleship · GST · Startup finance · Solo practice · Women in CA

New episodes every week. Subscribe and hit the bell icon to never miss one.

──────────────────────────────
🔗 Website:      https://charteredconnects.com
🎙️ Podcast page:  https://charteredconnects.com/podcast
💼 LinkedIn:      https://linkedin.com/company/chartered-connects
📧 Be a guest:    https://charteredconnects.com/podcast#be-a-guest
📩 Newsletter:    https://charteredconnects.com/newsletter
──────────────────────────────

Inspire. Learn. Lead.
```

### 2f. Links (shown on channel banner)

Add in **YouTube Studio → Customisation → Basic info → Links**:

| Label | URL |
|-------|-----|
| Website | `https://charteredconnects.com` |
| Podcast | `https://charteredconnects.com/podcast` |
| LinkedIn | `https://linkedin.com/company/chartered-connects` |
| Newsletter | `https://charteredconnects.com/newsletter` |

### 2g. Contact Email

Add in **Basic info → Contact info**: the official CC team email.

---

## 3. Episode Upload Checklist

For every new episode, complete the following:

### Video File
- [ ] Export at 1080p (minimum), 1440p preferred
- [ ] MP4 format, H.264 codec
- [ ] File name: `CC-Podcast-Ep{number}-{Guest-Name}.mp4`

### Thumbnail
- Open `public/brand/youtube-thumbnail-template.svg` in Figma
- Replace placeholder text: episode number, guest name, guest title/company, topic tag, duration
- Replace photo placeholder with a clear headshot of the guest
- Export as 1280×720 JPG
- File name: `CC-Podcast-Ep{number}-thumb.jpg`

### Title Format
```
Ep {number}: {Episode Title} | CC Podcast
```
Example: `Ep 12: From Articleship to Big 4 Partner | CC Podcast`

### Description Template
```
{Episode introduction — 2–3 sentences summarising the conversation}

In this episode, we speak with {Guest Name}, {Guest Designation} at {Guest Company}, about {topic summary}.

⏰ TIMESTAMPS
0:00 — Introduction
{...all timestamps from the episode data...}

🎙️ ABOUT OUR GUEST
{Guest bio from episode data}

🔗 Connect with {Guest First Name}: {Guest LinkedIn URL}

📌 KEY TAKEAWAYS
{List all key takeaways from the episode data}

─────────────────────────────────────────

🎧 LISTEN ON OTHER PLATFORMS
• Spotify:        https://open.spotify.com/show/charteredconnects
• Apple Podcasts: https://podcasts.apple.com/in/podcast/chartered-connects

📱 FOLLOW CHARTERED CONNECTS
• Website:          https://charteredconnects.com/podcast
• LinkedIn (104K+): https://linkedin.com/company/chartered-connects
• Free newsletter:  https://charteredconnects.com/newsletter

🎙️ WANT TO BE A GUEST?
Apply at: https://charteredconnects.com/podcast#be-a-guest

─────────────────────────────────────────

#CAPodcast #CharteredAccountant #CAIndia #CCPodcast #CharteredConnects
```

### Tags (use for all episodes)
```
CA podcast, chartered accountant India, CA career, Big 4 India, ICAI, CA Final, CA articleship, GST India, CA students, finance India, chartered connects, CC podcast
```

### Category
Select: **Education**

### Playlist
Add each episode to the **CC Podcast** playlist (create this playlist on the first upload).

---

## 4. End Screen & Cards

### End Screen (last 20 seconds of every video)
- Subscribe button
- Link to latest episode
- Link to the CC Podcast playlist

### Cards
- Add a card at ~30% into the video pointing to the **Podcast page** (`/podcast`) or a related episode

---

## 5. Episode Data Updates

After uploading each episode to YouTube:

1. **Copy the YouTube Video ID** from the URL:
   `https://www.youtube.com/watch?v=VIDEO_ID_HERE`

2. **Update `lib/data/podcast-episodes.ts`**:
   - Replace `youtubeVideoId: "dQw4w9WgXcQ"` with the actual video ID
   - Update `youtubeUrl` to the full video URL
   - Update `viewCount` periodically from YouTube Studio analytics

3. **Run the dev server** and verify the embed works on `/podcast` and `/podcast/{slug}`

---

## 6. Spotify & Apple Podcasts Distribution

To get the podcast on Spotify and Apple Podcasts, you need an RSS feed. Options:

### Option A — Anchor / Spotify for Podcasters (Free)
1. Go to [podcasters.spotify.com](https://podcasters.spotify.com)
2. Create an account and add your show
3. Upload audio-only MP3 exports of each episode
4. Spotify will generate an RSS feed and auto-submit to Apple Podcasts

### Option B — RSS.com / Buzzsprout (Paid, ~$12–20/month)
Better analytics, more distribution options (Google Podcasts, Amazon Music, etc.)

### Audio Export
Export the audio track from your video editor as:
- Format: MP3
- Bitrate: 128 kbps (minimum), 192 kbps (recommended)
- File name: `CC-Podcast-Ep{number}.mp3`

---

## 7. Publishing Schedule

- **Recording**: Aim to record 2 weeks ahead of publish date
- **Editing**: 3–5 days for video editing + thumbnail
- **Upload**: Schedule on YouTube for **Thursday 10:00 AM IST** (optimal for Indian audience engagement)
- **Website update**: Update `podcast-episodes.ts` on the same day as the YouTube upload

---

## 8. Community Tab (unlocks at 500 subscribers)

Once the channel reaches 500 subscribers, use the Community tab for:
- Polls: "What topic should we cover next?"
- Behind-the-scenes clips
- Episode teasers (15-second clips)
- Guest announcements

---

## 9. Analytics to Track (YouTube Studio)

Review these metrics monthly:

| Metric | Target |
|--------|--------|
| Subscriber growth | +100/month initially |
| Average view duration | > 40% of total episode length |
| Click-through rate (CTR) on thumbnails | > 4% |
| Top traffic sources | LinkedIn, direct, YouTube search |
| Top performing episodes | Informs future guest selection |

---

## 10. First 10 Episodes — Growth Checklist

- [ ] Cross-post every new episode on LinkedIn (Chartered Connects page)
- [ ] Share a 60-second clip on LinkedIn as a native video post
- [ ] Ask the guest to share the episode on their LinkedIn (provide them the link + suggested caption)
- [ ] Post in relevant CA/finance communities on LinkedIn and WhatsApp
- [ ] Send episode alert to CC Newsletter subscribers
- [ ] Pin the latest episode on the CC LinkedIn page

---

## 11. Brand Consistency Notes

**Website (authoritative brand):**
- Background: dark navy `#0A1628`
- Accent: gold `#F5A623`
- Tagline: "Inspire. Learn. Lead."
- Logo: network-node mark (dots + connecting lines) + "Chartered Connects"

**LinkedIn page (current):**
- Profile picture: "Chartered Connects" text-only on white — consider updating to match the logo mark used on the website and YouTube
- Banner: uses a lighter blue gradient with network nodes — the theme matches but the colour is lighter than the website's dark navy. For full consistency, consider updating the LinkedIn banner to use the same `#0A1628` dark navy + gold palette as the website and YouTube channel.

**YouTube channel (this guide):**
- Follows the website's colour palette exactly (dark navy + gold, network node logo mark)
- Red `#E53E3E` added as a podcast-specific accent for thumbnails and episode labels

---

*Last updated: March 2026. Questions? Contact the CC team.*
