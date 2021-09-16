//require('dotenv').config()

const express = require('express')
const cors = require('cors')
const Client = require('pg').Client

let db

if (process.env.NODE_ENV === "production") {
    db = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        }
    })
}else{
    db = new Client({
        database: "db_profil",
        host: "localhost",
        user: "postgres",
        password: "Tengil48!",
        port : 5432
    })
}

db.connect()

const app = express()

app.use(express.json())
app.use(cors())
app.get('/' , (req , res)=>{
    db.query(`select * from tb_user`)
    .then((table) => res.json({ 
        status: true,
        data: table.rows 
    }))
    .catch((err) => res.json({ error: err }))
})

app.post('/insert' , (req , res)=>{
    db.query(`insert into tb_user(nama, alamat, no_telp) values($1, $2, $3) returning *`, [
        nama, alamat, no_telp
    ])
    .then((table) => res.json({ data: table.rows[0] }))
    .catch((err) => res.json({ error: err }))
})

app.listen(process.env.PORT, () => {
    console.log("Listening on PORT "+ process.env.PORT);
})
