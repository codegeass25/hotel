HARBORLIGHT HOTEL v3 - GITHUB PAGES PWA FRONTEND

UPLOAD ONLY THE CONTENTS OF THIS FOLDER to the root of the GitHub Pages repository.

Backend is preconfigured in config.js as:
  https://hotel.mdmsportal.uk

Architecture:
  GitHub Pages / installed PWA
       -> HTTPS REST API
  hotel.mdmsportal.uk
       -> Cloudflare hotel-api remote tunnel
  127.0.0.1:2000 on the server PC
       -> Node.js hotel backend + central JSON database + uploads

Files:
- index.html        Public premium hotel website + direct booking engine
- admin.html        Property console / CMS / PMS
- config.js         Backend URL (change only if hostname changes)
- manifest.json     Installable PWA metadata
- service-worker.js Offline shell/cache
- icons/            PWA icons

IMPORTANT:
- Do NOT upload BACKEND-LOCAL-CLOUDFLARE, data, uploads, logs, or tunnel token to GitHub.
- Admin session tokens live only in sessionStorage and are sent to the remote API using Authorization headers.
- Uploaded room/gallery/hero images live on the backend and are automatically rendered through hotel.mdmsportal.uk/uploads/.

Admin page after GitHub deployment:
  <your GitHub Pages URL>/admin.html
