<template>
	<div class="p-grid">
		<div class="p-col-12">
			<div class="card">
                <Toast/>
				<Toolbar class="p-mb-4">
				
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
                    <Column header="Comprador">
                    <template #body="slotProps">
                        <span style="font-weight:bold">{{slotProps.data.buyer.first_name}} {{slotProps.data.buyer.last_name}}</span>
                        <p>{{slotProps.data.buyer.nickname}}</p>
                    </template>
                    </Column>
                    <Column header="Image" width="20px">
					<template #body="slotProps">
						<img :src="slotProps.data.fotoproducto"  width="40" />
					</template>
					</Column>
					<Column field="date_created" header="date_created" width="20px"></Column>
					<Column field="title" header="title">
                    </Column>
					
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

        
            this.mlService.getMlVentas(0, 5).then(data => {
				console.log(data);
                this.datasource = data.results;
                this.totalRecords = data.paging['total'];
                this.items = this.datasource;
                this.loading = false;
            });
      
    },
  
    methods: {
        buscarpubli(){
            console.log('buscarpubli',this.buscar)
              this.mlService.getMlVentas(0, 5 ).then(data => {
				console.log(data);
                this.datasource = data.results;
                this.totalRecords = data.paging['total'];
                this.items = this.datasource;
                this.loading = false;
            });
      
        },
        onPage(event) {
            this.loading = true;
console.log(event)
           this.mlService.getMlVentas(event.first, event.rows ).then(data => {
				console.log(data);
                this.datasource = data.results;
                this.totalRecords = data.paging['total'];
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