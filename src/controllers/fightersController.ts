import { Request, Response } from 'express';
import { getRanking } from '../repositories/fightersRepository.js';
import { checkUser, getBattleResults } from '../services/fightersService.js';

export async function battle(req: Request, res: Response) {
    try {
        const {
            firstUser,
            secondUser,
        }: { firstUser: string; secondUser: string } = req.body;

        await checkUser(firstUser);
        await checkUser(secondUser);
        const battleResults = await getBattleResults(firstUser, secondUser);

        res.send(battleResults).status(201);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}

export async function ranking(req: Request, res: Response) {
    try {
        const rank = await getRanking();

        res.send({ fighters: rank }).status(200);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}
