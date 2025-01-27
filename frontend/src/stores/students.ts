/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from "pinia";
import type { Student, StudentStore } from "../types/Student";
import { studentsAPI } from "@/services/studentsAPI";

export const useStudentStore = defineStore("student", {
  state: (): StudentStore => ({
    students: [],
    student: {
      id: "",
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
    successMessage: "",
    search: "",
  }),

  actions: {
    async addStudent(student: Student) {
      this.loading = true;
      this.error = null;
      this.successMessage = "";

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

    async updateStudent(student: Student) {
      this.loading = true;
      this.error = null;
      this.successMessage = "";

      try {
        await studentsAPI.updateStudent(student.id, student);
        this.successMessage = "Aluno atualizado com sucesso!";
      } catch (error) {
        this.error = "Falha ao atualizar aluno.";
      } finally {
        this.loading = false;
        await this.fetchStudents();
      }
    },

    async removeStudent(id: string) {
      try {
        await studentsAPI.deleteStudent(id);
        this.successMessage = "Aluno removido com sucesso!";
      } catch (error) {
        this.error = "Falha ao remover aluno.";
      } finally {
        this.loading = false;
        await this.fetchStudents();
      }
    },

    async fetchStudents({
      page = 1,
      itemsPerPage = 10,
      search = "",
      sortBy = "name",
      order = "asc",
    }: {
      page?: number;
      itemsPerPage?: number;
      search?: string;
      sortBy?: string;
      order?: string;
    } = {}) {
      console.log("iniciou o fetch");
      this.loading = true;
      this.error = null;
      this.successMessage = "";

      try {
        const { students, total } = await studentsAPI.getStudents({
          page,
          itemsPerPage,
          search,
          sortBy,
          order,
        });
        this.students = students;
        this.total = total;
        this.successMessage = "Alunos carregados com sucesso!";
      } catch (error) {
        this.error = "Falha ao carregar alunos.";
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getStudents: (state) => state.students,
    totalPages: (state) => Math.ceil(state.total / state.itemsPerPage),
  },
});
