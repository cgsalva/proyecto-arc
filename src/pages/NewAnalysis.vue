<template>
  <div class="q-pa-md example-row-equal-width" v-if="pendiente == false">
    <div  class="q-my-md text-h5 text-center">Nuevo Análisis</div>
    <div align="center" class="q-pa-md">
      <div class="q-gutter-y-md column" style="max-width: 370px">
        <q-input class="q-mb-sm" dense v-model="titulo" label="TITULO">
          <template v-slot:prepend>
            <q-icon name="edit" />
          </template>
        </q-input>
        <q-input class="q-mb-sm" dense v-model="descripcion" label="DESCRIPCION">
          <template v-slot:prepend>
            <q-icon name="edit_note" />
          </template>
        </q-input>
        <q-input class="q-mb-sm" dense v-model="ubicacion" label="UBICACION">
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-input>
        <q-input class="q-mb-lg" dense v-model="fecha" label="FECHA" type="date">
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-input>
        <q-btn color="primary" to="/analysis-results" icon="sync" label="INICIAR ANALISIS" @click="guardar" />
      </div>
    </div>
  </div>
  <div class="q-pt-lg example-row-equal-width text-center" v-if="pendiente == true">
    <div class="q-my-md text-weight-regular text-h6 text-center">¡Actualmente se encuentra un análisis pendiente!</div>
    <q-btn outline label="Ir a resultados" to="/analysis-results" color="black"/>
  </div>
  <!--
  <div class="q-pa-md example-row-equal-width text-center" v-if="pendiente == true">
        <div class="q-my-md text-h6 text-center">Esperando Resultados</div>
        <div class="q-mt-md">
          <q-spinner-ios
              color="grey-9"
              size="3em"
            />
        </div>
    <q-btn class="q-mt-md" color="red" size="sm" icon="close" stack label="CANCELAR" @click="cancelar" />
  </div>
-->
</template>

<script setup>
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { computed, onMounted, ref } from 'vue'

const titulo = ref('')
const descripcion = ref('')
const fecha = ref('')
const ubicacion = ref('')
const pendiente = computed(() => analisis.value.some(analysis => analysis.estado === 'Pendiente'))
const analisis = ref([])

const guardar = async () => {
  if (titulo.value && descripcion.value && fecha.value && ubicacion.value) {
    await addDoc(collection(db, 'analisis'), {
      titulo: titulo.value,
      descripcion: descripcion.value,
      fecha: fecha.value,
      ubicacion: ubicacion.value,
      estado: 'Pendiente',
      datos: {
        ph: '',
        tds: '',
        turbidez: ''
      }
    })
    titulo.value = ''
    descripcion.value = ''
    fecha.value = ''
    ubicacion.value = ''
  }
}

const cancelar = () => {
  pendiente.value = false
}

const fetchAnalisis = async () => {
  try {
    const analisisCollection = collection(db, 'analisis')
    const analisisSnapshot = await getDocs(analisisCollection)
    analisis.value = analisisSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).reverse()
  } catch (error) {
    console.error('Error getting documents: ', error)
  }
  console.log(pendiente.value)
}

onMounted(() => {
  fetchAnalisis()
})

</script>
