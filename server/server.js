const express = require("express")
const mongodb_routes = require("./routes/mongodb.routes")
const nutrion_api_routes = require("./routes/nutrition_api.routes")
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use('/mongodb', mongodb_routes)
app.use('/api', nutrion_api_routes)






app.listen(9000, () => console.log("Server is up!"))