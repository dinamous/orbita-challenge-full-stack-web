<script setup lang="ts">
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();

const toggleSidebar = () => {
  appStore.toggleSidebar();
};
</script>
<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="toggleSidebar" />
    <v-app-bar-title>Meu App</v-app-bar-title>
    <template #append>
      <v-menu>
        <template #activator="{ props }">
          <v-avatar v-bind="props">
            <v-img cover src="https://dinamousdev.vercel.app/assets/avatar-transparente-9vTT8Jih.png" />
          </v-avatar>
        </template>

        <v-card min-width="">
          <v-list density="compact" :lines="false" nav>
            <v-list-item prepend-icon="mdi-account-outline" to="">
              <v-list-title>Meu Perfil</v-list-title>
            </v-list-item>
            <v-list-item prepend-icon="mdi-exit-to-app" to="">
              <v-list-title>Sair</v-list-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
</template>
