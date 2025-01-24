<template>
  <v-row>
    <v-col>
      <!-- Componente ButtonAddStudent na parte superior -->
      <ButtonAddStudent :open="dialog" :student="selectedStudent" @update:open="dialog = $event" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-table fixed-header height="70vh">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>RA</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.ra">
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.cpf }}</td>
            <td>{{ student.ra }}</td>
            <td>
              <!-- Botão para editar, abre o modal passando o aluno -->
              <v-btn icon="mdi-pencil" size="small" color="primary" rounded="lg" @click="editStudent(student)" />
              <!-- Botão para excluir -->
              <v-btn icon="mdi-delete" size="small" color="red-darken-1" rounded="lg" class="ml-1" />
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ButtonAddStudent from './ButtonAddStudent.vue';
import type { Student } from '../types/Student';

// Dados de estudantes
const students = ref<Student[]>([
  { ra: '1', name: 'Maria', email: 'maria@mail.com', cpf: '12345678900' },
  { ra: '2', name: 'José', email: 'jose@mail.com', cpf: '98765432100' },
]);

const selectedStudent = ref<Student | null>(null);

// Controle da modal
const dialog = ref(false);

// Função chamada ao clicar no botão de editar
const editStudent = (student: Student) => {
  selectedStudent.value = student;
  dialog.value = true;
};
</script>
