var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer(function(req, res){
    console.log(req.url);
    if (req.url === "/") {
        res.end("Server listening...");
    }

        fs.readFile(`./images${req.url}.jpg`,(err, data)=>{
            if (err) {
                res.writeHead(404,{"content-Type": "text/plain"});
                res.end("image not found");
            }else{
                res.writeHead(200,{"Content-Type": "image/jpg"});
                res.end(data);
            }
        })
    }).listen(1337, "localhost")


    // if(req.url === "/arcoiris_doge"){
    //     fs.readFile("./images/arcoiris_doge.jpg",(err, data)=>{
    //         if (err) {
    //             res.writeHead(404,{"content-Type": "text/plain"});
    //             res.end("image not found");
    //         }else{
    //             res.writeHead(200,{"Content-Type": "image/jpg"});
    //             res.end(data);
    //         }
    //     })
    // }
    //res.end("Server listening...");
// }).listen(1337, "localhost")