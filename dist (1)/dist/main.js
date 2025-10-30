"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bodyParser = require("body-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://seraf.com', 'https://seraf.com', 'http://www.seraf.com', 'https://www.seraf.com'],
        credentials: true,
    });
    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map