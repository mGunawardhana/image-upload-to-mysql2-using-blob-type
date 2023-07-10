const fs = require('fs');
const mysql = require('mysql2')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'maneesha',
    password: '1234',
    database: 'image_db',
    timezone: 'utc',

    queryFormat: function (query, values) {
        if (!values) return query;
        return query.replace(/\:(\w+)/g, function (txt, key) {
            if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
            }
            return txt;

        }.bind(this));

    }
})

const inputfile = '7-56-removebg.jpg'
const outputfile = 'output.png'

const data = readImageFile(inputfile)
console.log(data)

pool.query("INSERT INTO `binddata` (data) VALUES(BINARY(:data))", {data}, function (err, res) {
    if (err) throw err
    console.log("blob data inserted!")

    pool.query("SELECT * FROM `binddata`", function (err, res) {
        const row = res[0]
        const data = row.data
        console.log("BLOB data read!");

        const buf = new Buffer(data, 'binary')
        fs.writeFileSync(outputfile, buf)
        console.log("New file created!", outputfile);
    })


})

function readImageFile(file) {
    const bitmap = fs.readFileSync(file)
    const buf = new Buffer(bitmap)
    return buf
}