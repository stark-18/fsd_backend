const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    let data = {
        name : "John",
        age : 25,
    }
    if(req.url === "/getdata" && req.method === "GET"){
        res.end(JSON.stringify(data
        ));
    }else if(req.url === "/setdata" && req.method === "POST"){
        res.end( "Data received");   
    }
});
server.listen(9000, () => {
    console.log('Server running on port 9000');
}   
);