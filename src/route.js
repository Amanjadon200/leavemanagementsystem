import express from "express"
import leaveRouter from "./modules/leave/leave.route.js"
import partnerRouter from "./modules/partner/partner.route.js"
const routes = express.Router()

const defaultRoutes = [
    {
        route: leaveRouter,
        path: "/leave"

    },
    {
        route: partnerRouter,
        path: "/partner"
    }
]
defaultRoutes.forEach((route) => {
    routes.use(route.path, route.route)
})
export default routes