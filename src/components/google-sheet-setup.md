# How to Connect Your Form to Google Sheets 📊

To save the admission inquires directly to a Google Sheet, follow these simple steps. This is a "Serverless" backend that costs $0.

## Step 1: Create the Sheet
1. Go to [Google Sheets](https://sheets.new).
2. Create a new sheet named **"SIA Admissions"**.
3. In the first row (Header), add these names in order:
   - `A1`: **Date**
   - `B1`: **Student Name**
   - `C1`: **Grade**
   - `D1`: **DOB**
   - `E1`: **Parent Name**
   - `F1`: **Phone**
   - `G1`: **Email**

## Step 2: Add the Script
1. In the Google Sheet, click **Extensions** > **Apps Script**.
2. Delete any code there and paste this **Magic Script**:

```javascript
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var data = JSON.parse(e.postData.contents);
  var sheet;

  // Select sheet based on data type
  if (data.type === "enquiry") {
    // Try to find "Enquiry" sheet, fallback to "Sheet2"
    sheet = ss.getSheetByName("Enquiry") || ss.getSheetByName("Sheet2");
  } else {
    // Default to "Admission" (or "Sheet1")
    sheet = ss.getSheetByName("Admission") || ss.getSheetByName("Sheet1");
  }

  // Safety fallback
  if (!sheet) sheet = ss.getActiveSheet();
  
  sheet.appendRow([
    new Date(),
    data.studentName,
    data.grade,
    data.dob || "N/A",
    data.parentName,
    "'"+data.phone, 
    data.email,
    data.message || "" // Added message column support
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({"result":"success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click the **Save** icon (💾).

## Step 3: Deploy as Web App (Critical Step!)
1. Click the blue **Deploy** button > **New deployment**.
2. Click the **Select type** gear icon ⚙️ > **Web app**.
3. Fill these efficiently:
   - **Description**: ``
   - **Execute as**: `Me` (your email)
   - **Who has access**: `Anyone` (Important! This allows the website to send data)
4. Click **Deploy**.
5. Copy the **Web app URL** (It starts with `https://script.google.com/macros/s/...`).

## Step 4: Final Connection
Send me that URL! Or paste it directly into `AdmissionsPageClient.tsx` at line 60 where it says `const GOOGLE_SCRIPT_URL = ""`.
