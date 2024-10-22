<template>
	<div class="q-pa-md example-row-equal-width">
    <div class="q-my-md text-h5 text-center">Resultados Detallados</div>

    <div class="q-pa-md">
	    <q-table
	    	flat bordered
	    	size="lg"
	      :rows="rows"
	      :columns="columns"
	      row-key="name"
	      hide-pagination>
	      <template v-slot:body="props">
	      	<q-tr :props="props" @click="onRowClick(props.row)">
	      		<q-td key="titulo" :props="props">
            	{{ props.row.titulo }}
          	</q-td>
          	<q-td key="ubicacion" :props="props">
            	{{ props.row.ubicacion }}
          	</q-td>
          	<q-td key="fecha" :props="props">
            	{{ props.row.fecha }}
          	</q-td>
		        <q-td key="estado" :props="props">
		          <div>
		          	<q-badge :color="colorBadge(props.row.estado)" :label="props.row.estado" />
		          </div>
		        </q-td>
		      </q-tr>
      	</template>
	    </q-table>
	    <q-dialog v-model="modal">
        <q-card style="width: 1000px; max-width: 80vw;">
          <q-toolbar>
              <q-toolbar-title>Detalle del resultado</q-toolbar-title>
              <q-btn flat v-close-popup round dense icon="close" />
            </q-toolbar>
          <q-separator />
          <q-card-section class="q-pt-md scroll" style="max-height: 80vh">
            <div class="row">
              <div class="col q-ma-sm">
                <table>
                  <tr>
                    <td><b>Titulo: </b></td>
                    <td>{{rowSelected.titulo}}</td>
                  </tr>
                  <tr>
                    <td><b>Descripcion: </b></td>
                    <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.</td>
                  </tr>
                  <tr>
                    <td><b>Fecha: </b></td>
                    <td>{{rowSelected.fecha}}</td>
                  </tr>
                  <tr>
                    <td><b>Ubicacion: </b></td>
                    <td>{{rowSelected.ubicacion}}</td>
                  </tr>
                  <tr>
                    <td><b>Estado: </b></td>
                    <td><q-badge :color="colorBadge(rowSelected.estado)" :label="rowSelected.estado" /></td>
                  </tr>
                </table>
              </div>
              <div class="col">
                <div class="q-mb-lg">
                  <span>Ph</span>
                  <q-linear-progress rounded size="20px" value="70%" color="green" class="q-mt-sm">
                    <div class="absolute-full flex flex-center">
                      <q-badge color="white" text-color="accent" label="9" />
                    </div>
                  </q-linear-progress>
                </div>
                <div class="q-mb-lg">
                  <span>Turbidez</span>
                  <q-linear-progress rounded size="20px" value="40%" color="green" class="q-mt-sm">
                    <div class="absolute-full flex flex-center">
                      <q-badge color="white" text-color="accent" label="30" />
                    </div>
                  </q-linear-progress>
                </div>
                <div>
                  <span>TDS</span>
                  <q-linear-progress rounded size="20px" value="80%" color="red" class="q-mt-sm">
                    <div class="absolute-full flex flex-center">
                      <q-badge color="white" text-color="accent" label="90" />
                    </div>
                  </q-linear-progress>
                </div>
              </div>
            </div>
            <q-card class="q-mt-lg bg-green text-white">
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </q-card-section>
            </q-card>
          </q-card-section>
          <q-separator />
        </q-card>
      </q-dialog>
	  </div>

	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const modal = ref(false)
const rowSelected = ref({})

const columns = [
  { name: 'titulo', align: 'center', label: 'Titulo', field: 'titulo' },
  { name: 'ubicacion', align: 'center', label: 'Ubicacion', field: 'ubicacion' },
  { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha' },
  { name: 'estado', align: 'center', label: 'Estado', field: 'estado' }
]

const rows = [
  {
    titulo: 'Río A',
    ubicacion: 'Santa Ana',
    fecha: '01-10-2024',
    estado: 'Pendiente',
  },
  {
    titulo: 'Río B',
    ubicacion: 'Santa Ana',
    fecha: '01-10-2024',
    estado: 'Malo',
  },
  {
    titulo: 'Lago B',
    ubicacion: 'Santa Ana',
    fecha: '02-10-2024',
    estado: 'Bueno',
  },
  {
    titulo: 'Lago C',
    ubicacion: 'Santa Ana',
    fecha: '03-10-2024',
    estado: 'Bueno',
  },
  {
    titulo: 'Río A',
    ubicacion: 'Santa Ana',
    fecha: '01-10-2024',
    estado: 'Bueno',
  },
  {
    titulo: 'Río B',
    ubicacion: 'Santa Ana',
    fecha: '01-10-2024',
    estado: 'Malo',
  },
  {
    titulo: 'Lago B',
    ubicacion: 'Santa Ana',
    fecha: '02-10-2024',
    estado: 'Bueno',
  },
  {
    titulo: 'Lago C',
    ubicacion: 'Santa Ana',
    fecha: '03-10-2024',
    estado: 'Bueno',
  },
]

const onRowClick = (row) => {
	rowSelected.value = row
	console.log(rowSelected.value)
	modal.value=true
}

const colorBadge = (estado) => {
	if (estado == 'Bueno') return 'green'
	if (estado == 'Malo') return 'red'
	if (estado == 'Pendiente') return 'grey'
}

</script>

