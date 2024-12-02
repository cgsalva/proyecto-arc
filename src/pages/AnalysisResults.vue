<template>
	<div class="q-pa-md example-row-equal-width">

    <div class="flex justify-center">
      <div class="q-my-md q-mx-sm text-h5 text-center text-grey-10">Resultados</div>
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
            <q-toolbar-title class="text-h5 text-center text-grey-10">Detalle del resultado</q-toolbar-title>
            <q-btn flat v-close-popup round dense size="sm" icon="close" />
          </q-toolbar>
          <q-card-section class="scroll q-pb-lg">
            <div class="row q-px-xl">
              <div class="col q-px-md q-pb-lg">
                <p class="text-weight-regular text-h6 text-grey-10">Datos de registro</p>
                <table width="100%">
                  <tbody>
                    <tr>
                      <td width="30%" height="30px"><b>Titulo: </b></td>
                      <td width="70%">{{rowSelected.titulo}}</td>
                    </tr>

                    <tr>
                      <td height="30px"><b>Descripcion: </b></td>
                      <td>{{rowSelected.descripcion}}</td>
                    </tr>
                    <tr>
                      <td height="30px"><b>Fecha: </b></td>
                      <td>{{rowSelected.fecha}}</td>
                    </tr>
                    <tr>
                      <td height="30px"><b>Ubicacion: </b></td>
                      <td>{{rowSelected.ubicacion}}</td>
                    </tr>
                    <tr>
                      <td height="30px"><b>Estado: </b></td>
                      <td><q-badge :color="colorBadge(rowSelected.estado)" :label="rowSelected.estado" /></td>
                    </tr>
                  </tbody>
                </table>
                <div class="q-mt-lg" v-if="rowSelected.estado == 'Pendiente'">
                    <q-btn icon="close" class="q-mr-xs" size="sm" label="CANCELAR" color="red" @click="modalConfirmCancel=true" />
                </div>
                <div class="q-mt-lg" v-if="rowSelected.estado != 'Pendiente'">
                    <q-btn icon="delete" class="q-mr-xs" size="sm" label="ELIMINAR" color="red" @click="modalConfirmDelete=true" />
                    <q-btn color="primary" icon="print" size="sm" label="IMPRIMIR" @click="imprimir()" />
                </div>
              </div>
              <div class="col-12 col-md-7 q-px-md q-pb-lg">
                <p class="text-weight-regular text-h6 text-grey-10">Resultado</p>

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
                      <q-badge color="white" text-color="black" :label="'pH '+(rowSelected.datos.ph ? rowSelected.datos.ph.toFixed(2) : '')" />
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
                      <q-badge color="white" text-color="black" :label="(rowSelected.datos.turbidez ? rowSelected.datos.turbidez.toFixed(2) : '')+' NTU'" />
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
                      <q-badge color="white" text-color="black" :label="(rowSelected.datos.tds ? rowSelected.datos.tds.toFixed(2) : '')+' mg/L'" />
                    </div>
                  </q-linear-progress>
                  <div class="text-center">
                    <span class="q-mr-lg"><q-badge rounded color="green" label="< 600" /> Potable</span>
                    <span class="q-mr-lg"><q-badge rounded color="orange" label="600 - 900" /> Calidad Moderada</span>
                    <span class="q-mr-lg"><q-badge rounded color="red" label="> 900" /> No potable</span>
                  </div>
                </div>

                <!-- MENSAJE -->
                <q-card class="text-white" :class="colorBgResumen(rowSelected.estado)">
                  <q-card-section>
                    <span><b>Resumen:</b></span>
                    <ul v-if="rowSelected.estado != 'Pendiente'">
                      <li class="q-mb-lg">{{ resumenPh(rowSelected.datos.ph) }}</li>
                      <li class="q-mb-lg">{{ resumenTurbidez(rowSelected.datos.turbidez) }}</li>
                      <li>{{ resumenTDS(rowSelected.datos.tds) }}</li>
                    </ul>
                    <div class="text-center" v-if="rowSelected.estado == 'Pendiente'">
                      <q-spinner-hourglass
                        color="white"
                        size="3em"
                      />
                      <div>Esperando Resultados</div>
                    </div>
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
      <!-- 
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
-->
	  </div>
	</div>
</template>

<script setup>
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { ref, watch } from 'vue'
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

watch(analisis, (newAnalisis) => {
  if (rowSelected.value?.id) {
    const updatedRow = newAnalisis.find(item => item.id === rowSelected.value.id);
    if (updatedRow) {
      rowSelected.value = updatedRow; // Actualiza si el registro seleccionado existe en los datos nuevos
    } else {
      rowSelected.value = {}; // Si el registro fue eliminado, limpia la selección
    }
  }
}, { deep: true }); // Reactividad profunda para observar cambios en la colección


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
  if (valor >= 600 && valor <= 900) return 'orange'
  if (valor > 900) return 'red'
}

const colorBgResumen = (estado) => {
  if (estado == 'Pendiente') return 'bg-grey-6'
  if (estado == 'Bueno') return 'bg-green'
  if (estado == 'Malo') return 'bg-red'
  if (estado == 'Regular') return 'bg-orange-7'
}

const imprimir = () => print()

const resumenPh = (valor) => {
  if (valor == '') return ''
  valor = valor.toFixed(2)
  if (valor < 3) return `Un pH de ${valor} indica que el agua es muy ácida. Un pH menor a 3 es corrosivo y puede dañar tuberías, equipos y, sobre todo, afectar severamente a la flora, fauna y la salud humana si se consume o entra en contacto con ella.`
  if (valor >= 3 && valor < 6.5) return `Un pH de ${valor} indica que el agua es ácida. puede causar corrosión en tuberías y afectar su sabor, además de liberar metales tóxicos como plomo o cobre en el agua potable.`
  if (valor >= 6.5 && valor <= 8.5) return `Un pH de ${valor} indica que el agua es neutra. indica un equilibrio perfecto entre ácido y alcalino, sin predominancia de ninguno.`
  if (valor > 8.5) return `Un pH de ${valor} indica que el agua es alcalina o básica. Esto puede deberse a varias causas, entre las cuales se incluyen: Altos niveles de minerales alcalinos, productos químicos, desechos industriales o presencia de algas. Un pH alto puede tener implicaciones para la salud humana y para los ecosistemas acuáticos. `
}

const resumenTurbidez = (valor) => {
  if (valor == '') return ''
  valor = valor.toFixed(2)
  if (valor < 1) return `Una turbidez de ${valor} es un indicador de excelente calidad y suele estar asociada con un agua altamente limpia y transparente. Esto implica que contiene muy pocas partículas en suspensión, lo cual es especialmente importante en el contexto de agua potable y procesos sensibles que requieren agua de alta calidad.`
  if (valor >= 1 && valor < 3) return `Una turbidez de ${valor} indica que el agua tiene baja concentración de partículas en suspensión, como arcilla, limo, materia orgánica, microorganismos, y otras impurezas. Esto es un indicador positivo, es adecuada para consumo o uso según los estándares de calidad`
  if (valor >= 3 && valor <= 5) return `Una turbidez de ${valor} indica que el agua contiene una cantidad moderada de partículas en suspensión, Aunque es aceptable en ciertos contextos, como el agua potable según algunos estándares básicos, puede no ser ideal en términos de sabor o eficacia de desinfección.`
  if (valor > 5 && valor <= 10) return `Una turbidez de ${valor} indica una concentración significativa de partículas en suspensión que afecta negativamente su calidad. Este nivel de turbidez suele ser inaceptable para el consumo humano según los estándares internacionales y puede tener implicaciones importantes dependiendo del uso del agua.`
  if (valor > 10) return `Una turbidez de ${valor} indica una alta concentración de partículas en suspensión, lo que la hace claramente turbia y no apta para el consumo humano ni para muchos otros usos sensibles. Este nivel sugiere problemas significativos relacionados con contaminación o alteraciones ambientales.`
}

const resumenTDS = (valor) => {
  if (valor == '') return ''
  valor = valor.toFixed(2)
  if (valor < 300) return `Un TDS de ${valor} indica que el agua tiene un contenido muy bajo de sólidos disueltos, se considera agua de muy alta calidad para el consumo humano.`
  if (valor >= 300 && valor < 600) return `Un TDS de ${valor} indica que el agua tiene un contenido bajo de sólidos disueltos, este nivel suele asociarse con agua de sabor agradable y suficiente contenido mineral para ser saludable`
  if (valor >= 600 && valor < 900) return `Un TDS de ${valor} indica que el agua contiene una cantidad moderada de sólidos disueltos, como minerales, sales, y posiblemente compuestos orgánicos. puede no ser ideal para beber debido a su sabor más mineralizado y la posible presencia de contaminantes o excesos de ciertos minerales`
  if (valor >= 900 && valor < 1200) return `Un TDS de ${valor} indica que el agua contiene una cantidad elevada de sólidos disueltos, como minerales, sales, metales o compuestos orgánicos. puede contener excesos de ciertos minerales (como cloruros o sulfatos) o incluso contaminantes que podrían ser dañinos, suele tener un sabor notablemente salado, amargo o metálico, dependiendo de los compuestos presentes.`
  if (valor > 1200) return `Un TDS de ${valor} en el agua indica una concentración muy alta de sólidos disueltos, como minerales, sales, metales pesados o compuestos orgánicos. Este nivel suele asociarse con problemas significativos para su uso en consumo humano, agricultura e industria.`
}

</script>
