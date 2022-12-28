const mysql = require('mysql2')

con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rabit_hole',
});

con.connect(function(error) {
    if (error) {
        console.log(error)
    }
});

module.exports = con;