const express = require("express"); // Importamos el paquete express
const app = express(); // Inciializar servidor con express
const port = 3000; // Puerto a usar por el servidor

app.use(express.json()); // Middleware para parsear el body de las peticiones

// GET http://localhost:3000/ --> Ruta /. La principal
app.get("/", (req, res) => {
  // req: request, res: response
  res.send("Hello World!. Welcome to Backend");
});

// GET http://localhost:3000/films
app.get("/films", (req, res) => {
  res.send("Aquí van tus pelis");
});

// GET http://localhost:3000/perros/toby
// GET http://localhost:3000/perros/mordisquitos
// GET http://localhost:3000/perros/bolita
// GET http://localhost:3000/perros/23
// GET http://localhost:3000/perros --> devuelve todos los perros

app.get("/perros/:name?", (req, res) => {
  // ? indica que el parametro es opcional
  const name = req.params.name; // leer el parametro name
  //Habría que sustitur las siguientes líneas (28-35) por una llamada a mi BBDD SQL
  const perros = [
    { name: "mordisquitos", age: 2 },
    { name: "toby", age: 3 },
    { name: "peluson", age: 5 },
    { name: "bob", age: 3 },
  ];
  if (name) {
    const perro = perros.find((perro) => perro.name === name);

    perro // perro encontrado????
      ? res.status(200).json(perro) // si lo encuentra, devuelvo el perro
      : res.status(404).json({ message: name + " no encontrado" }); // sino, objeto con un mensaje
  } else {
    res.status(200).json(perros); // devuelve todos los perros
  }
});

// HTTP GET http://localhost:3000/books
app.get("/books", (req, res) => {
  res.send("Aquí van tus libros");
});

//HTTP POST http://localhost:3000/books
app.post("/books", (req, res) => {
  console.log(req.body);
  if (req.body.title && req.body.author) {
    // Lógica para guardar el libro en la BBDD
    // INSERT INTO books (title, author) VALUES (req.body.title, req.body.author)
    //..
    res.status(201).json({
      success: true,
      action: "create",
      title: req.body.title,
      id: Math.floor(Math.random() * (10000 - 1) + 1),
      data: req.body,
    });
  } else {
    res.status(400).send("Petición incorrecta");
  }
});

//HTTP PUT http://localhost:3000/books
app.put("/books", (req, res) => {
  console.log(req.body); // por body se recibe el libro a editar
  if (req.body.title && req.body.author) {
    // Lógica para editar el libro en la BBDD
    // UPDATE books SET title = req.body.title, author = req.body.author WHERE id = req.body.id
    //..

    let book = {
      "title": "Don Quijote de la Mancha",
      "author":"Miguel de Cervantes",
      "pages": 2000,
      "year":1550,
      "description": "en un lugar de la mancha..."
    }

    let newBook = {...book, ...req.body}; // Actualizar el libro con los nuevos datos

    res.status(200).json({
      success: true,
      action:"update",
      title: req.body.title,
      id: Math.floor(Math.random() * (10000 - 1) + 1),
      data: newBook,
    });
  } else {
    res.status(400).send("Petición incorrecta");
  }
});

//HTTP DELETE http://localhost:3000/books?title=Hamlet&author=Shakespeare --> Borrar un libro
//HTTP DELETE http://localhost:3000/books --> Borrar todos los libros
app.delete("/books", (req, res) => {
  console.log(req.query);
  // Lógica para borrar de la bbdd por título y autor
  // DELETE FROM books WHERE title = req.query.title AND author = req.query.author
  res.send(`Libro borrado: ${req.query.title} - ${req.query.author}`);
});

// Para ruta no existente
app.use("*",(req, res) => {
  res.status(404).send("Ruta no encontrada");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
