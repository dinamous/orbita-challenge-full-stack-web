<template>
  <v-row>
    <v-col :cols="12" :md="8" class="d-flex align-center">
      <v-text-field v-model="search" clearable label="Digite sua busca" variant="solo" hide-details="auto" />
    </v-col>
    <v-col :cols="12" :md="4" class="d-flex justify-end align-center">
      <ButtonAddStudent :open="dialog" :student="selectedStudent" @update:open="dialog = $event" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="students"
        :items-length="total" :loading="loading" :search="search" item-value="name"
        items-per-page-text="Itens por página" loading-text="Carregando..." no-data-text="Nenhum aluno matriculado."
        @update:options="loadItems">
        <template #body="{ items }">
          <tr v-for="student in items" :key="student.id">
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ formatCPF(student.cpf) }}</td>
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
  {
    title: 'Nome',

    key: 'name',
  },
  { title: 'Email', key: 'email' },
  { title: 'CPF', key: 'cpf' },
  { title: 'RA', key: 'ra' },
  { title: 'Ações', key: 'action', sortable: false, },

]

const formatCPF = (cpf: string) => {
  if (!cpf) return "";
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

const loadItems = async ({
  page,
  itemsPerPage,
  sortBy = [],
}: {
  page: number;
  itemsPerPage: number;
  sortBy: Array<{ key: string; order: string }>;
}) => {
  const sortKey = sortBy?.[0]?.key || "name";
  const sortOrder = sortBy?.[0]?.order || "asc";

  await studentStore.fetchStudents({
    page,
    itemsPerPage,
    search: search.value,
    sortBy: sortKey,
    order: sortOrder,
  });
};



const editStudent = (student: Student) => {
  selectedStudent.value = student;
  dialog.value = true;
};


const onDeleteStudent = (id: string) => {
  studentToDelete.value = id;
  dialogDelete.value = true;
};

const confirmDelete = () => {
  if (studentToDelete.value) {
    studentStore.removeStudent(studentToDelete.value);
  }
  dialogDelete.value = false;
  studentToDelete.value = null;
};

const onSearch = () => {
  currentPage.value = 1;
  studentStore.fetchStudents({
    page: 1,
    itemsPerPage: itemsPerPage.value,
    search: search.value,
    sortBy: headers?.[0]?.key || "name",
    order: "asc",
  });
};

watch(search, onSearch);

onMounted(() => {
  loadItems({
    page: currentPage.value,
    itemsPerPage: itemsPerPage.value,
    sortBy: [{ key: headers?.[0]?.key || "name", order: "asc" }],
  });
});
</script>

<style scoped>
.ma-2 {
  margin: 8px;
}
</style>
