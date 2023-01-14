const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('hola');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /product', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => 
    agent
      .post('/sumArray')
      .send({array: [2,5,7,10,11,15,20], num: 13})
      .expect(200));

    it('responds with and object with result `true` when 2 elements of the array sum the num in request body', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));
      

      it('responds with and object with result `false` when no 2 elements of the array um the num in request body', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 3})
        .then((res) => {
          expect(res.body.result).toEqual(false);
      }));

      it('does not add the same number twice', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 10})
        .then((res) => {
          expect(res.body.result).toEqual(false);
      }));
  });

  describe("Post /numString", ()=>{
    it('responds with 200', () => 
    agent.post('/numString').send({word: "hola"}).expect(200));

    it('responds with 400 if word is not a string', () => 
    agent
      .post('/numString')
      .send({word: 99})
      .expect(400));
    
    it('responds with 400 if word is an empty string', () =>
    agent
    .post('/numString')
    .send({word: ""})
    .expect(400));

  it('responds with an object with length 4 when word in request body is 4 chars long', () => 
    agent
      .post('/numString')
      .send({word: "hola"})
      .then(res => expect(res.body.length).toBe(4)));

    it('responds with an object with length 10 when word in request body is 10 chars long', () => 
    agent
      .post('/numString')
      .send({word: "hola mundo"})
      .then(res=> expect(res.body.length).toBe(10)));
    
    });

  describe("Post /pluck", ()=> {

    it("responds with 400 if propiedad is not a string", () =>
    agent.post("/pluck")
      .send({
        array: [
          {name: "Jhon", age: 30},
          {name: "Jane", age: 32},
          {name: "Sebastian", age: 22},
          {name: "Gabriela", age: 28},
        ],
      })
      .expect(400));

    it("responds with 400 if array is not an array", ()=>
    agent.post("/pluck").send({array: "hola", propiedad: "age"}).expect(400));

    it("responds with 200 if request body contain an array and a string property", ()=>
    agent
      .post("/pluck")
      .send({array: [
          {name: "Jhon", age: 30},
          {name: "Jane", age: 32},
          {name: "Sebastian", age: 22},
          {name: "Gabriela", age: 28},
        ], propiedad: "age"
      }).expect(200));

    it("responds with an array of age values when propiedad is `age`", ()=>
    agent.post("/pluck").send({array: testArray, propiedad: "age"})
    .then(res=> expect(res.body.values).toEqual([30, 32, 22, 28])));

    it("responds with an array of name values when propiedad is `name`", ()=>
    agent.post("/pluck").send({array: testArray, propiedad: "name"})
    .then(res=> expect(res.body.values).toEqual(["Jhon", "Jane", "Sebastian", "Gabriela"]))
    );
  });
});



