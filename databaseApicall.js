const mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'lzy.h.filess.io',
    user: 'transecti0099on01_keptsawbox',
    password: '5c357920de5a4f633be7d22daf320a2a5f9ecb96',
    database: 'transecti0099on01_keptsawbox',
    port : 3307
});

connection.connect(function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('Database connected.')
    }
});

exports.transactionin = (req, res) => {
    const { transaction_id, date, remark, category_id, category_type, amount } = req.body;

    const transaction = {
        transaction_id,
        date,
        remark,
        category_id,
        category_type,
        amount
    };

    const sql = 'INSERT INTO tbl_transaction SET ?';

    connection.query(sql, transaction, (error, results, fields) => {
        if (error) throw error;
        return res.send({
            data: results,
            message: 'Transaction added'
        });
    });
};

exports.updateTransaction = (req, res) => {
    const { transaction_id } = req.params;
    const { date, remark, category_id, category_type, amount } = req.body;

    const sql = 'UPDATE tbl_transaction SET date = ?, remark = ?, category_id = ?, category_type = ?, amount = ? WHERE transaction_id = ?';

    connection.query(sql, [date, remark, category_id, category_type, amount, transaction_id], (error, results, fields) => {
        if (error) throw error;
        return res.send({
            data: results,
            message: 'Transaction updated'
        });
    });
};

exports.getBalance = (req, res) => {

    const sqlIn = 'SELECT SUM(amount) AS total_in FROM tbl_transaction WHERE category_type = "In"';
    const sqlOut = 'SELECT SUM(amount) AS total_out FROM tbl_transaction WHERE category_type = "Out"';

    console.log(sqlIn);
    connection.query(sqlIn, (error, resultsIn) => {
        if (error) {
            return res.status(500).send({
                 error: 'Database query error' });
        }

        connection.query(sqlOut, (error, resultsOut) => {
            if (error) {
                return res.status(500).send({
                 error: 'Database query error' });
            }

            const totalIn = resultsIn[0].total_in || 0;
            const totalOut = resultsOut[0].total_out || 0;
            const balance = totalIn - totalOut;

            return res.send({
                balance: balance,
                message: 'Balance retrieved'
            });
        });
    });
};


exports.getYearlyBalance = (req, res) => {

    connection.query(sql, (error, results) => {
        if (error) {
            return res.status(500).send({ error: 'Database query error' });
        }

        const yearlyBalance = results.map(row => ({
            year: row.year,
            total_in: row.total_in,
            total_out: row.total_out
        }));

        return res.send({
            data: yearlyBalance,
            message: 'Yearly balance retrieved'
        });
    });
};



//  body ma aa data pass karvano post men ma

//  {   "transaction_id":"06", 
//     "date": "2024-02-01",
//     "remark": "Test Transaction",
//     "category_id": 3,
//     "category_type": "Out",
//     "amount": 1000.00
// }

// const sqlIn = 'SELECT SUM(amount) AS total_in FROM tbl_transaction WHERE category_type = "In"';
    // const sqlOut = 'SELECT SUM(amount) AS total_out FROM tbl_transaction WHERE category_type = "Out"';
