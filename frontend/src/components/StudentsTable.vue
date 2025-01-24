<template>
  <v-row>
    <v-col cols="8">
      <v-text-field v-model="search" label="Digite sua busca" variant="outlined" />
    </v-col>
    <v-col cols="4">
      <ButtonAddStudent :open="dialog" :student="selectedStudent" @update:open="dialog = $event" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="students"
        :items-length="total" :loading="loading" :search="search" item-value="name" @update:options="loadItems">
        <template #body="{ items }">
          <tr v-for="student in items" :key="student.id">
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.cpf }}</td>
            <td>{{ student.ra }}</td>
            <td>
              <v-btn icon="mdi-pencil" size="small" color="primary" rounded="lg" @click="editStudent(student)" />
              <v-btn icon="mdi-delete" size="small" color="red-darken-1" rounded="lg" class="ml-1"
                @click="onDeleteStudent(student.id)" />
            </td>
          </tr>
        </template>
      </v-data-table-server>
    </v-col>
  </v-row>

  <v-dialog v-model="dialogDelete" width="auto">
    <v-card max-width="400" prepend-icon="mdi-account-alert-outline"
      text="Você está prestes a desmatricular este aluno. Tenha certeza de que está fazendo a ação correta."
      title="Desmatricular Aluno">
      <template #actions>
        <v-btn class="ms-auto" text="Desmatricular" @click="confirmDelete" />
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useStudentStore } from '@/stores/students';
import ButtonAddStudent from './ButtonAddStudent.vue';
import type { Student } from '../types/Student';

const { students, total, loading, search } = storeToRefs(useStudentStore());
const studentStore = useStudentStore();

const selectedStudent = ref<Student | null>(null);
const dialog = ref(false);
const dialogDelete = ref(false);
const itemsPerPage = ref(10);
const currentPage = ref(1);
const studentToDelete = ref<string | null>(null);

const headers = [
  { text: 'Nome', value: 'name' },
  { text: 'Email', value: 'email' },
  { text: 'CPF', value: 'cpf' },
  { text: 'RA', value: 'ra' },
  { text: 'Ações', value: 'actions', sortable: false },
];

// Função de carregamento de itens
const loadItems = async ({ page, itemsPerPage }: { page: number; itemsPerPage: number }) => {
  currentPage.value = page;
  await studentStore.fetchStudents({ page, itemsPerPage, search: search.value });
};

// Editar aluno
const editStudent = (student: Student) => {
  selectedStudent.value = student;
  dialog.value = true;
};

// Excluir aluno
const onDeleteStudent = (id: string) => {
  studentToDelete.value = id;
  dialogDelete.value = true;
};

// Confirmar exclusão
const confirmDelete = () => {
  if (studentToDelete.value) {
    studentStore.removeStudent(studentToDelete.value);
  }
  dialogDelete.value = false;
  studentToDelete.value = null;
};

// Função de busca
const onSearch = () => {
  currentPage.value = 1;
  studentStore.fetchStudents({ page: 1, itemsPerPage: itemsPerPage.value, search: search.value });
};

// Monitorar alterações no campo de busca
watch(search, onSearch);

// Carregar dados na montagem inicial
onMounted(() => {
  loadItems({ page: currentPage.value, itemsPerPage: itemsPerPage.value });
});
</script>

<style scoped>
.ma-2 {
  margin: 8px;
}
</style>
