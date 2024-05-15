const http = require('http');
const url = require('url');
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
connectDB();
async function onRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    console.log('Request for ' + path + ' received');
    const qs = parsedUrl.query;
    const name = qs["name"];
    const gender = qs["gender"];
    const state = qs["state"];
    const address = qs["address"];
    const mobileno = qs["mobile"];
    const condition = qs["cb"];
    if (path.includes("/insert")) {
        await insertData(res, name, gender, state, address, mobileno, condition);
    } else if (path.includes("/delete")) {
        await deleteData(res, name);
    } else if (path.includes("/update")) {
        await updateData(res, name, mobileno);
    } else if (path.includes("/display")) {
        await displayTable(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}
async function insertData(res, name, gender, state, address, mobileno, condition) {
    try {
        const database = client.db('exp-6');
        const collection = database.collection('employee');
        const employee = { name, gender, state, address, mobileno, condition };
        const result = await collection.insertOne(employee);
        console.log(`${result.insertedCount} document inserted`);
        const htmlResponse = generateHtmlResponse([employee]);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(htmlResponse);
        res.end();
    } catch (error) {
        console.error('Error inserting data:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}
async function deleteData(res, name) {
    try {
        const database = client.db('exp-6');
        const collection = database.collection('employee');
        const filter = { name: name };
        const result = await collection.deleteOne(filter);
        console.log(`${result.deletedCount} document deleted`);
        if (result.deletedCount === 1) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Document deleted successfully');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Document not found');
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}
async function updateData(res, name, newMobile) {
    try {
        const database = client.db('exp-6');
        const collection = database.collection('employee');
        const filter = { name: name };
        const updateDoc = { $set: { mobileno: newMobile } };
        const result = await collection.updateOne(filter, updateDoc);
        console.log(`${result.modifiedCount} document updated`);
        if (result.modifiedCount === 1) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Mobile number updated successfully');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Name not found');
        }
    } catch (error) {
        console.error('Error updating data:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}
async function displayTable(res) {
    try {
        const database = client.db('exp-6');
        const collection = database.collection('employee');
        const employees = await collection.find({}).toArray();
        const htmlResponse = generateHtmlResponse(employees);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(htmlResponse);
        res.end();
    } catch (error) {
        console.error('Error displaying table:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}
function generateHtmlResponse(employees) {
    let tableRows = employees.map(emp => `
        <tr>
            <td>${emp.name}</td>
            <td>${emp.gender}</td>
            <td>${emp.state}</td>
            <td>${emp.address}</td>
            <td>${emp.mobileno}</td>
            <td>${emp.condition}</td>
        </tr>
    `).join('');
    return `
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
                ${tableRows}
            </table>
        </body>
        </html>
    `;
}
http.createServer(onRequest).listen(8000);
console.log('Server is running on port 8000...');