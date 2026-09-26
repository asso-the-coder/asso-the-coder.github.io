// Lightweight visitor logging: records the visitor's approximate location
// (via a free client-side IP lookup) to a Google Sheet, skipping traffic
// that looks like it's coming from a scraper/bot/datacenter IP.
//
// Setup (one-time, in your own Google account):
//   1. Create a Google Sheet with a header row:
//      Timestamp | IP | City | Region | Country | Org/ISP | Page | Referrer
//   2. In that Sheet: Extensions -> Apps Script, paste the doPost script
//      (see google-apps-script.gs in this repo), then Deploy -> New
//      deployment -> Web app (Execute as: Me, Who has access: Anyone).
//   3. Copy the deployed /exec URL and paste it below as SHEET_ENDPOINT.
//
// Fails silently on any error — never blocks or breaks the page for a
// real visitor.
(function () {
  const SHEET_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";

  if (!SHEET_ENDPOINT || SHEET_ENDPOINT.indexOf("PASTE_YOUR") === 0) return;

  // Heuristic: real visitors come from residential/mobile ISPs; scrapers
  // and bots overwhelmingly run on cloud/hosting/datacenter infrastructure.
  // This isn't perfect, but it's the standard signal for this kind of
  // client-side-only setup.
  const HOSTING_KEYWORDS = [
    "amazon", "aws", "google cloud", "google llc", "microsoft", "azure",
    "digitalocean", "digital ocean", "ovh", "hetzner", "linode", "vultr",
    "oracle cloud", "alibaba", "tencent", "cloudflare", "fastly",
    "scraper", "crawler", "crawl", "bot", "hosting", "datacenter",
    "data center", "colo", "server", "leaseweb", "choopa", "contabo",
    "the constant company", "quadranet", "colocrossing", "psychz",
    "unified layer", "datacamp", "m247", "hivelocity", "servers.com",
    "zenlayer", "hurricane electric", "he.net", "psinet", "webnx",
    "ionos", "scaleway", "hostwinds", "inap", "cogent", "equinix",
    "oracle corporation", "microsoft corporation", "amazon technologies",
    "amazon.com", "akamai", "limelight", "fdcservers", "steadfast",
    "cloudsigma", "kamatera"
  ];

  function looksLikeBotOrg(org) {
    if (!org) return false;
    const o = org.toLowerCase();
    return HOSTING_KEYWORDS.some(k => o.indexOf(k) !== -1);
  }

  fetch("https://ipapi.co/json/")
    .then(r => r.json())
    .then(geo => {
      const likelyBot = looksLikeBotOrg(geo.org) || !!navigator.webdriver;
      if (likelyBot) return; // automatically excluded, nothing sent

      const payload = {
        timestamp: new Date().toISOString(),
        ip: geo.ip || "",
        city: geo.city || "",
        region: geo.region || "",
        country: geo.country_name || "",
        org: geo.org || "",
        page: location.pathname,
        referrer: document.referrer || ""
      };

      // text/plain + no-cors avoids CORS preflight issues with Apps Script,
      // and we don't need to read the response anyway.
      return fetch(SHEET_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
    })
    .catch(() => { /* fail silently */ });
})();
