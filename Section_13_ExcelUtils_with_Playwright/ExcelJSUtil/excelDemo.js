const ExcelJs = require("exceljs")


async function writeExcelTest(searchText, replaceText, change, filePath) {

    
    // Create a new workbook
    const workbook = new ExcelJs.Workbook()
    // Read an existing Excel file
    await workbook.xlsx.readFile(filePath)
    // Add a worksheet to the workbook
    const workSheet = workbook.getWorksheet('Sheet1')
    const output = await readExcelTest(workSheet, searchText)


    const cell = workSheet.getCell(output.row, output.column+change.colChange)
    cell.value = replaceText
    // Save the modified workbook
    await workbook.xlsx.writeFile(filePath)
}


async function readExcelTest(workSheet, searchText){

    let output = {row:-1, column:-1}
    // Accessing rows and cells
    workSheet.eachRow((row, rowNumber) => {
        // Log each cell value in the row
        row.eachCell((cell, colNumber) => {
            //console.log(cell.value)
            if(cell.value === searchText){
                output.row = rowNumber
                output.column = colNumber
            }
        })
    })
    return output

}




writeExcelTest("Murgi", "999",{rowChange:0, colChange:2}, "download.xlsx")