const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // اسم ملف الداتا بتاعك
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000; // Render بيدينا بورت، لو مفيش بنستخدم 3000

server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});