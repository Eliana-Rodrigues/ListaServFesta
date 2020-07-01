const express= require('express');
const cors = require('cors');
const database = require('./database');

const server = express();

server.use(express.json()); 
server.use(cors());
const produtos = [
    { produto: 'Vinho', marca: 'San_German', valor: 18.00 , volume: 750 +'ML', quantidade:10 },
    { produto: 'Whisky',marca: 'Red_Label', valor: 90.00, volume: 900 +'ML', quantidade:3 },
    { produto: 'Refrigerante',marca: 'Coca-Cola', valor: 6.00, volume: 2 +'L', quantidade:15 },
    { produto: 'Suco',marca: 'Kmais', valor:10.00, volume: 1.8 +'L', quantidade:9 },
    { produto: 'Cerveja',marca: 'Skol', valor:4.00, volume: 350 +'ML', quantidade:20 },
    { produto: 'Salgadinho',marca: 'Torcidas', valor:2.50, volume: 80 +'Gr', quantidade:20 },
    { produto: 'Carvão',marca: 'Brazero', valor:8.50, volume: 2.5 +'KG', quantidade:20 },
]

server.get('/produtos', async function(request, response) { 
   const dados = await database.read();
   return response.json(dados);
})

server.post('/produtos', function(request, response) {
     const {produto, marca,valor, volume, quantidade} = request.body;
await database.create({produto, marca, valor, volume, quantidade});
    response.status(204).send();
})

server.put('/produtos/:id', function(request, response) {
    const id = request.params.id;
    const {produto, marca, valor, volume, quantidade} = request.body; 

    for(let i = 0; i < produtos.length; i++) {
        if(produtos [i].produto == id) {
            produtos[i].produto = produto;
            produtos[i].marca = marca;
            produtos[i].valor = valor;
            produtos[i].volume = volume;
            produtos[i].quantidade = quantidade;
            break;  
        }
    }

    return response.status(204).send();
}) 

server.delete('/produto/:id', function(request, response) {

    const id = request.params.id

    for(let i = 0; i < produtos.length; i++) {
        if(produtos [i].nome == id) {
            produtos.splice(i, 1);
            break;
        }
    }

    return response.status(204).send();
})

server.listen(process.env.PORT || 3000);