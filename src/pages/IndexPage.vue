<template>
  <div class="q-pa-md example-row-equal-width text-grey-10">
    <h3 class="text-weight-light text-center">Análisis de Calidad del Agua</h3>
    <h4 class="text-weight-light text-center">Proyecto de Arquitectura de Computadoras 2024</h4>
    <div class="text-center">
      <q-btn class="q-mx-xs" :to="pendiente ? '/analysis-results' : '/new-analysis'" icon="autorenew" color="grey-10" label="Iniciar analisis" outline />
      <q-btn class="q-mx-xs" icon="group" color="grey-10" label="Integrantes" outline @click="modalIntegrantes = true" />
    </div>
    <q-dialog v-model="modalIntegrantes">
      <q-card style="width: 450px; max-width: 80vw;">
        <q-toolbar>
          <q-toolbar-title>Integrantes</q-toolbar-title>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
        <q-card-section class="scroll" style="max-height: 80vh">
          <table width="100%" class="text-left q-ma-md">
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
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { onMounted, ref } from 'vue'

const modalIntegrantes = ref(false)
const pendiente = ref(false)
const analisis = ref([])

const fetchAnalisis = async () => {
  try {
    const analisisCollection = collection(db, 'analisis')
    const analisisSnapshot = await getDocs(analisisCollection)
    analisis.value = analisisSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).reverse()
  } catch (error) {
    console.error('Error getting documents: ', error)
  }
  pendiente.value = analisis.value.some(analysis => analysis.estado === 'Pendiente')
  console.log(pendiente.value)
}

onMounted(() => {
  fetchAnalisis()
})
</script>
