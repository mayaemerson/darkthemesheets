
class StyleManager {
  constructor() {
    this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  }

  applyDarkModeToAllSheets() {
    const sheets = this.spreadsheet.getSheets();
    sheets.forEach(sheet => this.setDarkMode(sheet)); 
  }

  applyLightModeToAllSheets() {
    const sheets = this.spreadsheet.getSheets();
    sheets.forEach(sheet => this.setLightMode(sheet)); 
  }

  setDarkMode(sheet) {
    sheet.getRange('A1:Z')
      .setBackground("#333333")
      .setFontColor("white")
      .setFontFamily("Google Sans")
      .setBorder(false, false, false, false, true, true, "#444444", SpreadsheetApp.BorderStyle.SOLID);
  }

  setLightMode(sheet) {
    sheet.getRange('A1:Z')
      .setBackground("#ffffff")
      .setFontColor("#000000")
      .setFontFamily("Google Sans")
      .setBorder(false, false, false, false, true, true, "#e1e1e1", SpreadsheetApp.BorderStyle.SOLID);
  }

  applyDarkModeToNewSheet(sheet) {
    this.setDarkMode(sheet);
  }

  applyLightModeToNewSheet(sheet) {
    this.setLightMode(sheet);
  }
}

let currentMode = "Light"; 

function onOpen() {
ensureOnOpenTrigger()

  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Style')
    .addItem('Dark Mode', 'setDarkModeForAllSheets') 
    .addItem('Light Mode', 'setLightModeForAllSheets') 
    .addToUi();
  
  applyCurrentModeToAllSheets();

}

function applyCurrentModeToAllSheets() {
  const styleManager = new StyleManager();
  if (currentMode === "Dark") {
    styleManager.applyDarkModeToAllSheets();
  } else {
    styleManager.applyLightModeToAllSheets();
  }
}

function setDarkModeForAllSheets() {
  const styleManager = new StyleManager();
  styleManager.applyDarkModeToAllSheets();
  currentMode = "Dark"; 
}

function setLightModeForAllSheets() {
  const styleManager = new StyleManager();
  styleManager.applyLightModeToAllSheets();
  currentMode = "Light"; 
}

function onChange(e) {
  if (e.changeType === 'INSERT_GRID') {  
    const styleManager = new StyleManager();
    const newSheet = e.source.getActiveSheet(); 
    if (currentMode === "Dark") {
      styleManager.applyDarkModeToNewSheet(newSheet);  
    } else {
      styleManager.applyLightModeToNewSheet(newSheet); 
    }
  }
}