const Pool = require('pg').Pool;

const pool = new Pool ({
    user: 'oixowmwjhcayhv' ,
    password: 'aa7305bbb4a0bca02ccacd2e6ba280e016b573b378b85f71e5ce30c55f3254ff',
    host:'ec2-34-192-173-173.compute-1.amazonaws.com',
    database: 'd62c57v0694u0i',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

const sql = `INSERT INTO Listacompraprodutos (produto, marca,valor, volume, quantidade)
                    VALUES ($1, $2, $3, $4, $5)`;

const create = async () =>  {
try {
    const result =  await pool.query(sql,['Regrigerante', 'Coca-cola',10, '1LT', 10]);
    console.log(result.rowCount);
}catch(error) {
    console.log(error);
}
}

create();