var http = require('http');
var url = require('url');
var querystring = require('querystring');

function onRequest(req, res) {
    var parsedUrl = url.parse(req.url, true);
    var path = parsedUrl.pathname;
    console.log('Request for ' + path + ' received');

    var qs = parsedUrl.query;
    var name = qs["name"];
    var gender = qs["gender"];
    var state = qs["state"];
    var address = qs["address"];
    var mobileno = qs["mobile"];
    var condition = qs["cb"];

    var htmlResponse =`
        <html>
        <head>
            <title>Employee Details</title>
            <style>
                    table {
                        width: 80%;
                        margin: auto;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #ccc;
                        padding: 8px;
                        text-align: left;
                    }
                </style>
        </head>
        <body>
            <h1 style="text-align: center;">Employee Details</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>State</th>
                    <th>Address</th>
                    <th>Mobile No</th>
                    <th>Condition</th>
                </tr>
                <tr>
                    <td>${name}</td>
                    <td>${gender}</td>
                    <td>${state}</td>
                    <td>${address}</td>
                    <td>${mobileno}</td>
                    <td>${condition}</td>
                </tr>
            </table>
        </body>
        </html>
    `;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(htmlResponse);
    res.end();
}

http.createServer(onRequest).listen(8000);
console.log('Server is running on port 8000...');
