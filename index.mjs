import express from 'express';
import fetch from 'node-fetch';
const planets = (await import('npm-solarsystem')).default;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async(req, res) => {
    let apiKey = "HezyyXmJqa53Xp4ak3H9nA1tIU63vOM7Cet4f34z4as";
	let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
    let response = await fetch(url);
    let data = await response.json();
    let randomImage = data.urls.full;
    res.render("index",{"image":randomImage})
});

app.get('/nasa', async(req, res) => {
    let apiKey = "9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD";
    let date = new Date().toLocaleDateString('en-CA');
	let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
    let response = await fetch(url);
    let data = await response.json();
    res.render("nasa", {data})
});

app.get('/planet', (req, res) => {
 let planetName = req.query.planetName;
 let planetInfo = planets[`get${planetName}`]();
 res.render('planet', { planetInfo, planetName });
});


/**app.get('/earth', (req, res) => {
    let planetEarth = planets.getEarth();
    console.log(planetEarth);
    res.render('earth', {planetEarth});
});

app.get('/mars', (req, res) => {
    let planetMars = planets.getMars();
    console.log(planetMars);
    res.render('mars', {planetMars});
});**/


app.listen(3000, () => {
   console.log('server started');
});
