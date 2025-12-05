import express from 'express';
import swaggerui from "swagger-ui-express";
import path from "path";
import YAML from "yamljs";

const router = express.Router();


const swaggerDocument = YAML.load(path.join(__dirname, '../public', 'swagger.yaml'));
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

router.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerDocument, {
    customCss:
        '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL,
}));

export default router;