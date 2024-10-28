<template>
  <div class="q-pa-md example-row-equal-width">
    <h3 class="text-weight-light text-center">Análisis de Calidad del Agua</h3>
    <h4 class="text-weight-light text-center">Proyecto de Arquitectura de Computadoras 2024</h4>
    <div class="text-center">
      <q-btn class="q-mx-xs" to="/new-analysis" icon="autorenew" color="dark" label="Iniciar analisis" outline />
      <q-btn class="q-mx-xs" icon="group" color="dark" label="Integrantes" outline @click="modalIntegrantes = true" />
    </div>
    <q-dialog v-model="modalIntegrantes">
      <q-card style="width: 400px; max-width: 80vw;">
        <q-toolbar>
          <q-toolbar-title>Integrantes</q-toolbar-title>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
        <q-separator />
        <q-card-section class="q-pt-md scroll" style="max-height: 80vh">
          <table width="100%" class="text-center">
            <thead>
              <tr>
                <th>Apellidos</th>
                <th>Nombres</th>
                <th>Carnet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Baños Martínez</td>
                <td>Elvis Rodrigo</td>
                <td>BM20001</td>
              </tr>
              <tr>
                <td>Colón Guevara</td>
                <td>Amado Salvador</td>
                <td>CG18046</td>
              </tr>
              <tr>
                <td>Cartagena Guzmán</td>
                <td>Brandon Steven</td>
                <td>CG21075</td>
              </tr>
              <tr>
                <td>Ávila Marroquín</td>
                <td>Gerardo Alfonso</td>
                <td>AM19052</td>
              </tr>
              <tr>
                <td>Linares Chacón</td>
                <td>Álvaro Isai</td>
                <td>LC22004</td>
              </tr>
              <tr>
                <td>Zarceño Rivas</td>
                <td>Diego José</td>
                <td>ZR22007</td>
              </tr>
            </tbody>
          </table>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modalIntegrantes = ref(false)

</script>
