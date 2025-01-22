import express from "express"
import { deleteStudent, getAllStudents, createStudent, updateStudent, getStudentById } from "./controllers/studentController.js"

const router = express.Router()

router.post("/create", createStudent)
router.get("/all", getAllStudents)
router.get("/list/:id", getStudentById)
router.delete("/remove/:id", deleteStudent)
router.put("/update/:id", updateStudent)

export default router