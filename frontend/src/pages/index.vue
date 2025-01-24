<template>
  <AppHeader />
  <Sidebar />
  <v-container>
    <StudentsTable />
  </v-container>
</template>

<script lang="ts" setup>
import Sidebar from '@/components/Sidebar.vue';
import StudentsTable from '@/components/StudentsTable.vue';
</script>
