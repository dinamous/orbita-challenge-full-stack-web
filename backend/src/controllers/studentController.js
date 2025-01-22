import Student from "../models/Student.js";
import crypto from "node:crypto";

// Helper function to handle errors
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error", error: error.message });
};

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

    const studentToBeCreated = {
      id: crypto.randomUUID(),
      name,
      email,
      cpf,
      ra,
    };

    const student = await Student.create(studentToBeCreated);
    return res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    return handleError(res, error);
  }
};

/**
 * Get all students
 */
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
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
    const student = await Student.findByPk(id);

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

    await student.update({ name, email, cpf, ra });
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