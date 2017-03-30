var express             = require("express"),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer"),
    app                 = express();
    
// APP CONFIG
// mongoose.connect("mongodb://localhost/marias_website");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public")); // for our custom app.css
app.set("view engine", "ejs");
app.use(methodOverride("_method")); // for the PUT request in the EDIT ROUTE
app.use(expressSanitizer());

// MONGOOSE/MODEL SCHEMA
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//================
// RESTFUL ROUTES
//================
app.get("/", function(req, res){
    res.render("home", {page: "home"});
});

app.get("/home", function(req, res){
    res.render("home", {page: "home"});
});

app.get("/products", function(req, res){
    res.render("products", {page: "products"});
});

app.get("/features", function(req, res){
    res.render("features", {page: "features"});
});

// BLOG INDEX ROUTE - show list of all blogs sorted by date
// app.get("/blog", function(req, res){
//     Blog.find({}, null, {sort: {created: -1}}, function(err, blogs){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("blog", {page: "blog", blogs: blogs});
//         }
//     });
// });

// // NEW ROUTE - take us to the blog form
// app.get("/blog/new", function(req, res){
//     res.render("new", {page: "new"});
// })

// // CREATE ROUTE
// app.post("/blog", function(req, res){
//     req.body.blog.body = req.sanitize(req.body.blog.body);
//     Blog.create(req.body.blog, function(err, newBlog){
//         if(err){
//             res.render("new");
//         } else {
//             // redirect to the blog index
//             res.redirect("/blog");
//         }
//     });
// });

// // SHOW ROUTE
// app.get("/blog/:id", function(req, res){
//     Blog.findById(req.params.id, function(err, foundBlog){
//         if(err){
//             res.redirect("/blog");
//         } else {
//             res.render("show", {blog: foundBlog, page: "show"});
//         }
//     });
// });

app.get("/about", function(req, res){
    res.render("about", {page: "about"});
});

app.get("/contact", function(req, res){
    res.render("contact", {page: "contact"});
});


//======================================================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log(".....Server Started.....");
});