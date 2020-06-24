const Pool = require('pg').Pool;

const pool = new Pool ({
    user: 'oixowmwjhcayhv' ,
    password: 'aa7305bbb4a0bca02ccacd2e6ba280e016b573b378b85f71e5ce30c55f3254ff',
    host:'ec2-34-192-173-173.compute-1.amazonaws.com',
    database: 'd62c57v0694u0i',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

const sqlCreate = `
    CREATE TABLE IF NOT EXISTS Listacompraprodutos
    (
        ID serial primary key,
        produto varchar(50) not null,
        marca varchar(50) not null,
        valor int not null,
        volume varchar(50) not null,
        quantidade int not null default 0,
        comprado boolean not null default false
    )
`;
pool.query(sqlCreate, function(error, result) {
    if(error)
         throw error

       console.log('Tabela criada com sucesso!');
  });

module.exports = {

async  create(produto, marca,valor, volume, quantidade) {
    const sql = `INSERT INTO Listacompraprodutos (produto, marca,valor, volume, quantidade)
                    VALUES ($1, $2, $3, $4, $5)`;

    const result =  await pool.query(sql,[produto, marca,valor, volume, quantidade]);

    return result.rowCount ;
},


async  read() {
    const sql = 'SELECT * FROM Listacompraprodutos'

    const result = await pool.query(sql);

    return  result.rows; 
}
}

