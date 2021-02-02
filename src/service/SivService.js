import axios from 'axios';
 
let rangoFecha= '2020-19-11'

export default class SivService {

    async getVentas() {
		let response = await axios.get('https://6831eb9f2977.ngrok.io/api.php/records/vueVentas?filter=Fecha,eq,'+rangoFecha+
		'&include=Fecha,IdCliente,ImpTotal&filter=Tipo,eq,1&order=IdVenta,desc').then(res => res.data.records );
		for( const[i,valor]  of response.entries()){
          
			let response2= await axios.get(`https://6831eb9f2977.ngrok.io/api.php/records/Clientes?filter=IdCliente,eq,${valor.IdCliente}`);
			response[i].RazonSocial = response2.data.records[0].RazonSocial
			//console.log(response,i);
		}


		return response
    }
    async getPresupuestos( rangoFecha ){
        let response = await axios.get('https://6831eb9f2977.ngrok.io/api.php/records/Presupuestos?filter=Fecha,eq,'+ rangoFecha+'&order=IdPresupuesto,desc')
        .then(res => res.data.records );

       for( const[i,valor]  of response.entries()){
          
             let response2= await axios.get(`https://6831eb9f2977.ngrok.io/api.php/records/vueVendedores?filter=Vendedor,eq,${valor.Vendedor}`);
             response[i].nombreVendedor = response2.data.records[0].Nombre
              console.log(response)
            } 

            return response
    }

	
}
