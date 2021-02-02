import axios from 'axios'


export default class MlService {

	getMlListado(offSet,rows,filtro) {
       /*  console.log('offset',offset);
        let response = axios.get('https://api.mercadolibre.com/sites/MLA/search?q='+filtro+'&limit='+ rows +'&offset=' + offSet).then(res => res.data);
        return response */

        let response = axios({
          url: 'https://api.mercadolibre.com/sites/MLA/search?q='+filtro+'&limit='+ rows +'&offset=' + offSet,
          method: 'GET' ,
          headers: { Authorization :"Bearer " + "APP_USR-1869836172739653-120918-18d27616c3dc730b6126de47b8627a2c-12846971" },
          data: {
           
            }} ).then(res => res.data);
        console.log( response)
            return response 

    }
    async getMlVentas(offSet,rows) {
      /* console.log('offset',offset);
      let response = axios.get('https://api.mercadolibre.com/orders/search/recent?seller=12846971&access_token=APP_USR-1869836172739653-120814-da39afc6611c0a7632eb18efb5c004da-12846971&limit='+ rows +'&offset=' + offSet).then(res => res.data);
      return response */
      
      let response = await axios({
        url: 'https://api.mercadolibre.com/orders/search/recent?seller=12846971&sort=date_desc&limit='+ rows +'&offset='+ offSet,
        method: 'GET' ,
        headers: { Authorization :"Bearer " + "APP_USR-1869836172739653-120918-18d27616c3dc730b6126de47b8627a2c-12846971" },
        data: {
          }} ).then(res => res.data);
         
          let i=0;
          let misIds='';
          console.log('ggggggg', response.results,i  )
          for( i in response.results){
           // console.log( response.results[i].order_items[0].item.id,i  )
            misIds = misIds + response.results[i].order_items[0].item.id + ',';
          }
           
          let response2 = await axios({
            url: ' https://api.mercadolibre.com/items?ids='+misIds.slice(0,misIds.length-1),
            method: 'GET' ,
            headers: { Authorization :"Bearer " + "APP_USR-1869836172739653-120918-18d27616c3dc730b6126de47b8627a2c-12846971" },
            data: {
              }} ).then(res => res.data);
              for( i=0;i<rows;i++){
                console.log('body',response2[i] )
                
                response.results[i].fotoproducto = response2[i].body.secure_thumbnail
            }
              response.results.forEach(element => console.log(element.order_items[0].item.id));


          console.log(response2 )


          return response 
  }

    getCustomersMedium() {
		return axios.get('assets/layout/data/customers-medium.json').then(res => res.data.data);
    }
async  getArticulosFull(paginas,filas) {

      let response = await axios.get('https://automatica.ml/api/api.php/articulosfull?page='+paginas+','+filas+'&order=id').then(res => res.data);
      console.log(response)
      return response
    
      }
  

    

    getCustomersLarge() {
		return axios.get('assets/layout/data/customers-large.json').then(res => res.data.data);
    }

    getCustomersXLarge() {
		return axios.get('assets/layout/data/customers-xlarge.json').then(res => res.data.data);
	}
}
