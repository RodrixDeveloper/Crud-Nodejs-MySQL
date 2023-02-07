const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");

const app = express();

//Importando rutas
const customerRoutes = require("./routes/customer.js");
const { urlencoded } = require("express");

//settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Middleware
app.use(morgan("dev"));
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "",
      port: 3306,
      database: "crudnodejs",
    },
    "single"
  )
);

app.use(express.urlencoded({ extended: false }));

//routes
app.use("/", customerRoutes);

//archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

// start server
app.listen(app.get("port"), () => {
  console.log("Servidor en el puerto 3000");
});
