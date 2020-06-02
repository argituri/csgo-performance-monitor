var http = require('http')
const settings = require('./config.js')
console.log(settings)
const token = settings.token
const port = settings.port
var mysql = require('mysql');


console.log(port)

var requestListener = (req, res) => {
    console.log(req.method)
    if (req.method == 'POST'){// && req.body && req.body.token == token){
        console.log("Good request!")
        body = ''
        req.on('readable', () => {
            read = req.read()
            if (read)
            body += read;
        });
        req.on('end', () => {
            res.writeHead(200);
            res.end();
            handleBody(body)
        })
    } else {
        res.writeHead(403);
        res.end();
    }
}

function handleBody(body){
    var body = JSON.parse(body);
    if (body && body.token == token){
        // Put data to db
        var connection = mysql.createConnection({
            host     : `${settings.dbInfo.dbHost}:${settings.dbInfo.dbPort}`,
            user     : settings.dbInfo.dbUser,
            password : settings.dbInfo.dbPassword,
            database : settings.dbInfo.database
        });

        connection.connect(function(err) {
            if (err) throw err;
        });


    }
}

function insertInfo(connection){
    var insertQuery = ``;
    connection.query(insertQuery)
}


const server = http.createServer(requestListener);
server.listen(port);
console.log("listening to " + port)


