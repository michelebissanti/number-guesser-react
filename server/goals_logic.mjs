import { getGoalsByUser, addUserGoal, getGames } from './models/game-dao.mjs';
import dayjs from 'dayjs';

// funzione per controllare se l'utente ha raggiunto degli obiettivi
// richiede gli obiettivi già raggiunti dall'utente e i giochi giocati
// restituisce un array con gli obiettivi raggiunti in questa chiamata
export const checkGoals = async (userId) => {
    const goals_completed = [];
    let goals = [];
    let games = [];

    goals = await getGoalsByUser(userId);
    games = await getGames(userId);


    const lastGame = games[games.length - 1];
    const today = dayjs().format('YYYY-MM-DD');

    // goal 1: complete a game
    const goal1 = goals.find(g => g.id === 1);
    if (goal1.achieved === false || goal1.repeatable === true) {
        if (games.length > 0) {
            await addUserGoal(userId, 1, today);
            goal1.achieved = true;
            if (goal1.repeatable === true) {
                goal1.timeAchieved++;
            }
            goal1.achievedAt = today;
            goals_completed.push(goal1);
        }
    }

    // goal 2: win a game
    const goal2 = goals.find(g => g.id === 2);
    if (goal2.achieved === false || goal2.repeatable === true) {
        if (games.some(game => game.status === 'won')) {
            await addUserGoal(userId, 2, today);
            goal2.achieved = true;
            if (goal2.repeatable === true) {
                goal2.timeAchieved++;
            }
            goal2.achievedAt = today;
            goals_completed.push(goal2);
        }
    }

    // goal 3: lose a game
    const goal3 = goals.find(g => g.id === 3);
    if (goal3.achieved === false || goal3.repeatable === true) {
        if (games.some(game => game.status === 'lost')) {
            await addUserGoal(userId, 3, today);
            goal3.achieved = true;
            if (goal3.repeatable === true) {
                goal3.timeAchieved++;
            }
            goal3.achievedAt = today;
            goals_completed.push(goal3);
        }
    }
    // goal 4: win a game at difficulty 1
    const goal4 = goals.find(g => g.id === 4);
    if (goal4.achieved === false || goal4.repeatable === true) {
        if (games.some(game => game.status === 'won' && game.difficulty === 1)) {
            await addUserGoal(userId, 4, today);
            goal4.achieved = true;
            if (goal4.repeatable === true) {
                goal4.timeAchieved++;
            }
            goal4.achievedAt = today;
            goals_completed.push(goal4);
        }
    }

    // goal 5: win a game at difficulty 2
    const goal5 = goals.find(g => g.id === 5);
    if (goal5.achieved === false || goal5.repeatable === true) {
        if (games.some(game => game.status === 'won' && game.difficulty === 2)) {
            await addUserGoal(userId, 5, today);
            goal5.achieved = true;
            if (goal5.repeatable === true) {
                goal5.timeAchieved++;
            }
            goal5.achievedAt = today;
            goals_completed.push(goal5);
        }
    }

    // goal 6: win a game at difficulty 3
    const goal6 = goals.find(g => g.id === 6);
    if (goal6.achieved === false || goal6.repeatable === true) {
        if (games.some(game => game.status === 'won' && game.difficulty === 3)) {
            await addUserGoal(userId, 6, today);
            goal6.achieved = true;
            if (goal6.repeatable === true) {
                goal6.timeAchieved++;
            }
            goal6.achievedAt = today;
            goals_completed.push(goal6);
        }
    }

    // goal 7: win a game at difficulty 4
    const goal7 = goals.find(g => g.id === 7);
    if (goal7.achieved === false || goal7.repeatable === true) {
        if (games.some(game => game.status === 'won' && game.difficulty === 4)) {
            await addUserGoal(userId, 7, today);
            goal7.achieved = true;
            if (goal7.repeatable === true) {
                goal7.timeAchieved++;
            }
            goal7.achievedAt = today;
            goals_completed.push(goal7);
        }
    }

    // goal 8: win 10 games at difficulty 1
    const goal8 = goals.find(g => g.id === 8);
    if (goal8.achieved === false || goal8.repeatable === true) {
        const winsAtDifficulty1 = games.filter(game => game.status === 'won' && game.difficulty === 1);
        if (winsAtDifficulty1.length % 10 === 0 && winsAtDifficulty1.length > 0 && lastGame.difficulty === 1) {
            await addUserGoal(userId, 8, today);
            goal8.achieved = true;
            if (goal8.repeatable === true) {
                goal8.timeAchieved++;
            }
            goal8.achievedAt = today;
            goals_completed.push(goal8);
        }
    }

    // goal 9: win 10 games at difficulty 2
    const goal9 = goals.find(g => g.id === 9);
    if (goal9.achieved === false || goal9.repeatable === true) {
        const winsAtDifficulty2 = games.filter(game => game.status === 'won' && game.difficulty === 2);
        if (winsAtDifficulty2.length % 10 === 0 && winsAtDifficulty2.length > 0 && lastGame.difficulty === 2) {
            await addUserGoal(userId, 9, today);
            goal9.achieved = true;
            if (goal9.repeatable === true) {
                goal9.timeAchieved++;
            }
            goal9.achievedAt = today;
            goals_completed.push(goal9);
        }
    }

    // goal 10: win 10 games at difficulty 3
    const goal10 = goals.find(g => g.id === 10);
    if (goal10.achieved === false || goal10.repeatable === true) {
        const winsAtDifficulty3 = games.filter(game => game.status === 'won' && game.difficulty === 3);
        if (winsAtDifficulty3.length % 10 === 0 && winsAtDifficulty3.length > 0 && lastGame.difficulty === 3) {
            await addUserGoal(userId, 10, today);
            goal10.achieved = true;
            if (goal10.repeatable === true) {
                goal10.timeAchieved++;
            }
            goal10.achievedAt = today;
            goals_completed.push(goal10);
        }
    }

    // goal 11: win 10 games at difficulty 4
    const goal11 = goals.find(g => g.id === 11);
    if (goal11.achieved === false || goal11.repeatable === true) {
        const winsAtDifficulty4 = games.filter(game => game.status === 'won' && game.difficulty === 4);
        if (winsAtDifficulty4.length % 10 === 0 && winsAtDifficulty4.length > 0 && lastGame.difficulty === 4) {
            await addUserGoal(userId, 11, today);
            goal11.achieved = true;
            if (goal11.repeatable === true) {
                goal11.timeAchieved++;
            }
            goal11.achievedAt = today;
            goals_completed.push(goal11);
        }
    }

    // goal 12: win 5 consecutive games at difficulty 1
    const goal12 = goals.find(g => g.id === 12);
    if (goal12.achieved === false || goal12.repeatable === true) {
        const consecutiveWinsAtDifficulty1 = games.reduce((count, game) => {
            if (game.difficulty === 1 && game.status === 'won') {
                return count + 1;
            } else if (game.difficulty === 1 && game.status === 'lost') {
                return 0;
            } else {
                return count;
            }
        }, 0);

        if (consecutiveWinsAtDifficulty1 % 5 === 0 && consecutiveWinsAtDifficulty1 > 0 && lastGame.difficulty === 1 && lastGame.status === 'won') {
            await addUserGoal(userId, 12, today);
            goal12.achieved = true;
            if (goal12.repeatable === true) {
                goal12.timeAchieved++;
            }
            goal12.achievedAt = today;
            goals_completed.push(goal12);
        }
    }

    // goal 13: win 5 consecutive games at difficulty 2
    const goal13 = goals.find(g => g.id === 13);
    if (goal13.achieved === false || goal13.repeatable === true) {
        const consecutiveWinsAtDifficulty2 = games.reduce((count, game) => {
            if (game.difficulty === 2 && game.status === 'won') {
                return count + 1;
            } else if (game.difficulty === 2 && game.status === 'lost') {
                return 0;
            } else {
                return count;
            }
        }, 0);

        if (consecutiveWinsAtDifficulty2 % 5 === 0 && consecutiveWinsAtDifficulty2 > 0 && lastGame.difficulty === 2 && lastGame.status === 'won') {
            await addUserGoal(userId, 13, today);
            goal13.achieved = true;
            if (goal13.repeatable === true) {
                goal13.timeAchieved++;
            }
            goal13.achievedAt = today;
            goals_completed.push(goal13);
        }
    }

    // goal 14: win 5 consecutive games at difficulty 3
    const goal14 = goals.find(g => g.id === 14);
    if (goal14.achieved === false || goal14.repeatable === true) {
        const consecutiveWinsAtDifficulty3 = games.reduce((count, game) => {
            if (game.difficulty === 3 && game.status === 'won') {
                return count + 1;
            } else if (game.difficulty === 3 && game.status === 'lost') {
                return 0;
            } else {
                return count;
            }
        }, 0);

        if (consecutiveWinsAtDifficulty3 % 5 === 0 && consecutiveWinsAtDifficulty3 > 0 && lastGame.difficulty === 3 && lastGame.status === 'won') {
            await addUserGoal(userId, 14, today);
            goal14.achieved = true;
            if (goal14.repeatable === true) {
                goal14.timeAchieved++;
            }
            goal14.achievedAt = today;
            goals_completed.push(goal14);
        }
    }

    // goal 15: win 5 consecutive games at difficulty 4
    const goal15 = goals.find(g => g.id === 15);
    if (goal15.achieved === false || goal15.repeatable === true) {
        const consecutiveWinsAtDifficulty4 = games.reduce((count, game) => {
            if (game.difficulty === 4 && game.status === 'won') {
                return count + 1;
            } else if (game.difficulty === 4 && game.status === 'lost') {
                return 0;
            } else {
                return count;
            }
        }, 0);

        if (consecutiveWinsAtDifficulty4 % 5 === 0 && consecutiveWinsAtDifficulty4 > 0 && lastGame.difficulty === 4 && lastGame.status === 'won') {
            await addUserGoal(userId, 15, today);
            goal15.achieved = true;
            if (goal15.repeatable === true) {
                goal15.timeAchieved++;
            }
            goal15.achievedAt = today;
            goals_completed.push(goal15);
        }
    }

    // goal 16: play 20 total games
    const goal16 = goals.find(g => g.id === 16);
    if (goal16.achieved === false || goal16.repeatable === true) {
        if (games.length >= 20) {
            await addUserGoal(userId, 16, today);
            goal16.achieved = true;
            if (goal16.repeatable === true) {
                goal16.timeAchieved++;
            }
            goal16.achievedAt = today;
            goals_completed.push(goal16);
        }
    }

    // goal 17: play 50 total games
    const goal17 = goals.find(g => g.id === 17);
    if (goal17.achieved === false || goal17.repeatable === true) {
        if (games.length % 50 === 0 && games.length > 0) {
            await addUserGoal(userId, 17, today);
            goal17.achieved = true;
            if (goal17.repeatable === true) {
                goal17.timeAchieved++;
            }
            goal17.achievedAt = today;
            goals_completed.push(goal17);
        }
    }

    // goal 18: guess the number on the first try
    const goal18 = goals.find(g => g.id === 18);
    if (goal18.achieved === false || goal18.repeatable === true) {
        if (lastGame.attemptsHistory.length === 1 && lastGame.status === 'won') {
            await addUserGoal(userId, 18, today);
            goal18.achieved = true;
            if (goal18.repeatable === true) {
                goal18.timeAchieved++;
            }
            goal18.achievedAt = today;
            goals_completed.push(goal18);
        }
    }

    // goal 19: win a game on the last possible attempt
    const goal19 = goals.find(g => g.id === 19);
    if (goal19.achieved === false || goal19.repeatable === true) {
        if (lastGame.attemptsHistory.length === (lastGame.difficulty * 4) && lastGame.status === 'won') {
            await addUserGoal(userId, 19, today);
            goal19.achieved = true;
            if (goal19.repeatable === true) {
                goal19.timeAchieved++;
            }
            goal19.achievedAt = today;
            goals_completed.push(goal19);
        }
    }

    // goal 20: win a game at all difficulties (1-4)
    const goal20 = goals.find(g => g.id === 20);
    if (goal20.achieved === false) {
        const wonDifficulties = new Set(games.filter(game => game.status === 'won').map(game => game.difficulty));
        if ([1, 2, 3, 4].every(difficulty => wonDifficulties.has(difficulty))) {
            await addUserGoal(userId, 20, today);
            goal20.achieved = true;
            if (goal20.repeatable === true) {
                goal20.timeAchieved++;
            }
            goal20.achievedAt = today;
            goals_completed.push(goal20);
        }
    }

    // goal 21: win a game at all difficulties (1-4) in the same day
    const goal21 = goals.find(g => g.id === 21);
    const wonDifficultiesToday = new Set(games.filter(game => game.status === 'won' && dayjs(game.date).isSame(today)).map(game => game.difficulty));
    if (goal21.achieved === false || goal21.repeatable === true) {
        if ([1, 2, 3, 4].every(difficulty => wonDifficultiesToday.has(difficulty)) && lastGame.date.isSame(today) && !(lastGame.date.isSame(goal21.achievedAt))) {
            await addUserGoal(userId, 21, today);
            goal21.achieved = true;
            if (goal21.repeatable === true) {
                goal21.timeAchieved++;
            }
            goal21.achievedAt = today;
            goals_completed.push(goal21);
        }
    }

    // goal 22: win 100 total games
    const goal22 = goals.find(g => g.id === 22);
    if (goal22.achieved === false) {
        const totalWins = games.filter(game => game.status === 'won').length;
        if (totalWins >= 100) {
            await addUserGoal(userId, 22, today);
            goal22.achieved = true;
            if (goal22.repeatable === true) {
                goal22.timeAchieved++;
            }
            goal22.achievedAt = today;
            goals_completed.push(goal22);
        }
    }

    // goal 23: win a game after 3 consecutive losses
    const goal23 = goals.find(g => g.id === 23);
    if (goal23.achieved === false || goal23.repeatable === true) {
        const lastGames = games.slice(-4);
        if (lastGames.length === 4 && lastGames.slice(0, 3).every(game => game.status === 'lost') && lastGames[3].status === 'won') {
            await addUserGoal(userId, 23, today);
            goal23.achieved = true;
            if (goal23.repeatable === true) {
                goal23.timeAchieved++;
            }
            goal23.achievedAt = today;
            goals_completed.push(goal23);
        }
    }

    // goal 24: win 50 consecutive games
    const goal24 = goals.find(g => g.id === 24);
    const consecutiveWins = games.reduce((count, game) => {
        if (game.status === 'won') {
            return count + 1;
        } else {
            return 0;
        }
    }, 0);
    if (goal24.achieved === false || goal24.repeatable === true) {
        if (consecutiveWins % 50 === 0 && consecutiveWins > 0) {
            await addUserGoal(userId, 24, today);
            goal24.achieved = true;
            if (goal24.repeatable === true) {
                goal24.timeAchieved++;
            }
            goal24.achievedAt = today;
            goals_completed.push(goal24);
        }
    }

    // goal 25: guess the number on the first try at difficulty 1
    const goal25 = goals.find(g => g.id === 25);
    if (goal25.achieved === false || goal25.repeatable === true) {
        if (lastGame.attemptsHistory.length === 1 && lastGame.status === 'won' && lastGame.difficulty === 1) {
            await addUserGoal(userId, 25, today);
            goal25.achieved = true;
            if (goal25.repeatable === true) {
                goal25.timeAchieved++;
            }
            goal25.achievedAt = today;
            goals_completed.push(goal25);
        }
    }

    // goal 26: guess the number on the first try at difficulty 2
    const goal26 = goals.find(g => g.id === 26);
    if (goal26.achieved === false || goal26.repeatable === true) {
        if (lastGame.attemptsHistory.length === 1 && lastGame.status === 'won' && lastGame.difficulty === 2) {
            await addUserGoal(userId, 26, today);
            goal26.achieved = true;
            if (goal26.repeatable === true) {
                goal26.timeAchieved++;
            }
            goal26.achievedAt = today;
            goals_completed.push(goal26);
        }
    }

    // goal 27: guess the number on the first try at difficulty 3
    const goal27 = goals.find(g => g.id === 27);
    if (goal27.achieved === false || goal27.repeatable === true) {
        if (lastGame.attemptsHistory.length === 1 && lastGame.status === 'won' && lastGame.difficulty === 3) {
            await addUserGoal(userId, 27, today);
            goal27.achieved = true;
            if (goal27.repeatable === true) {
                goal27.timeAchieved++;
            }
            goal27.achievedAt = today;
            goals_completed.push(goal27);
        }
    }

    // goal 28: guess the number on the first try at difficulty 4
    const goal28 = goals.find(g => g.id === 28);
    if (goal28.achieved === false || goal28.repeatable === true) {
        if (lastGame.attemptsHistory.length === 1 && lastGame.status === 'won' && lastGame.difficulty === 4) {
            await addUserGoal(userId, 28, today);
            goal28.achieved = true;
            if (goal28.repeatable === true) {
                goal28.timeAchieved++;
            }
            goal28.achievedAt = today;
            goals_completed.push(goal28);
        }
    }

    // goal 29: win a game every day
    const goal29 = goals.find(g => g.id === 29);
    if (goal29.achieved === false || goal29.repeatable === true) {
        if (lastGame.status === 'won' && dayjs(lastGame.date).isSame(today) && !(dayjs(today).isSame(goal29.achievedAt))) {
            await addUserGoal(userId, 29, today);
            goal29.achieved = true;
            if (goal29.repeatable === true) {
                goal29.timeAchieved++;
            }
            goal29.achievedAt = today;
            goals_completed.push(goal29);

        }
    }

    // goal 30: lose a game every day
    const goal30 = goals.find(g => g.id === 30);
    if (goal30.achieved === false || goal30.repeatable === true) {
        if (lastGame.stats === 'lost' && dayjs(lastGame.date).isSame(today) && !(dayjs(goal30.achievedAt).isSame(today))) {
            await addUserGoal(userId, 30, today);
            goal30.achieved = true;
            if (goal30.repeatable === true) {
                goal30.timeAchieved++;
            }
            goal30.achievedAt = today;
            goals_completed.push(goal30);
        }
    }

    return goals_completed;
}