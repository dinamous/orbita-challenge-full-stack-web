import Student from "../models/Student.js";
import crypto from "node:crypto";
import validator from "validator";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";

// Helper function to handle errors
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error", error: error.message });
};

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit to 100 requests per IP
  message: "Too many requests, please try again later."
});

/**
 * Create a new student
 */
export const createStudent = async (req, res) => {
  try {
    const { name, email, cpf, ra } = req.body;

    // Validate required fields
    if (!name || !email || !cpf || !ra) {
      return res.status(400).json({ message: "All fields are required: name, email, cpf, ra" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!/^[0-9]{11}$/.test(cpf)) {
      return res.status(400).json({ message: "Invalid CPF format" });
    }

    const hashedCpf = await bcrypt.hash(cpf, 10);

    const studentToBeCreated = {
      id: crypto.randomUUID(),
      name,
      email,
      cpf: hashedCpf,
      ra,
    };

    const student = await Student.create(studentToBeCreated);
    return res.status(201).json({ message: "Student created successfully", student: { id: student.id, name: student.name, email: student.email, ra: student.ra } });
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Get all students
 */
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({ attributes: ["id", "name", "email", "ra", "cpf"] });
    return res.status(200).json(students);
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Get a single student by ID
 */
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id, { attributes: ["id", "name", "email", "ra", "cpf"] });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json(student);
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Update a student by ID
 */
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, cpf, ra } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (cpf && !/^[0-9]{11}$/.test(cpf)) {
      return res.status(400).json({ message: "Invalid CPF format" });
    }

    const updatedData = { name, email, ra };

    if (cpf) {
      updatedData.cpf = await bcrypt.hash(cpf, 10);
    }

    await student.update(updatedData);
    return res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Delete a student by ID
 */
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.destroy();
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    return handleError(res, error);
  }
};
