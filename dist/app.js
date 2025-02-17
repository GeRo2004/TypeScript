
import express from 'express';
import { observationRouter } from './observation/observation.routes.js';
const app = express();
app.use(express.json());
app.use('/api/observation', observationRouter);
app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' });
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
});
//# sourceMappingURL=app.js.map