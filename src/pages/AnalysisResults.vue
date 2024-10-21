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
	      v-model:pagination="pagination"
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
	    <div class="row justify-center q-mt-md">
	      <q-pagination
	        v-model="pagination.page"
	        color="grey-8"
	        :max="pagesNumber"
	        size="sm"
	      />
    	</div>
	  </div>

	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

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
  
]

const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 2,
      rowsPerPage: 3,
      rowsNumber: 1
    })

const onRowClick = (row) => alert(`${row.titulo} clicked`)

const colorBadge = (estado) => {
	if (estado == 'Bueno') return 'green'
	if (estado == 'Malo') return 'red'
	if (estado == 'Pendiente') return 'grey'
}

const pagesNumber = computed(() => Math.ceil(rows.length / pagination.value.rowsPerPage))
</script>

