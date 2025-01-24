<script setup lang="ts">
import { ref } from 'vue';

const students = ref([
  {
    id: "1",
    name: "maria",
    cpf: "123342",
    email: "maria@gmail.com",
    ra: "a123123"
  },
  {
    id: "12",
    name: "maria",
    cpf: "123342",
    email: "maria@gmail.com",
    ra: "a123123"
  },
  {
    id: "13",
    name: "maria",
    cpf: "123342",
    email: "maria@gmail.com",
    ra: "a123123"
  },
  {
    id: "14",
    name: "maria",
    cpf: "123342",
    email: "maria@gmail.com",
    ra: "a123123"
  },
  {
    id: "51",
    name: "maria",
    cpf: "123342",
    email: "maria@gmail.com",
    ra: "a123123"
  },
]);
</script>

<template>
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
      <tr v-for="student in students" :key="student.id">
        <td>{{ student.name }}</td>
        <td>{{ student.email }}</td>
        <td>{{ student.cpf }}</td>
        <td>{{ student.ra }}</td>
        <td>
          <v-btn icon="mdi-pencil" size="small" color="primary" rounded="lg" />
          <v-btn icon="mdi-delete" size="small" color="red-darken-1" rounded="lg" class="ml-1" />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
