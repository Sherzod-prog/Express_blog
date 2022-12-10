const express = require("express");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");

const homePageController = require("./controllers/homePage");
const postsController = require("./controllers/getPosts");
const postsNewController = require("./controllers/postsNew");
const createPostsController = require("./controllers/createPost");
const createUserController = require("./controllers/createUser");
const storeUserController = require("./controllers/userStore");
const loginController = require("./controllers/login");
const loginStoreController = require("./controllers/loginStore");
const logoutController = require("./controllers/logout");

const app = express();

const validationMiddlewareController = require("./middleware/validationMiddleware");
const authMiddleware = require("./middleware/auth");
const redirectIfAuth = require("./middleware/redirect");

const MongoUrl =
  "mongodb+srv://Sherzod:s7FV9wW9BQ3WNXvt@cluster0.wwb4glh.mongodb.net/node_blog";
mongoose.connect(MongoUrl);

app.use(
  expressSession({
    secret: "sherzod",
    store: connectMongo.create({ mongoUrl: MongoUrl }),
  })
);
app.use(express.static("public"));
app.use(expressEdge.engine);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(connectFlash());

app.set("views", `${__dirname}/views`);

app.use("*", (req, res, next) => {
  app.locals.auth = req.session.userId;
  next();
});

app.get("/", homePageController);
app.get("/post/:id", postsController);
app.get("/posts/new", authMiddleware, postsNewController);
app.get("/reg", redirectIfAuth, createUserController);
app.post(
  "/posts/create",
  authMiddleware,
  validationMiddlewareController,
  createPostsController
);
app.post("/auth/reg", storeUserController);
app.get("/login", redirectIfAuth, loginController);
app.post("/auth/log", loginStoreController);
app.get("/logout", authMiddleware, logoutController);
app.use((req, res) => res.render("not_found"));

app.listen(5000, () => {
  console.log("Server has bin started on port 5000...");
});
