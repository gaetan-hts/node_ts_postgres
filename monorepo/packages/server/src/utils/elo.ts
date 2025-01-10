export const updateElo = (elo1: number, elo2: number, result: string) => {
    const K = 32; // Constante de pondération
    const expected1 = 1 / (1 + Math.pow(10, (elo2 - elo1) / 400));
    const expected2 = 1 / (1 + Math.pow(10, (elo1 - elo2) / 400));

    let score1, score2;
    if (result === "player1") {
        score1 = 1;
        score2 = 0;
    } else if (result === "player2") {
        score1 = 0;
        score2 = 1;
    } else {
        score1 = 0.5;
        score2 = 0.5;
    }

    const newElo1 = Math.round(elo1 + K * (score1 - expected1));
    const newElo2 = Math.round(elo2 + K * (score2 - expected2));

    return { newElo1, newElo2 };
};
