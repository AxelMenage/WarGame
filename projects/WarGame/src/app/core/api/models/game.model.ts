export class Game {
    id: number;
    stateId: number;
    stateName: string;
    player1Id: number;
    player1Nickname: string;
    player2Id: number
    player2Nickname: string;
    posPlayer1Ok: boolean;
    posPlayer2Ok: boolean;
    playerTurnId: number;
    playerTurnNickname: string
    winnerId: number;
    winnerNickname: string;
    nbTurn: number;
    ingameDeckId: number;
    startDate: Date;
    gameTypeId: number;
    gameTypeName: string;
    endDate: Date;
    deckId: number;
}