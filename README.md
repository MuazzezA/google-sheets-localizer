# Google Sheets Localizer 🌍

A powerful tool designed to simplify your localization workflow by fetching translation strings directly from a Google Sheets document. It automates the generation of translation files compatible with your project, saving you time and reducing manual errors. Easily manage your localization keys and translations in one place, and keep your app’s languages up to date with minimal effort.

---

## Getting Started 🚀

Follow these steps to set up and use the localizer tool in your project.

### 1. Create Your Google Sheet 📝

- Create a new Google Sheet to manage your localization keys and translations.
- Structure your sheet as follows:
    - **Row 1:** First column should be the key name (e.g. `greeting`), subsequent columns should be language codes (e.g. `en`, `tr`, `fr`).
    - **Row 2 onwards:** Fill in your translation keys and corresponding translations for each language.

Example:

| Key       | en        | tr           | fr          |
| --------- | --------- | ------------ | ----------- |
| greeting  | Hello     | Merhaba      | Bonjour     |
| farewell  | Goodbye   | Hoşça kal    | Au revoir   |

<img width="500" alt="example" src="https://github.com/user-attachments/assets/e4b74947-2656-4fe7-b87e-69e5dbc541fe" />

> **Note:** By default, the tool starts reading data from the **3rd row** of the sheet (assuming the 1st row contains headers and the 2nd row contains the first data row).  
> You can adjust this behavior by changing the `GOOGLE_SHEET_RANGE` value in your `.env` file to specify a different starting row.

---

### 2. Share Your Google Sheet 🔗

- Share the Google Sheet with the email found in your Google Cloud credentials JSON under the `client_email` field.
- Give at least **Viewer** access so the API can read the sheet.
---

### 3. Setup Google Cloud Credentials 🔐

- Create a project in the [Google Cloud Console](https://console.cloud.google.com/).
- Enable the Google Sheets API for your project.
- Create a Service Account and generate a JSON key file.
- Download the JSON credentials file and save it somewhere safe.

---

### 4. Configure `.env` File ⚙️

Create a `.env` file in your project root with the following keys:

```env
GOOGLE_SHEET_ID=your_google_sheet_id_here
GOOGLE_CREDENTIALS_PATH=/absolute/path/to/your/credentials.json
GOOGLE_SHEET_RANGE=Sheet1!A1:Z1000
```

### 5. Run the Localizer ▶️

Run the command to fetch the latest translations and generate localization files:


```bash
npx generate-localize
```
The tool will:

Read the Google Sheet starting from row 2 (row 1 is assumed to be headers).
Generate a JSON file with translations.
Generate a TypeScript types file for localization keys.
Save output files into the localize folder at the root of your project.


### 6. Use Generated Files in Your Project 📂

- The generated `localize/translations.json` contains all translations.
- The generated `localize/localized-keys.d.ts` contains typed localization keys.
- Import these files where needed in your project.

### 7. Notes 📝

- Ensure the Google credentials JSON file path is absolute.
- The tool expects the first row of the sheet to contain headers.
- Sharing the sheet correctly with the service account email is required.
- The output directory (`localize`) will be created if it doesn’t exist.


### Troubleshooting 🛠️

- If you get an error about missing `.env` variables, double-check your `.env` file location and contents.
- If the credentials file is not found, verify the absolute path is correct.
- Make sure your service account has Viewer access to the Google Sheet.

---

### License 📄

MIT

---

### Author 👩‍💻

MuazzezA
