const ExcelJs = require("exceljs")


async function excelTest() {

    let output = {row:-1, column:-1}
    // Create a new workbook
    const workbook = new ExcelJs.Workbook()

    // Read an existing Excel file
    await workbook.xlsx.readFile('download.xlsx')
    // Add a worksheet to the workbook
    const wokrsheet = workbook.getWorksheet('Sheet1')


    // Accessing rows and cells
    wokrsheet.eachRow((row, rowNumber) => {
        // Log each cell value in the row
        row.eachCell((cell, colNumber) => {
            //console.log(cell.value)
            if(cell.value ==='Apple'){
                output.row = rowNumber
                output.column = colNumber
            }
        })
    })

    const cell = wokrsheet.getCell(output.row, output.column)
    cell.value = "Murgi"

    // Save the modified workbook
    await workbook.xlsx.writeFile('download.xlsx')
}

excelTest()