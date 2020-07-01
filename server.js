const express= require('express');
const cors = require('cors');
const database = require('./database');

const server = express();

server.use(express.json()); 
server.use(cors());

server.get('/produtos', async function(request, response) {  
   const dados = await database.read();
   return response.json(dados);
})

server.post('/produtos', async function(request, response) {
     const {produto, marca,valor, volume, quantidade} = request.body;
    await database.create({produto, marca, valor, volume, quantidade});
    response.status(204).send();
})

    // server.put('/produtos/:id', function(request, response) {
    //     const id = request.params.id;
    //     const {produto, marca, valor, volume, quantidade} = request.body; 

    //     for(let i = 0; i < produtos.length; i++) {
    //         if(produtos [i].produto == id) {
    //             produtos[i].produto = produto;
    //             produtos[i].marca = marca;
    //             produtos[i].valor = valor;
    //             produtos[i].volume = volume;
    //             produtos[i].quantidade = quantidade;
    //             break;  
    //         }
    //     }

    //     return response.status(204).send();
    // }) 

// server.delete('/produto/:id', function(request, response) {

//     const id = request.params.id

//     for(let i = 0; i < produtos.length; i++) {
//         if(produtos [i].nome == id) {
//             produtos.splice(i, 1);
//             break;
//         }
//     }

//     return response.status(204).send();
// })

server.listen(process.env.PORT || 3000);