const express = require("express");
const exphbs = require("express-handlebars");
const http = require("http");
const request = require("request");
const body_parser = require("body-parser");
const url = require("url");
const fs = require("fs");
const cheerio = require("cheerio");
const root = __dirname + "/css";
const app = express();
const server = http.Server(app);
const helpers = require(__dirname + "/helpers.js");

const styles = fs.readFileSync(
  __dirname + "/public/css/styles.min.css",
  "utf8"
);

const getPageMetadataFn = function getPageMetadata(page_url) {
  if (page_url.length > 0) {
    return new Promise(function (resolve, reject) {
      let domain = url.parse(page_url).hostname;

      if (domain.indexOf("www.") === 0) {
        /* Remove leading www */
        domain = domain.substr(4);
      }

      const r = request.get(page_url, function (err, res, body) {
        console.log(`processing ${page_url}...`);
        if (r !== undefined) {
          const $ = cheerio.load(body);
          const pageTitle =
            $('meta[property="og:title"]').attr("content") ||
            $('meta[property="twitter:text:title"]').attr("content") ||
            $("title").text();

          return resolve({
            title: pageTitle.trim(),
            "original-url": page_url,
            domain: domain,
          });
        }
      });
    });
  } else {
    return false;
  }
};

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(
  body_parser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.render("home", {
    title: "Link formatter",
    description: "A simple tool for converting URLs into HTML/Markdown links.",
    styles: styles,
  });
});

app.post("/", (req, res) => {
  let urls = req.body.urls.trim().split("\r");

  urls = urls.map(helpers.clean_url);

  let actions = urls.map(getPageMetadataFn);
  let results = Promise.all(actions);

  results.then((results) => {
    helpers.generate_code(
      results,
      {
        format: req.body.format,
        "wrap-list": req.body["wrap-list"],
        "show-domain": req.body["show-domain"],
      },
      res
    );
  });
});

app.use(express.static(__dirname + "/public"));

const listener = app.listen(3000, function () {
  console.log("Your app is running on port " + listener.address().port);
});
