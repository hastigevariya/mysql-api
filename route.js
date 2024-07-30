module.exports = (app) => {

    const databasecall = require('./databaseApicall.js')

    app.post("/transactionin",databasecall.transactionin)
    app.post("/updateTransaction",databasecall.updateTransaction)
    app.get("/getBalance",databasecall.getBalance)
    app.get("/getYearlyBalance",databasecall.getYearlyBalance)

}