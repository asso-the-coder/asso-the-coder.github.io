// Paste this into your Google Sheet's Extensions -> Apps Script editor,
// replacing the default code. Then Deploy -> New deployment -> Web app
// (Execute as: Me, Who has access: Anyone), and copy the /exec URL into
// SHEET_ENDPOINT in assets/js/analytics.js.
//
// Expects a header row in the sheet:
// Timestamp | IP | City | Region | Country | Org/ISP | User Agent | Page | Referrer

var DEDUPE_WINDOW_MINUTES = 5; // collapse repeat hits from the same IP
var DEDUPE_LOOKBACK_ROWS = 20; // how far back to check for a repeat

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  var ip = data.ip || "";
  var now = new Date();

  if (ip && isRecentDuplicate(sheet, ip, now)) {
    return ContentService.createTextOutput("SKIPPED_DUPLICATE");
  }

  sheet.appendRow([
    data.timestamp || now.toISOString(),
    ip,
    data.city || "",
    data.region || "",
    data.country || "",
    data.org || "",
    data.userAgent || "",
    data.page || "",
    data.referrer || ""
  ]);

  return ContentService.createTextOutput("OK");
}

// Squashes rapid repeat hits from the same reported IP within a short
// window — catches burst/scanner traffic (including bots that route
// through real residential/mobile ISPs specifically to dodge datacenter-
// based filtering, which looks fine on every other signal but hits the
// page many times in a few seconds).
function isRecentDuplicate(sheet, ip, now) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return false;

  var lookback = Math.min(DEDUPE_LOOKBACK_ROWS, lastRow - 1);
  var startRow = lastRow - lookback + 1;
  var recent = sheet.getRange(startRow, 1, lookback, 2).getValues(); // Timestamp, IP

  for (var i = recent.length - 1; i >= 0; i--) {
    if (recent[i][1] === ip) {
      var rowTime = new Date(recent[i][0]);
      var minutesAgo = (now - rowTime) / 60000;
      return minutesAgo < DEDUPE_WINDOW_MINUTES;
    }
  }
  return false;
}
