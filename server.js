const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // قاعدة البيانات
const middlewares = jsonServer.defaults({
    static: './public' // ✅ دي النقطة السحرية: بنقوله هات الموقع من فولدر بابليك
});
const cors = require('cors'); // عشان حماية وعلاج مشاكل الاتصال
const port = process.env.PORT || 3000; // Railway بيدينا بورت أوتوماتيك

server.use(cors());
server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});