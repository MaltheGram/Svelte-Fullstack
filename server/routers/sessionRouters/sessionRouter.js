import {Router} from "express"
import {getUserDataApi} from "../../middleware/adminAuth.js";

const router = Router()

router.get("/api/session", (req, res) => {
    if (req.session.isLoggedIn) {
        res.status(200).send({data: req.session})
    } else {
        res.status(400).send({data: "Not logged in"}) // TODO: Correct status code??? Checkup
    }
})
router.get("/api/sessiondestroy", (req, res) => {
    req.session.destroy()
    res.redirect("/api/session")
})

export default router