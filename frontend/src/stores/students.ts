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
    loading: false,
    error: null,
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

    async fetchStudents() {
      this.loading = true;
      try {
        this.students = await studentsAPI.getStudents();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getStudents: (state) => state.students,
  },
});
