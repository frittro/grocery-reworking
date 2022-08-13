// Global declarations
const maintenanceMode = false;
const debugLog = false;

// Global delarations for sheets and specific columns
const sheetOrders         = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("t_Orders");
const sheetInvoices       = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("t_Invoices");
const sheetProducts       = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("t_Products");
const allProducts         = sheetProducts.getRange(2,1,sheetProducts.getLastRow()-1,7).getValues();
const sheetAisles         = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("t_Aisles");
const allAisles           = sheetAisles.getRange(2,1,sheetAisles.getLastRow()-1,3).getValues();
const sheetProductHistory = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("t_ProductHistory");
const sheetLookups        = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("t_Lookups");
const productIDCell       = SpreadsheetApp.getActiveSpreadsheet().getRange("B3");

function onEdit(e){
  if(maintenanceMode != true){
    var activeCell = e.range;
    var v = activeCell.getValue();
    var r = activeCell.getRow();
    var c = activeCell.getColumn();
    var activeSheetName = activeCell.getSheet().getName();
    const activeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(activeSheetName);

    if(debugLog === true){
      Logger.log("activeSheetName: "+activeSheetName);
    }

    // Was it the q_ProductHistory sheet which was changed?
    if(activeSheetName === "q_ProductHistory"){
      
      if(debugLog === true){
        Logger.log("productIDCell: "+productIDCell);
      }
      // Was it the value in the search dropdown cell which was changed?
      if(c === 2 && r === 2){
        // Set the ProductID from the hidden value of the VLOOKUP in cell I2.
        productIDCell.setValue(SpreadsheetApp.getActiveSheet().getRange('I2').getValue());
      }

      // Was it the value in the brand dropdown cell which was changed?
      if(c === 8 && r === 1){
        // Clear the values and validations for the other dropdowns.
        const productSearch = activeSheet.getRange("B2").clearContent();
        const productID = activeSheet.getRange("B3").clearContent();
        // Reset the data validation for the product description dropdown.
        const productSearchValidation = activeSheet.getRange("B2").clearDataValidations();
        var listToApply = [""];
        var rangeToApply = sheetLookups.getRange('Y2:Y');
        var thisCell = activeSheet.getRange("B2");
        var invalidsPolicy = false;
        applyValidationToCell(listToApply,rangeToApply,thisCell,invalidsPolicy);

      }
      // Was it the value in the tertiary aisle dropdown cell which was changed?
      if(c === 6 && r === 1){
        // Clear the values and validations for the other dropdowns.
        const productSearch = activeSheet.getRange("B2").clearContent();
        const productID = activeSheet.getRange("B3").clearContent();
        const brand = activeSheet.getRange("H1").clearContent();
        // Reset the data validation for the product description dropdown.
        const productSearchValidation = activeSheet.getRange("B2").clearDataValidations();
        var listToApply = [""];
        var rangeToApply = sheetLookups.getRange('X2:X');
        var thisCell = activeSheet.getRange("B2");
        var invalidsPolicy = false;
        applyValidationToCell(listToApply,rangeToApply,thisCell,invalidsPolicy);
      }

      // Was it the value in the secondary aisle dropdown cell which was changed?
      if(c === 4 && r === 1){
        // Clear the values and validations for the other dropdowns.
        const productSearch = activeSheet.getRange("B2").clearContent();
        const productID = activeSheet.getRange("B3").clearContent();
        const brand = activeSheet.getRange("H1").clearContent();
        const tertiaryAisle = activeSheet.getRange("F1").clearContent();
        // Reset the data validation for the product description dropdown.
        const productSearchValidation = activeSheet.getRange("B2").clearDataValidations();
        var listToApply = [""];
        var rangeToApply = sheetLookups.getRange('W2:W');
        var thisCell = activeSheet.getRange("B2");
        var invalidsPolicy = false;
        applyValidationToCell(listToApply,rangeToApply,thisCell,invalidsPolicy);
        
      }

      // Was it the value in the master aisle dropdown cell which was changed?
      if(c === 2 && r === 1){
        // Clear the values and validations for the other dropdowns.
        const productSearch = activeSheet.getRange("B2").clearContent();
        const productID = activeSheet.getRange("B3").clearContent();
        const brand = activeSheet.getRange("H1").clearContent();
        const tertiaryAisle = activeSheet.getRange("F1").clearContent();
        const secondaryAisle = activeSheet.getRange("D1").clearContent();
        // Reset the data validation for the product description dropdown.
        const productSearchValidation = activeSheet.getRange("B2").clearDataValidations();
        var listToApply = [""];
        var rangeToApply = sheetLookups.getRange('V2:V');
        var thisCell = activeSheet.getRange("B2");
        var invalidsPolicy = false;
        applyValidationToCell(listToApply,rangeToApply,thisCell,invalidsPolicy);
      }

    } // end of: if(activeSheetName === "q_ProductHistory")

    // Was it the q_ImageCheck sheet which was changed?
    else if (activeSheetName === "q_ImageCheck"){
      var sourceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("q_ImageCheck");
      var targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("t_Products");
      var sourceURLColumn = getColumnNumByName(sourceSheet, "PnS_ImageURL") + 1;
      var targetURLColumn = getColumnNumByName(targetSheet, "PnS_ImageURL") + 1;
      var sourceProdIDColumn = getColumnNumByName(sourceSheet, "ProductID") + 1;
      var sourceProdID = sourceSheet.getRange(r,sourceProdIDColumn).getValue();
      var targetProdIDColumn = getColumnNumByName(targetSheet, "ProductID") + 1;
      var sourceProdDescColumn = getColumnNumByName(sourceSheet, "ProductDescription") + 1;
      var targetProdDescColumn = getColumnNumByName(targetSheet, "ProductDescription") + 1;
      var sourceProdDesc = sourceSheet.getRange(r,sourceProdDescColumn).getValue();
      var targetLastFilledRow = getLastFilledRow(targetSheet,targetProdIDColumn);
      if(debugLog === true){
        Logger.log("PnS_ImageURL on q_ImageCheck is at column: "+sourceURLColumn);
        Logger.log("PnS_ImageURL on t_Products is at column: "+targetURLColumn);
        Logger.log("ProductID on q_ImageCheck is at column: "+sourceProdIDColumn);
        Logger.log("ProductID on q_ImageCheck is: "+sourceProdID);
        Logger.log("ProductID on t_Products is at column: "+targetProdIDColumn);
        Logger.log("ProductDescription on q_ImageCheck is at column: "+sourceProdDescColumn);
        Logger.log("ProductDescription on t_Products is at column: "+targetProdDescColumn);
        Logger.log("ProductDescription value on q_ImageCheck is: "+sourceProdDesc);
        Logger.log("Last Filled Row on t_Products is: "+targetLastFilledRow);
      }
      // Was it a value in the PnS_ImageURL column which was changed?
      if (c === sourceURLColumn && r > 1){
        if (debugLog === true){
          Logger.log("PnS_ImageURL on q_ImageCheck was changed to: "+v);
        }
        
        // Find the corresponding row in the t_Products sheet.
        for (targetRow=1; targetRow<=targetLastFilledRow; targetRow++){
          thisValue = targetSheet.getRange(targetRow,targetProdIDColumn).getValue();
          if (thisValue === sourceProdID){ break }
        }
        if (debugLog === true){
          Logger.log("ProductID found in t_Products at row: "+targetRow);
        }
        
        // Update the value in the corresponding PnS_ImageURL column of the t_Products sheet.
        targetSheet.getRange(targetRow,targetURLColumn).setValue(v);
      }
    }
  } // end of: if(maintenanceMode != true)
} // end of: function onEdit(e)


/**
 * @desc Resets the q_ProductHistory sheet when the custom "Reset" button is clicked.
 * 
 * @link https://www.benlcollins.com/apps-script/google-sheets-button
 */
function btnResetProductHistory() {
  const thisSheet = SpreadsheetApp.getActiveSheet();
  const masterAisle = thisSheet.getRange("B1").clearContent();
  const secondaryAisle = thisSheet.getRange("D1").clearContent();
  const tertiaryAisle = thisSheet.getRange("F1").clearContent();
  const brand = thisSheet.getRange("H1").clearContent();
  const productSearch = thisSheet.getRange("B2").clearContent();
  const productID = thisSheet.getRange("B3").clearContent();
  const currentUnitPrice = thisSheet.getRange("E3").clearContent();
  const productIDFocus = thisSheet.getRange("B3").activate();
  // Reset the data validation for the product description dropdown.
  var rule = thisSheet.getRange("B2").getDataValidation();
  var listToApply = [""];
  var rangeToApply = sheetLookups.getRange('U2:U');
  var thisCell = thisSheet.getRange("B2");
  var invalidsPolicy = false;
  applyValidationToCell(listToApply,rangeToApply,thisCell,invalidsPolicy);
}

 /**
 * @desc This is an Google Apps Script for getting column number by column name
 * @author Misha M.-Kupriyanov https://plus.google.com/104512463398531242371/
 * @link https://gist.github.com/5520691
 * 
 * @param {Object} thisSheet The sheet to find the column in.
 * @param {String} name The name of the column to find.
 * @return {Integer} The found column number.
 */
function getColumnNumByName(thisSheet, name) {
  var range = thisSheet.getRange(1, 1, 1, thisSheet.getMaxColumns());
  var values = range.getValues();
  
  for (var row in values) {
    for (var col in values[row]) {
      if (values[row][col] == name) {
        return parseInt(col);
      }
    }
  }
  
  throw 'failed to get column by name';
}

/**
 * @desc Finds the last filled row in a column of a sheet, having non-contiguous blocks of data.
 * @author Teolin Codreanu https://ro.linkedin.com/in/teolincodreanu
 * @link https://www.linkedin.com/pulse/how-get-last-filled-row-non-contiguous-column-via-google-codreanu
 * 
 * @param {Object} The sheet to be checked.
 * @param {Integer} The column number to check, defaults to 1.
 * @return {Integer} The row number of the last filled row in the given sheet.
 */
function getLastFilledRow(thisSheet,column){
  const max = thisSheet.getMaxRows();
  var value = '';
  var values = thisSheet.getRange(1,column,max).getValues();
  values = [].concat.apply([], values);
  for (row = max - 1; row > 0; row--){
    value = values[row];
    if (value != '') { break }
  }
  return parseInt(row) + 1;

}

/**
 * @desc Applies a validation rule to a cell, either from a list or a range, and either strictly or permissably.
 * @author FrittRo
 * @todo Conforming code to the Google JavaScript Style Guide. https://git.io/Jcqk2
 * @todo Conforming to Google Apps Script Best Practices. https://git.io/Jcqk1
 * 
 * @param {Array} listToApply [OPTION 1] A list of items to be displayed
 * @param {Object} rangeToApply [OPTION 2] A range containing the items to be displayed 
 * @param {Object} thisCell A cell reference to contain the dropdown in a given sheet
 * @param {Boolean} invalidsPolicy Whether or not to allow invalid selections in the cell
 */
function applyValidationToCell(listToApply,rangeToApply,thisCell,invalidsPolicy) {
  if (rangeToApply ===''){
    var rule = SpreadsheetApp
    .newDataValidation()
    .requireValueInList(listToApply)
    .setAllowInvalid(invalidsPolicy)
    .build();
  } else {
    var rule = SpreadsheetApp
    .newDataValidation()
    .requireValueInRange(rangeToApply,true)
    .setAllowInvalid(invalidsPolicy)
    .build();
  }
  thisCell.setDataValidation(rule);
  thisCell.activate();
  SpreadsheetApp.flush();
}

/**
 * @desc Custom function returning A1 address of named range
 * @author HardScale https://stackoverflow.com/users/1637263/hardscale
 * @link https://stackoverflow.com/a/12633583/19709446
 * 
 * @param {String} The name of the named range.
 * @return {Object} The A1 Notation for the named range.
 */
function myGetRangeByName(n) {  // just a wrapper
  return SpreadsheetApp.getActiveSpreadsheet().getRangeByName(n).getA1Notation();
}
