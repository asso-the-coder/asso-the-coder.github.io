// Lightweight visitor logging: records the visitor's approximate location
// (via a free client-side IP lookup) to a Google Sheet, skipping traffic
// that looks like it's coming from a scraper/bot/datacenter/automation tool.
//
// Setup (one-time, in your own Google account):
//   1. Create a Google Sheet with a header row:
//      Timestamp | IP | City | Region | Country | Org/ISP | User Agent | Page | Referrer
//   2. In that Sheet: Extensions -> Apps Script, paste the doPost script
//      (see google-apps-script.gs in this repo), then Deploy -> New
//      deployment -> Web app (Execute as: Me, Who has access: Anyone).
//   3. Copy the deployed /exec URL and paste it below as SHEET_ENDPOINT.
//
// Fails silently on any error — never blocks or breaks the page for a
// real visitor.
//
// IMPORTANT CAVEAT: this is a heuristic, not a guarantee. It reliably
// catches bots hosted on cloud/datacenter infrastructure (AWS, GCP, Azure,
// Level3/Lumen, cheap VPS providers, etc.) and bots that self-identify or
// use headless/automation tooling. It CANNOT catch a bot that deliberately
// routes through a real residential or mobile ISP (a known scraper evasion
// technique) — that traffic looks identical to a real visitor from the
// network's point of view. Review the sheet periodically; nothing client-
// side can fully replace that.
(function () {
  const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbyRlbNFCjq891nkjg_G-KmozVU4gv9zgu6Kwbx5Z4m59KwzRyMzRX8vjkqJg2mS53zghw/exec";

  if (!SHEET_ENDPOINT || SHEET_ENDPOINT.indexOf("PASTE_YOUR") === 0) return;

  // ---- Signal 1: hosting/datacenter organization name ----
  // Real visitors come from residential/mobile ISPs; scrapers and bots
  // overwhelmingly run on cloud/hosting/datacenter/cheap-VPS infrastructure.
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
    "cloudsigma", "kamatera",
    // confirmed via real lookups against observed scraper traffic:
    "level 3", "level3", "lumen", "centurylink", "logicweb", "tzulo"
  ];

  function looksLikeBotOrg(text) {
    if (!text) return false;
    const t = text.toLowerCase();
    return HOSTING_KEYWORDS.some(k => t.indexOf(k) !== -1);
  }

  // ---- Signal 2: user-agent bot/automation signatures ----
  const UA_BOT_KEYWORDS = [
    "headlesschrome", "phantomjs", "selenium", "puppeteer", "playwright",
    "bot", "crawl", "spider", "spyder", "slurp", "scan", "monitor",
    "archiver", "http-client", "libwww", "wget", "curl/",
    "python-requests", "python-urllib", "okhttp", "go-http-client",
    "node-fetch", "axios/", "apache-httpclient", "java/"
  ];

  function looksLikeBotUA(ua) {
    if (!ua) return true; // no UA at all is itself suspicious
    const u = ua.toLowerCase();
    if (UA_BOT_KEYWORDS.some(k => u.indexOf(k) !== -1)) return true;

    // Real modern browsers don't identify as "(compatible; ...)" anymore —
    // that convention is now almost exclusively used by crawlers/bots
    // (Googlebot, Bingbot, and plenty of smaller ones with no "bot" in the
    // name, e.g. "Dataprovider.com").
    if (/compatible;/i.test(ua) && !/MSIE/i.test(ua)) return true;

    // A modern Chrome-based UA (Chrome/1xx+) that also carries the legacy
    // "Edge/" token (rather than "Edg/", which real Chromium Edge uses) is
    // internally inconsistent — a common tell of a templated/spoofed UA
    // used by scraping frameworks.
    if (/Chrome\/1\d\d/.test(ua) && /Edge\//.test(ua) && !/Edg\//.test(ua)) return true;

    return false;
  }

  fetch("https://ipwho.is/")
    .then(r => r.json())
    .then(geo => {
      if (!geo || geo.success === false) return;

      const conn = geo.connection || {};
      const orgText = [conn.isp, conn.org, conn.domain].filter(Boolean).join(" ");
      const ua = navigator.userAgent || "";

      const likelyBot =
        looksLikeBotOrg(orgText) ||
        looksLikeBotUA(ua) ||
        !!navigator.webdriver;

      if (likelyBot) return; // automatically excluded, nothing sent

      const payload = {
        timestamp: new Date().toISOString(),
        ip: geo.ip || "",
        city: geo.city || "",
        region: geo.region || "",
        country: geo.country || "",
        org: conn.isp || conn.org || "",
        userAgent: ua,
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
