// Paste this into your Google Sheet's Extensions -> Apps Script editor,
// replacing the default code. Then Deploy -> New deployment -> Web app
// (Execute as: Me, Who has access: Anyone), and copy the /exec URL into
// SHEET_ENDPOINT in assets/js/analytics.js.
//
// Expects a header row in the sheet:
// Timestamp | IP | City | Region | Country | Org/ISP | Page | Referrer

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.ip || "",
    data.city || "",
    data.region || "",
    data.country || "",
    data.org || "",
    data.page || "",
    data.referrer || ""
  ]);

  return ContentService.createTextOutput("OK");
}
