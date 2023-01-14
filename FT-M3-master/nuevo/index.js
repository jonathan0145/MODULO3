const express = require("express");
const app = express();

app.use(express.json()); // for parsing application/json

function sumArray(array, targetNumber) {
	let left = 0,
		right = array.length - 1;

	while (left < right) {
		const sum = array[left] + array[right];

		if (sum === targetNumber) return true;

		sum < targetNumber ? left++ : right--;
	}

	return false;
}

app.get("/", (req, res) => {
	res.send({
		message: "hola",
	});
});

app.get("/test", (req, res) => {
	res.send({
		message: "test",
	});
});

app.post("/sum", (req, res) => {
	res.send({
		result: 5,
	});
});

app.post("/product", (req, res) => {
	res.send({
		result: req.body.a * req.body.b,
	});
});

app.post("/sumArray", (req, res) => {
	const { array, num } = req.body;

	res.send({
		result: sumArray(array, num),
	});
});

app.post("/numString", (req, res) => {
	if (!req.body.word || typeof req.body.word !== "string") res.sendStatus(400);

	res.send({
		length: req.body.word.length,
	});
});

// app.post("/pluck", (req, res) => {
// 	const { array, propiedad } = req.body;

// 	if (!Array.isArray(array) || !propiedad) res.sendStatus(400);

// 	res.send({
// 		values: array.map(element => element[propiedad]),
// 	});
// });

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
