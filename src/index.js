import app from "./app.js"
import routes from "./route.js"
app.use("/api", routes)
const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`server is listening at ${port}`)
})