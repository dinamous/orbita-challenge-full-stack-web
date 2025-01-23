<template>
  <v-app-bar>
    <v-app-bar-nav-icon />
    <v-app-bar-title>Meu App</v-app-bar-title>
    <template #append>
      <v-btn icon>
        <v-badge info>
          <v-icon icon="mdi-bell-outline" />
        </v-badge>
      </v-btn>
      <v-avatar>
        <v-img src="https://dinamousdev.vercel.app/assets/avatar-transparente-9vTT8Jih.png" />
      </v-avatar>
    </template>
  </v-app-bar>
</template>