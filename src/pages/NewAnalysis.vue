<template>
  <div class="q-pa-md example-row-equal-width" v-if="pendiente == false">
    <div class="q-my-md text-h5 text-center">Nuevo Análisis</div>
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
        <q-btn color="primary" icon="sync" label="INICIAR ANALISIS" @click="guardar" />
      </div>
    </div>
  </div>
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
</template>

<script setup>
import { ref } from 'vue'

const pendiente = ref(false)

const titulo = ref('')
const descripcion = ref('')
const fecha = ref('')
const ubicacion = ref('')

const guardar = () => {
  if (titulo.value && descripcion.value && fecha.value && ubicacion.value) {
    /* Aqui iria codigo para guardar en la base de datos */
    pendiente.value = true
    alert(`titulo: ${titulo.value}, descripcion: ${descripcion.value}, fecha: ${fecha.value}, ubicacion: ${ubicacion.value}`)
  }
  
}

const cancelar = () => {
  pendiente.value = false
}

</script>