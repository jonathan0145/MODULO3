var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer((req, res) => {
  if (req.url === "/") {
    let html = fs.readFileSync(__dirname + "/index.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  } else if (req.url === "/api" || req.url === "/api/") {
    //
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(beatles));
  } else {
    if (req.url.substring(0, 5) === "/api/") {
      let urlName = req.url.substring(5).replace("%20", " ");
      // [ {..}, {..}, {..}, {..}]
      //    B
      let beatle = beatles.find(
        (artista) => artista.name.toLowerCase() === urlName.toLowerCase()
      );
      if (!beatle) {
        error(res);
      } else {
        // SI SI EXISTE EL BEATLE
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(beatle));
      }
    } else {
      // req.url -----> /John Lennon
      let name = req.url.substring(1).replace("%20", " ");
      let beatle = beatles.find(
        (artista) => artista.name.toLowerCase() === name.toLowerCase()
      );
      let beatleHTML = fs.readFileSync(__dirname + "/beatle.html", "utf-8");
      if (!beatle) {
        error(res);
      } else {
        // SI EXISTE EL BEATLE
        beatleHTML = beatleHTML
          .replace("{titulo}", beatle.name)
          .replace("{nombre}", beatle.name)
          .replace("{nacimiento}", beatle.birthdate)
          .replace("{img}", beatle.profilePic);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(beatleHTML);
      }
    }
  }
})
.listen(3001, console.log("Running on PORT:3001"));

