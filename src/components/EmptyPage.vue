<template>
	<div class="p-grid">
		<div class="p-col-12">
			<div class="card">
                <Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2"   />
						<Button label="Delete" icon="pi pi-trash" class="p-button-danger"   />
					</template>
                   <template v-slot:right>
					<div class="p-col-12 p-md-4">
                        <div   >
                            <Button label="Buscar" @click="buscarpubli"/>
                            <InputText v-model="buscar" placeholder="Keyword"/>
                        </div>
                    </div>
                   </template>

				</Toolbar>
				<DataTable :value="items" :lazy="true" :paginator="true" :rows="5"
					:totalRecords="totalRecords" :loading="loading"   @page="onPage($event)" class="p-datatable-striped" paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    :rowsPerPageOptions="[5,10,15]"
                    currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords}">
                    
                    <Column field="codprov" width="100px"></Column>
					<Column field="marca" header="Marca" width="20px"></Column>
					<Column field="codarti" header="Codigo"></Column>
					<Column field="descripcion" header="Descripcion"></Column>
					<Column field="moneda" header="Moneda"></Column>
					<Column field="precio" header="Precio"></Column>


				</DataTable>
			</div>
		</div>
	</div>
</template>

<script>
 
import MlService from '../service/MlService';
export default {
 data() {
        return {
            loading: false,
            totalRecords: 0,
            items: null,
            filters: {},
            buscar: '            '
        }
    },
    datasource: null,
    mlService: null,
    created() {
		this.mlService = new MlService();
		console.log('creado');
    },
    mounted() {
        this.loading = true;

        
            this.mlService.getArticulosFull(1, 5).then(data => {
				console.log(data);
                this.datasource = data.articulosfull;
                this.totalRecords = data._results;
                this.items = this.datasource;
                this.loading = false;
            });
      
    },
  
    methods: {
        buscarpubli(){
            console.log('buscarpubli',this.buscar)
              this.mlService.getArticulosFull(0, 5,this.buscar).then(data => {
				console.log(data);
                this.datasource = data.articulosfull;
                this.totalRecords = data._results;
                this.items = this.datasource;
                this.loading = false;
            });
      
        },
        onPage(event) {
            this.loading = true;
console.log(event)
           this.mlService.getArticulosFull(event.first, event.rows, this.buscar).then(data => {
				console.log(data);
                this.datasource = data.articulosfull;
                this.totalRecords = data._results;
                this.items = this.datasource;
                this.loading = false;
            });
           
        }
    }
}
</script>

<style scoped lang="scss">
.table-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.product-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
	width: 150px;
	margin: 0 auto 2rem auto;
	display: block;
}

.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.product-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.status-instock {
		background: #C8E6C9;
		color: #256029;
	}

	&.status-outofstock {
		background: #FFCDD2;
		color: #C63737;
	}

	&.status-lowstock {
		background: #FEEDAF;
		color: #8A5340;
	}
}
</style>