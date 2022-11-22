import {Router} from "express"
import {isAdmin} from "../../middleware/adminAuth.js";

const router = Router()

router.get("/api/session", (req, res) => {
    if (req.session.isLoggedIn) {
        res.send({data: req.session})
    } else {
        res.send({data: "Not logged in"})
    }
})
router.get("/api/sessiondestroy", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})

export default router