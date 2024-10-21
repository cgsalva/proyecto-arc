<template>
  <div class="q-pa-md example-row-equal-width">
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
        <q-btn color="primary" icon="check" label="GUARDAR" @click="guardar" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const titulo = ref('')
const descripcion = ref('')
const fecha = ref('')
const ubicacion = ref('')

const guardar = () => {
  alert(`titulo: ${titulo.value}, descripcion: ${descripcion.value}, fecha: ${fecha.value}, ubicacion: ${ubicacion.value}`)
}

</script>