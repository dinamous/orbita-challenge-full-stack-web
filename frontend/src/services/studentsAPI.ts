import axios from "axios";
import type { Student } from "../types/Student";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const studentsAPI = {
  async getStudents({
    page = 1,
    itemsPerPage = 10,
    search = "",
  }: { page?: number; itemsPerPage?: number; search?: string } = {}): Promise<{
    students: Student[];
    total: number;
  }> {
    const response = await api.get("/student/all", {
      params: {
        page,
        itemsPerPage,
        search,
      },
    });
    return response.data;
  },
  async getStudentById(id: string): Promise<Student> {
    const response = await api.get(`/student/${id}`);
    return response.data;
  },
  async createStudent(student: Student): Promise<Student> {
    const response = await api.post("/student/create", student);
    return response.data;
  },
  async updateStudent(id: string, student: Student): Promise<Student> {
    const response = await api.put(`/student/update/${id}`, student);
    return response.data;
  },
  async deleteStudent(id: string): Promise<void> {
    await api.delete(`/student/remove/${id}`);
  },
};
