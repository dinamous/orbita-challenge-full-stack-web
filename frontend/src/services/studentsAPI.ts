import axios from "axios";
import type { Student } from "../types/Student"; 

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const studentsAPI = {
  async getStudents(): Promise<Student[]> {
    const response = await api.get("/students");
    return response.data;
  },
  async getStudentById(id: string): Promise<Student> {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },
  async createStudent(student: Student): Promise<Student> {
    const response = await api.post("/students", student);
    return response.data;
  },
  async updateStudent(id: string, student: Student): Promise<Student> {
    const response = await api.put(`/students/${id}`, student);
    return response.data;
  },
  async deleteStudent(id: string): Promise<void> {
    await api.delete(`/students/${id}`);
  },
};
