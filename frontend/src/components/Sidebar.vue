<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { computed } from 'vue';

// Acessa a store e cria um estado computado vinculado à sidebar
const appStore = useAppStore();
const isSidebarOpen = computed(() => appStore.isSidebarOpen);
</script>


<template>
  <v-navigation-drawer v-model="isSidebarOpen">
    <v-list>
      <v-list-item prepend-icon="mdi-home">
        Dashboard
      </v-list-item>
      <v-list-item prepend-icon="mdi-account">
        Alunos
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
