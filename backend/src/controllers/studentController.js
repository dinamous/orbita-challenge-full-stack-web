import Student from "../models/Student.js";
import crypto from "node:crypto";
import validator from "validator";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { Op } from "sequelize";
import 'dotenv/config'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later."
});

const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error", error: error.message });
};

export const createStudent = async (req, res) => {
  try {
    const { name, email, cpf, ra } = req.body;

    if (!name || !email || !cpf || !ra) {
      return res.status(400).json({ message: "All fields are required: name, email, cpf, ra" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!/^[0-9]{11}$/.test(cpf)) {
      return res.status(400).json({ message: "Invalid CPF format" });
    }



    const studentToBeCreated = {
      id: crypto.randomUUID(),
      name,
      email,
      cpf,
      ra,
    };

    const student = await Student.create(studentToBeCreated);
    return res.status(201).json({ message: "Student created successfully", student: { id: student.id, name: student.name, email: student.email, ra: student.ra } });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getAllStudents = [limiter, async (req, res) => {
  try {
    const { page = 1, itemsPerPage = 10, search = "" } = req.query;

    const where = {};
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }

    const { count, rows } = await Student.findAndCountAll({
      attributes: ["id", "name", "email", "ra", "cpf"],
      where,
      limit: parseInt(itemsPerPage, 10),
      offset: (parseInt(page, 10) - 1) * parseInt(itemsPerPage, 10),
    });

    const students = rows.map((student) => {
      return {
        ...student.toJSON(),
        cpf: student.cpf,
      };
    });

    return res.status(200).json({ students, total: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}];

export const getStudentById = [limiter, async (req, res) => {
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
}];

export const updateStudent = [limiter, async (req, res) => {
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

    await student.update(updatedData);
    return res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    return handleError(res, error);
  }
}];

export const deleteStudent = [limiter, async (req, res) => {
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
}];
