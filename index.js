const  express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const  PORT = 3000;

app.use(express.json());

const db = new sqlite3.Database('usuarios.db', (err) => {
    if (err) {
        console.error('Erro ao conectar no banco', err.message);
    }else{
        console.log('Banco de   dados conectado.');

        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT
)`);

        app.post('/usuarios', (req, res)=>{
            const{nome, email}= req.body;
            db.run(`INSERT INTO users (nome, email)VALUES (?, ?)`, [nome, email], function(err){
                if(err) {
                    return res.status(500).json({erro: err.message});
              
                }
                res.json({id:this.lastID, nome, email});
            });
        });
        app.get('/usuarios', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json(rows);
    });
});
app.get('/', (req, res) => {
  res.send('API está rodando!');
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

