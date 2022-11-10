const express = require('express');
const Contenedor = require('./contenedor');
const contenedor = new Contenedor('./productos.txt');
const app = express();
const PORT = 8000;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', './views');

let productsHC = [
  { id: 1, title: 'nike ball', price: 101, thumbnail: 'http://localhost:8080/public/nike-ball.jpg' },
  { id: 2, title: 'nike shoes', price: 102, thumbnail: 'http://localhost:8080/public/nike-shoes.jpg' },
  { id: 3, title: 'adidas shoes', price: 102, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
];

app.get('/', (req, res) => {
  res.render('hello.pug', { msg: 'Hello World!' });
});

app.get('/products', (req, res) => {
  const resultado = JSON.stringify(contenedor.getAll());
  let productsExist = true;
  if (resultado === "[]") {
    productsExist = false;
  } 
  const products = JSON.parse(resultado);
  res.render('products.pug', { title: 'Listado de productos', products, productsExist});
});

app.get('/formulario', (req, res) =>{
  res.render('form.pug', {title: 'Ingrese su producto'});
});

app.post('/formulario', (req, res) =>{
  const {body} = req;
  contenedor.save(body);
  res.render('postForm.pug');
})
