var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");
var PORT = process.env.PORT || 3000;

var app = express();
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/nytreact", { useNewUrlParser: true });

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nytreact";

mongoose.connect(MONGODB_URI);

app.get("/scrape", function (req, res) {


  axios.get("https://slashdot.org/").then(function (response) {

    var $ = cheerio.load(response.data);

    $("span.story-title").each(function (i, element) {

      var result = {};

      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      db.Article.findOne({ title: result.title }).then(function (dbFinder) {

        if (dbFinder) {

          return;

        }

        else {

          db.Article

            .create(result)

            .then(function (dbArticle) {

              res.send("Scrape Complete");

            })

            .catch(function (err) {

              res.json(err);

            });

        }

      });

    });

    res.redirect("/");

  });

});


app.get("/", function (req, res) {

  db.Article.find({}).populate("comments").then(function (data) {

    res.render("index", { articles: data });

  }).catch(function (err) {

    res.json(err);

  });

});


app.get("/articles/:id", function (req, res) {

  db.Article.findById(req.params.id).populate("comments").then(function (data) {

    res.json(data);

  }).catch(function (err) {

    res.json(err);

  });



});


app.post("/articles/:id", function (req, res) {


  db.Comment.create(req.body).then(function (dbComment) {

    return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: dbComment } }).then(function (dbRes) {

      res.redirect("/");

    });

  })

});


app.post("/articles/delete/:id", function (req, res) {

  db.Comment.remove({ _id: req.params.id }).then(function (dbRemove) {

    res.json(dbRemove);

  });

});


app.post("/articles/save/:id", function (req, res) {

  db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true }).then(function (dbRes) {

    res.redirect("/");

  })

})


app.post("/articles/unsave/:id", function (req, res) {

  db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false }).then(function (dbRes) {

    res.redirect("/");

  })

})



app.get("/savedarticles", function (req, res) {


  db.Article.find({ saved: true }).populate("comments").then(function (data) {

    res.render("saved", { articles: data });

  }).catch(function (err) {

    res.json(err);

  });

});


app.listen(PORT, function () {

  console.log("App running on port " + PORT + "!");

});