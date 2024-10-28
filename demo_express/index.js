const express = require("express"); // Importamos el paquete express
const app = express(); // Inciializar servidor con express
const port = 3000; // Puerto a usar por el servidor

// GET http://localhost:3000/ --> Ruta /. La principal
app.get("/", (req, res) => { // req: request, res: response
  res.send("Hello World!. Welcome to Backend");
});

// GET http://localhost:3000/films
app.get("/films", (req, res) => {
  res.send("Aquí van tus pelis");
});

// GET http://localhost:3000/books
app.get("/books", (req, res) => {
  res.send("Aquí van tus libros");
});

// GET http://localhost:3000/perros/toby
// GET http://localhost:3000/perros/mordisquitos
// GET http://localhost:3000/perros/bolita
// GET http://localhost:3000/perros/23
// GET http://localhost:3000/perros --> devuelve todos los perros


app.get("/perros/:name?", (req, res) => { // ? indica que el parametro es opcional
    const name = req.params.name; // leer el parametro name
    //Habría que sustitur las siguientes líneas (28-35) por una llamada a mi BBDD SQL
    const perros = [
        { name: "mordisquitos", age: 2 },
        { name: "toby", age: 3 },
        { name: "peluson", age: 5 },
        { name: "bob", age: 3 },
      ];
    if(name){
        const perro = perros.find((perro) => perro.name === name);
        
        perro? // perro encontrado????
        res.status(200).json(perro) // si lo encuentra, devuelvo el perro
        :res.status(404).json({message:name+" no encontrado"}); // sino, objeto con un mensaje
    }
    else{
        res.status(200).json(perros); // devuelve todos los perros
    }
    });




app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
