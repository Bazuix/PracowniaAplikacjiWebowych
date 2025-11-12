const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const mime = require("mime-types");

function saveParam(paramsArray){
    const timestamp = Date.now();
    const fileName=`params_${timestamp}.json`;
    fs.writeFileSync(fileName, JSON.stringify(paramsArray,null,2));
}
http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    if(req.url === "/"){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Strona glowna');
        res.end();
    }else if(req.url === "/json"){
        const book ={
            title: "It",
            author: "Stephen King",
            genre:"Horror",
            pages:450
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(book));

    }else if(req.url === "/html"){
        const html =
            `<!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8"> 
                        <title>Html w kodzie</title> 
                    </head>
                    <body>
                        <h1>To jest html w kodzie node.js</h1>
                    </body>
                </html>
            `;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    }else if(req.url === "/html_file"){
        fs.readFile("page.html", "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Błąd: nie udało się wczytać pliku HTML");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            }
        });
    }
    else if(parsedUrl.pathname === "/get_params"){
        const queryParams = parsedUrl.query;
        let paramsArray = [];
        for(const[key,value] of Object.entries(queryParams)){
            paramsArray.push({[key]:value}) ;
        }
        saveParam(paramsArray);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ok:"ok"}));
    }
    else {
        const filePath = path.join(__dirname,"assets",parsedUrl.pathname);4
        fs.access(filePath,fs.constants.F_OK,(err) => {
            if (err) {
                res.writeHead(404,{ "Content-Type":"application/json" });
                res.end(JSON.stringify({error:"Plik nie znaleziony",path: parsedUrl.pathname}));
            }else{
                const mimeType = mime.lookup(filePath) || "application/octet-stream";
                res.writeHead(200,{"Content-Type":mimeType});
                fs.createReadStream(filePath).pipe(res);
            }
        })


    }
}).listen(8080,()=>{
    console.log("Server is running at http://localhost:8080");
});
