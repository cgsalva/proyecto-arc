<template>
	<div class="q-pa-md example-row-equal-width">

    <div class="flex justify-center">
      <div class="q-my-md q-mx-sm text-h5 text-center">Resultados</div>
    </div>

    <div class="q-pa-md">
	    <q-table
        title="Resultados"
	    	flat bordered
	    	size="lg"
	      :rows="analisis"
	      :columns="columns"
	      row-key="name"
        :filter="filter"
      >
        <template v-slot:top>
          <q-input outlined  dense debounce="300" v-model="filter" placeholder="Buscar analisis">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
	      <template v-slot:body="props">
	      	<q-tr :props="props" @click="onRowClick(props.row)" :class="props.row.estado == 'Pendiente' ? 'bg-grey-2' : ''">
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
            <q-toolbar-title class="text-h5 text-center">Detalle del resultado</q-toolbar-title>
            <q-btn flat v-close-popup round dense size="sm" icon="close" />
          </q-toolbar>
          <q-card-section class="scroll q-pb-lg">
            <div class="row q-px-xl">
              <div class="col q-px-md q-pb-lg">
                <p class="text-weight-regular text-h6">Datos de registro</p>
                <table>
                  <tbody>
                    <tr>
                      <td><b>Titulo: </b></td>
                      <td>{{rowSelected.titulo}}</td>
                    </tr>

                    <tr>
                      <td><b>Descripcion: </b></td>
                      <td>{{rowSelected.descripcion}}</td>
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
              <div class="col-12 col-md-7 q-px-md q-pb-lg">
                <p class="text-weight-regular text-h6">Resultado</p>

                <!-- Barra PH -->
                <div class="q-mb-xl">
                  <span>Ph (0 - 14)</span>
                  <q-linear-progress 
                    class="q-mt-sm" size="20px" rounded 
                    :indeterminate="rowSelected.estado == 'Pendiente'" 
                    :value="(rowSelected.datos.ph/14)*100+'%'" 
                    :color="colorBarraPh(rowSelected.datos.ph)"
                  >
                    <div v-show="rowSelected.estado != 'Pendiente'" class="absolute-full flex flex-center">
                      <q-badge color="white" text-color="black" :label="'pH '+rowSelected.datos.ph" />
                    </div>
                  </q-linear-progress>
                  <div class="text-center">
                    <span class="q-mr-lg"><q-badge rounded color="red" label="< 6.5" /> Ácido</span>
                    <span class="q-mr-lg"><q-badge rounded color="green" label="6.5 - 8.5" /> Neutro</span>
                    <span><q-badge rounded color="red" label="> 8.5" /> Alcalino</span>
                  </div>
                </div>

                <!-- Barra TURBIDEZ -->
                <div class="q-mb-xl">
                  <span>Turbidez (0 - 1000)</span>
                  <q-linear-progress 
                    class="q-mt-sm" size="20px" rounded
                    :indeterminate="rowSelected.estado == 'Pendiente'" 
                    :value="(rowSelected.datos.turbidez/1000)*100+'%'" 
                    :color="colorBarraTurbidez(rowSelected.datos.turbidez)"
                  >
                    <div v-show="rowSelected.estado != 'Pendiente'" class="absolute-full flex flex-center">
                      <q-badge color="white" text-color="black" :label="rowSelected.datos.turbidez+' NTU'" />
                    </div>
                  </q-linear-progress>
                  <div class="text-center">
                    <span class="q-mr-lg"><q-badge rounded color="green" label="< 3" /> Agua limpia</span>
                    <span class="q-mr-lg"><q-badge rounded color="orange" label="3 - 5" /> Turbidez aceptable</span>
                    <span><q-badge rounded color="red" label="> 5" /> Turbidez perceptible</span>
                  </div>
                </div>

                <!-- Barra TDS -->
                <div class="q-mb-xl">
                  <span>TDS (0 - 2000)</span>
                  <q-linear-progress 
                    class="q-mt-sm" size="20px" rounded
                    :indeterminate="rowSelected.estado == 'Pendiente'" 
                    :value="(rowSelected.datos.tds/2000)*100+'%'" 
                    :color="colorBarraTDS(rowSelected.datos.tds)"
                  >
                    <div v-show="rowSelected.estado != 'Pendiente'" class="absolute-full flex flex-center">
                      <q-badge color="white" text-color="black" :label="rowSelected.datos.tds+' mg/L'" />
                    </div>
                  </q-linear-progress>
                  <div class="text-center">
                    <span class="q-mr-lg"><q-badge rounded color="green" label="< 600" /> Potable</span>
                    <span class="q-mr-lg"><q-badge rounded color="orange" label="600 - 900" /> Calidad Moderada</span>
                    <span class="q-mr-lg"><q-badge rounded color="red" label="> 900" /> No potable</span>
                  </div>
                </div>

                <!-- MENSAJE -->
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
            <q-btn flat label="SI" color="black" @click="eliminarRegistro(rowSelected.id)" v-close-popup />
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
            <q-btn flat label="SI" color="black" @click="eliminarRegistro(rowSelected.id)" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      
      <q-dialog v-model="modalInfoPh" transition-show="rotate" transition-hide="rotate">
      <q-card>
        <q-card-section>
          <div class="text-h6">Terms of Agreement</div>
        </q-card-section>

        <q-card-section>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  
	  </div>
	</div>
</template>

<script setup>
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { ref } from 'vue'
import { useCollection } from 'vuefire';

const filter = ref('')

//aqui se obtiene la coleccion de la base de datos, usando vuefire
const analisis = useCollection(collection(db, 'analisis'))

const rowSelected = ref({})

const modalDetalleResultado = ref(false)
const modalConfirmDelete = ref(false)
const modalConfirmCancel = ref(false)

const columns = [
  { name: 'titulo', align: 'center', label: 'Titulo', field: 'titulo', sortable: true },
  { name: 'ubicacion', align: 'center', label: 'Ubicacion', field: 'ubicacion', sortable: true },
  { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha', sortable: true },
  { name: 'estado', align: 'center', label: 'Estado', field: 'estado' }
]

const eliminarRegistro = async (id) => {
  await deleteDoc(doc(db, 'analisis', id))
  modalDetalleResultado.value = false
}

const onRowClick = (row) => {
	rowSelected.value = analisis.value.find(analisis => analisis.id === row.id)
  console.log(rowSelected.value.estado)
	modalDetalleResultado.value=true
}

const colorBadge = (estado) => {
  if (estado == 'Pendiente') return 'grey'
	if (estado == 'Bueno') return 'green'
	if (estado == 'Malo') return 'red'
	if (estado == 'Regular') return 'orange'
}

const colorBarraPh = (valor) => {
  if (valor == '') return 'grey-5'
  if (valor < 6.5) return 'red'
  if (valor >= 6.5 && valor <= 8.5) return 'green'
  if (valor > 8.5) return 'red'
}

const colorBarraTurbidez = (valor) => {
  if (valor == '') return 'grey-5'
  if (valor < 3) return 'green'
  if (valor >= 3 && valor <= 5) return 'orange'
  if (valor > 5) return 'red'
}

const colorBarraTDS = (valor) => {
  if (valor == '') return 'grey-5'
  if (valor < 600) return 'green'
  if (valor >= 600 && valor <= 900) return 'green'
  if (valor > 900) return 'red'
}

</script>
