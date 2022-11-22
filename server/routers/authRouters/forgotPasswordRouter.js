import {Router} from "express"
import {emailSender} from "../../plugins/nodemailer.js";

const router = Router()

router.post("/api/recovery", (req, res) => {
    console.log("In password recovery")
    const userEmail = req.body.email
    console.log(req.body)
    emailSender(userEmail)
        .then(async () => {
            await res.send({data: "Sent email"})
        })
        .catch(errorMessage => {
            res.send({error: errorMessage})
        })
})

export default router