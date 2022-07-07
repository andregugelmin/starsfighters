import connection from '../config/database.js';

export async function getUser(username: string) {
    const query = await connection.query(
        `
        SELECT * FROM fighters 
        WHERE fighters.username = $1`,
        [username]
    );
    return query.rows[0];
}

export async function insertUser(username: string) {
    await connection.query(
        `INSERT INTO fighters (username,wins,losses,draws)
        VALUES ($1, $2, $3, $4)`,
        [username, 0, 0, 0]
    );
}

export async function addWin(username: string) {
    await connection.query(
        `
        UPDATE fighters
        SET wins = wins + 1
        WHERE username = $1`,
        [username]
    );
}

export async function addLoss(username: string) {
    await connection.query(
        `
        UPDATE fighters
        SET losses = losses + 1
        WHERE username = $1`,
        [username]
    );
}

export async function addDraw(username: string) {
    await connection.query(
        `
        UPDATE fighters
        SET draws = draws + 1
        WHERE username = $1`,
        [username]
    );
}

export async function getRanking() {
    const result = await connection.query(`
        SELECT username,wins,losses,draws 
        FROM fighters 
        ORDER BY wins DESC, draws DESC, losses ASC`);
    return result.rows;
}
