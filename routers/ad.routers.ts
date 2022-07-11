import {Router} from "express";
import {AdRecord} from "../records/ad.record";

export const adRouter = Router()
    .get('/search/:name?', async (req, res) => {
        const ads = await AdRecord.findAll(req.params.name ?? null);
        res.json(ads)
    })
    .get('/:id', async (req, res) => {
        const ad = await AdRecord.getOne(req.params.id);
        res.json(ad)
    })
    .post('/', async (req, res) => {
        const ad = new AdRecord(req.body);
        const isOk = await ad.insert();
        res.json(isOk)
    })
    .delete('/', async (req, res) => {
        const ad = new AdRecord(req.body[0]);
        await ad.delete();
        res.json({isDel: "poklik"})
    })

