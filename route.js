const mongoose = require("mongoose");

const Wish = require("./models/wish");

module.exports = (app) => {
  // home route
  let data = ["eat", "sleep", "code", "playing", "Tapas Mondal"];
  app.get("/", (req, res) => {
    Wish.find({}).then((res2) => {
      console.log("wishlist rendering");
      res.render("home", { wish: res2 });
    });
    //res.render("home", { wish: data });
  });
  app.get("/about", (req, res) => {
    res.render("about", { wish: data });
  });
  app.get("/user/:id", (req, res) => {
    res.render("user", { data: data, id: req.params.id });
  });

  // post route ------------------------------------------------------
  app.post("/sendWish", (req, res) => {
    const body = req.body;
    console.log("sendWish-body", body);
    // data.push(...body);
    // res.send(body);

    const Item = new Wish({
      wish: body[0],
    });
    Item.save().then((res2) => {
      console.log("saved", res2);
      res.send(res2);
    });
  });
  // Delete-----------------------------------------------------------
  app.delete("/remove/:id", (req, res) => {
    const wishname = req.params.id;
    console.log("sendWish-body", wishname);
    // data = data.filter((item) => {
    //   if (item) {
    //     if (item !== wishname) return item;
    //   }
    // });
    // res.send({ data: data });
    Wish.findOneAndDelete({ wish: wishname }).then((res2) => {
      console.log("deleted", res2);
      res.send({ data: res2 });
    });
  });

  // send file
  app.get("/serveFile", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  app.get("/testdata", (req, res) => {
    res.send({ data: "this is testdata" });
    res.end();
  });
};
