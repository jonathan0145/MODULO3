const fs = require('fs');
const http = require('http');
// commands/index.js

module.exports = {
    date(done){
        done(Date());
    },
    pwd(done){
        done(process.cwd());
    },
    ls(done){
        fs.readdir('.', "utf-8", function(err, files) {
            if (err) throw err;

            done(files.join("\n").trim());
        });
    },
    echo(done, input){
        done(input);
    },
    cat(done, filename){
        fs.readFile("./" + filename, "utf-8", (err, data) => {
			if (err) throw err;
			done(data);
		});
    },
    head(done, filename){
        fs.readFile("./" + filename, "utf-8", (err, data) => {
            if (err) throw err;

            data = data.split("\n").slice(0, 5).join("\n");
            done(data);
        });
    },
    tail(done, filename){
        fs.readFile("./" + filename, "utf-8", (err, data) => {
            if (err) throw err;

            data = data.split("\n").slice(-5).join("\n");
            done(data);
        });
    },
    curl(done, url){
        const req = http.request(url, { method: "GET"}, res => {
            res.on("data", response => {
                done(response);
            });
        });

        req.on("error", e => {
            throw e;
        })

        req.end();
    },
};