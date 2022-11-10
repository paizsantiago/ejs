const express = require('express');
const Contenedor = require('./contenedor');
const app = express();
const PORT = 8060;
const contenedor = new Contenedor('./productos.txt')


const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
  res.render('pages/home');
})

app.get('/products', (req, res) => {
  const resultado =  JSON.stringify(contenedor.getAll());
  let productsExist = true;
  if (resultado === "[]") {
    productsExist = false;
  } 
  const products = JSON.parse(resultado)
  res.render('pages/index', { title: 'Listado de productos', products, productsExist });
});

app.get('/formulario', (req, res) =>{
  res.render('pages/form', {title: 'Ingrese su producto'});
});

app.post('/formulario', (req, res) =>{
  const {body} = req;
  contenedor.save(body);
  res.render('pages/postForm');
});
