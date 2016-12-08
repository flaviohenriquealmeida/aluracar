let connection = null;
const database = 'aluraCar'
const version = 1;
const stores = ['agendamentos'];

export class ConnectionFactory {

    getConnection() {
        
        return new Promise((resolve, reject) => {
            
            if(!connection) {
               
               var openRequest = window.indexedDB.open(database, version);

               openRequest.onupgradeneeded = (e: any) => {

                    stores.forEach(store => 
                        e.target.result.createObjectStore(store, { keyPath: "id", autoIncrement:true }));
               };

               openRequest.onsuccess = (e: any) => {

                   connection = e.target.result;
                   resolve(connection);
               };
               
               openRequest.onerror = (e: any) => {

                   reject(e.target.error);
               };

            } else {
                resolve(connection);
            }
            
        });

    }  
}