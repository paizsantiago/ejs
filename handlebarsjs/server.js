const express = require('express');
const app = express();
const Contenedor = require('./contenedor');
const { engine } = require('express-handlebars');
const PORT = 8080;
const contenedor = new Contenedor('./productos.txt');

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

app.get('/formulario', (req, res) =>{
  res.render('formulario');
});

app.post('/formulario', (req, res) =>{
  const {body} = req;
  contenedor.save(body);
  res.render('postForm');
})

app.get('/', (req, res) =>{
  res.render('home')
})

app.get('/productos',  (req, res) => {
  const resultado =  JSON.stringify(contenedor.getAll());
  let productsExist = true;
  if (resultado === "[]") {
    productsExist = false;
  } 
  const products = JSON.parse(resultado)
  res.render('productslist', {productsExist, products});
});
