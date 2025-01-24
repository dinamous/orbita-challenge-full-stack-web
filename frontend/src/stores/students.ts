// src/stores/student.js
import { defineStore } from 'pinia';
import type { Student, StudentStore } from '../types/Student';
import { studentsAPI } from '@/services/studentsAPI';

export const useStudentStore = defineStore('student', {
  state: (): StudentStore => ({
    students: [],
    student: {
      name: "",
      email: "",
      cpf: "",
      ra: "",
    },
    total: 0, 
    currentPage: 1, 
    itemsPerPage: 10, 
    loading: false,
    error: null,
    search: ""
  }),

  actions: {
    addStudent(student: Student) {
      this.students.push(student);
    },

    updateStudent(student: Student) {
      const index = this.students.findIndex(s => s.ra === student.ra);
      if (index !== -1) {
        this.students[index] = student;
      }
    },

    removeStudent(id: string) {
      this.students = this.students.filter(student => student.ra !== id);
    },

    async fetchStudents({ page = 1, itemsPerPage = 10, search = '' }: { page?: number; itemsPerPage?: number; search?: string }) {
  this.loading = true;
  try {
    const { students, total } = await studentsAPI.getStudents({ page, itemsPerPage, search });
    this.students = students;
    this.total = total;
  } catch (error) {
    this.error = error;
  } finally {
    this.loading = false;
  }
}
  },

  getters: {
    getStudents: (state) => state.students,
    totalPages: (state) => Math.ceil(state.total / state.itemsPerPage), // Total de páginas
  },
});
