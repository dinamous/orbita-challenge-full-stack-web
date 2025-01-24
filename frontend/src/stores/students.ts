/* eslint-disable @typescript-eslint/no-unused-vars */
// src/stores/student.js
import { defineStore } from "pinia";
import type { Student, StudentStore } from "../types/Student";
import { studentsAPI } from "@/services/studentsAPI";

export const useStudentStore = defineStore("student", {
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
    successMessage: "", // Adicionando variável de mensagem de sucesso
    search: "",
  }),

  actions: {
    async addStudent(student: Student) {
      this.loading = true;
      this.error = null; // Resetando erro
      this.successMessage = ""; // Resetando mensagem de sucesso

      try {
        await studentsAPI.createStudent(student);
        this.successMessage = "Aluno adicionado com sucesso!";
      } catch (error) {
        this.error = "Falha ao adicionar aluno.";
      } finally {
        this.loading = false;
        await this.fetchStudents();
      }
    },

    updateStudent(student: Student) {
      const index = this.students.findIndex((s) => s.ra === student.ra);
      if (index !== -1) {
        this.students[index] = student;
        this.successMessage = "Aluno atualizado com sucesso!"; // Mensagem de sucesso
      }
    },

    removeStudent(id: string) {
      this.students = this.students.filter((student) => student.ra !== id);
    },

    async fetchStudents({
      page = 1,
      itemsPerPage = 10,
      search = "",
    }: {
      page?: number;
      itemsPerPage?: number;
      search?: string;
    } = {}) {
      console.log("iniciou o fetch");
      this.loading = true;
      this.error = null; // Resetando erro
      this.successMessage = ""; // Resetando mensagem de sucesso

      try {
        const { students, total } = await studentsAPI.getStudents({
          page,
          itemsPerPage,
          search,
        });
        this.students = students;
        this.total = total;
        this.successMessage = "Alunos carregados com sucesso!"; // Mensagem de sucesso
      } catch (error) {
        this.error = "Falha ao carregar alunos.";
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getStudents: (state) => state.students,
    totalPages: (state) => Math.ceil(state.total / state.itemsPerPage), // Total de páginas
  },
});
