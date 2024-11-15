<template>
	<div class="q-pa-md example-row-equal-width">

    <div class="flex justify-center">
      <div class="q-my-md q-mx-sm text-h5 text-center">Resultados Detallados</div>
      <q-btn flat square @click="fetchAnalisis" icon="sync" size="md" />
    </div>

    <div class="q-pa-md">
	    <q-table
	    	flat bordered
	    	size="lg"
	      :rows="analisis"
	      :columns="columns"
	      row-key="name"
	      hide-pagination>
	      <template v-slot:body="props">
	      	<q-tr :props="props" @click="onRowClick(props.row)">
	      		<q-td key="titulo" :props="props">
            	{{ props.row.titulo || 'Sin titulo' }}
          	</q-td>
          	<q-td key="ubicacion" :props="props">
            	{{ props.row.ubicacion || 'Sin ubicacion' }}
          	</q-td>
          	<q-td key="fecha" :props="props">
            	{{ props.row.fecha || 'Sin fecha' }}
          	</q-td>
		        <q-td key="estado" :props="props">
		          <div>
		          	<q-badge :color="colorBadge(props.row.estado)" :label="props.row.estado" />
		          </div>
		        </q-td>
		      </q-tr>
      	</template>
	    </q-table>
	    <q-dialog
        v-model="modalDetalleResultado"
        maximized
        persistent
        transition-show="slide-up"
        transition-hide="slide-down"
        >
        <q-card style="">
          <q-toolbar>
            <q-toolbar-title class="text-center">Detalle del resultado</q-toolbar-title>
            <q-btn flat v-close-popup round dense size="sm" icon="close" />
          </q-toolbar>
          <q-card-section class="scroll q-pb-lg">
            <div class="row">
              <div class="col q-px-md q-pb-lg">
                <p class="text-weight-medium text-subtitle1">Datos de registro</p>
                <table>
                  <tbody>
                    <tr class="q-mb-lg">
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
                  </tbody>
                </table>
                <div class="q-mt-lg" v-if="rowSelected.estado == 'Pendiente'">
                    <q-btn icon="close" class="q-mr-xs" size="sm" label="CANCELAR" color="red" @click="modalConfirmCancel=true" />
                </div>
                <div class="q-mt-lg" v-if="rowSelected.estado != 'Pendiente'">
                    <q-btn icon="delete" class="q-mr-xs" size="sm" label="ELIMINAR" color="red" @click="modalConfirmDelete=true" />
                </div>
              </div>
              <div class="col-12 col-md-6 q-px-md q-pb-lg">
                <p class="text-weight-medium text-subtitle1">Resultado</p>
                <div class="q-mb-lg">
                  <span>Ph</span>
                  <q-linear-progress rounded size="20px" value="70%" color="green" class="q-mt-sm">
                    <div class="absolute-full flex flex-center">
                      <q-badge color="white" text-color="black" label="9" />
                    </div>
                  </q-linear-progress>
                </div>
                <div class="q-mb-lg">
                  <span>Turbidez</span>
                  <q-linear-progress rounded size="20px" value="40%" color="green" class="q-mt-sm">
                    <div class="absolute-full flex flex-center">
                      <q-badge color="white" text-color="black" label="30" />
                    </div>
                  </q-linear-progress>
                </div>
                <div class="q-mb-lg">
                  <span>TDS</span>
                  <q-linear-progress rounded size="20px" value="80%" color="red" class="q-mt-sm">
                    <div class="absolute-full flex flex-center">
                      <q-badge color="white" text-color="black" label="90" />
                    </div>
                  </q-linear-progress>
                </div>
                <q-card class="bg-green text-white">
                  <q-card-section>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="modalConfirmDelete" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="delete_forever" size="lg"  color="red" text-color="white" />
            <span class="q-ml-sm">¿Estas seguro que deseas eliminar este registro?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="CANCELAR" color="black" v-close-popup />
            <q-btn flat label="SI" color="black" @click="eliminarRegistro()" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="modalConfirmCancel" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="close" size="lg" color="red" text-color="white" />
            <span class="q-ml-sm">¿Estas seguro que deseas cancelar este analisis?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="CANCELAR" color="black" v-close-popup />
            <q-btn flat label="SI" color="black" @click="cancelarAnalisis()" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
	  </div>
	</div>
</template>

<script setup>
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { ref, computed, onMounted } from 'vue'

const analisis = ref([])
const rowSelected = ref({})

const modalDetalleResultado = ref(false)
const modalConfirmDelete = ref(false)
const modalConfirmCancel = ref(false)

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

const eliminarRegistro = () => {
  alert('se eliminaria el registro')
  modalDetalleResultado.value = false
}

const cancelarAnalisis = () => {
  alert('se cancelaria el analisis')
  modalDetalleResultado.value = false
}

const onRowClick = (row) => {
	rowSelected.value = analisis.value.find(analisis => analisis.id === row.id)
  console.log(rowSelected.value.estado)
	modalDetalleResultado.value=true
}

const colorBadge = (estado) => {
	if (estado == 'Bueno') return 'green'
	if (estado == 'Malo') return 'red'
	if (estado == 'Pendiente') return 'grey'
}


const fetchAnalisis = async () => {
  try {
    const analisisCollection = collection(db, 'analisis')
    const analisisSnapshot = await getDocs(analisisCollection)
    analisis.value = analisisSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error getting documents: ', error)
  }
}

onMounted(() => {
  fetchAnalisis()
})
</script>
