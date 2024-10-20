<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar align="center">
        <q-toolbar-title class="text-h4 text-weight-medium">Análisis de Calidad del Agua 2024</q-toolbar-title>
      </q-toolbar>
      <q-tabs align="center">
        <q-route-tab to="/" icon="home" label="INICIO" />
        <q-route-tab to="/analizar" icon="autorenew" label="ANALIZAR" />
        <q-route-tab to="/page3" icon="article" label="RESULTADOS" />
        <q-route-tab to="/page3" icon="info" label="ACERCA DE" />
      </q-tabs>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>