const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');
 
async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output = readExcel(worksheet, searchText); // not async
 
  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}
 
// This does no async work, so don't mark it async.
function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });
  return output;
}
 
//update Mango Price to 350. 
//writeExcelTest("Mango",350,{rowChange:0,colChange:2},"/Users/mahamudulhasan/downloads/download.xlsx");



test("Upload download excel validation", async({page})=>{

  const downloadsPath = '/Users/mahamudulhasan/downloads/';
  const textSearch = "Mango";
  const updateValue = '450';
  await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html")

  //wait for download event to start
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  //wait for the event to complete
  const download = await downloadPromise;
  //save download to desired path
  await download.saveAs(`${downloadsPath}download.xlsx`);

  writeExcelTest(textSearch,updateValue,{rowChange:0,colChange:2},"/Users/mahamudulhasan/Downloads/download.xlsx");
  await page.locator("#fileinput").click()
  await page.locator("#fileinput").setInputFiles("/Users/mahamudulhasan/Downloads/download.xlsx") 

  const textLocator = page.getByText(textSearch)
  const desiredRow =  page.getByRole('row').filter({has: textLocator})

  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue)

  

})