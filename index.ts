import express, {json, Request, Response} from "express";
import cors from 'cors';
import 'express-async-errors'
import {handleError} from "./utils/errors";
import rateLimit from "express-rate-limit";
import {adRouter} from "./routers/ad.routers";

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
}))
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    // standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    // legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
app.use('/task', adRouter);

app.get('/', (req: Request, res: Response) => {
    throw new Error('Damn');
})

app.use(handleError);
app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001...');
});

// około strony 15