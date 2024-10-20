<template>
  <div class="q-pa-md example-row-equal-width">
    <div class="q-my-md text-h4 text-weight-light text-center">Nuevo Análisis</div>
    <div align="center" class="q-pa-md">
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-input class="q-mb-xs" v-model="text" label="TITULO">
          <template v-slot:prepend>
            <q-icon name="edit" />
          </template>
        </q-input>
        <q-input class="q-mb-xs" v-model="text" label="DESCRIPCION">
          <template v-slot:prepend>
            <q-icon name="edit_note" />
          </template>
        </q-input>
        <q-input class="q-mb-xs" v-model="text" label="FECHA" type="date">
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-input>
        <q-input class="q-mb-sm" v-model="text" label="UBICACION">
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-input>
        <q-btn color="primary" icon="check" label="GUARDAR" />
      </div>
    </div>
  </div>
</template>