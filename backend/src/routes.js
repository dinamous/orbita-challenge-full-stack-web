import express from "express"
import { createUser, allUsers, deleteUser } from "./controllers/studentController.js"

const router = express.Router()

router.post("/create", createUser)
router.get("/all", allUsers)
router.delete("/remove:id", deleteUser)

export default router