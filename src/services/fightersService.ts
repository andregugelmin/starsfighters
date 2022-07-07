import axios from 'axios';
import {
    addDraw,
    addLoss,
    addWin,
    getUser,
    insertUser,
} from '../repositories/fightersRepository.js';

export async function getBattleResults(firstUser: string, secondUser: string) {
    const stars1 = await getStars(firstUser);
    const stars2 = await getStars(secondUser);

    let battleResults = {
        winner: null,
        loser: null,
        draw: true,
    };

    if (stars1 > stars2) {
        battleResults = {
            winner: firstUser,
            loser: secondUser,
            draw: false,
        };
        await addWin(firstUser);
        await addLoss(secondUser);
    } else if (stars1 < stars2) {
        battleResults = {
            winner: secondUser,
            loser: firstUser,
            draw: false,
        };
        await addWin(secondUser);
        await addLoss(firstUser);
    } else {
        await addDraw(firstUser);
        await addDraw(secondUser);
    }
    return battleResults;
}

async function getStars(user: string) {
    const userRepositories = await axios(
        `http://api.github.com/users/${user}/repos`
    );

    const stars = userRepositories.data.reduce(
        (total: number, repository: any) => {
            return total + repository.stargazers_count;
        },
        0
    );
    return stars;
}

export async function checkUser(username: string) {
    const user = await getUser(username);

    if (!user) {
        await insertUser(username);
    }
}
