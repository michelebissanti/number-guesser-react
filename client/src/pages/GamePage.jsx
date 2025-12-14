import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Card } from 'react-bootstrap';
import { GamepadIcon, Award, Brain, Target, Leaf, Flame, Zap, Sword } from 'lucide-react';
import { Status, Goal } from '../models.mjs';
import { GameBoard } from '../components/GameBoard';
import API from '../API.mjs';
import GoalCard from '../components/GoalCard';
import dayjs from 'dayjs';

function GamePage({ user, setMessage }) {
    const [gameState, setGameState] = useState('choose-difficulty');
    const [loading, setLoading] = useState(false);
    const [level, setLevel] = useState(0);
    const [result, setResult] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [targetNumber, setTargetNumber] = useState(0);
    const [goals, setGoals] = useState([]);
    const navigate = useNavigate();

    const levelIcons = [
        { icon: Leaf, color: 'success', label: 'Principiante' },
        { icon: Flame, color: 'warning', label: 'Intermedio' },
        { icon: Zap, color: 'danger', label: 'Avanzato' },
        { icon: Sword, color: 'primary', label: 'Esperto' }
    ];

    // funzione per iniziare il gioco
    const startGame = (level) => {
        setLevel(level);
        setGameState('playing');
    };

    // funzione per gestire la fine di una partita
    // invia al server i dati della partita e riceve gli obiettivi sbloccati
    const handleGameEnd = async (difficulty, attemptsHistory, targetNumber, result) => {
        setLoading(true);
        try {
            const finish_api = await API.finishGame(difficulty, attemptsHistory, targetNumber, dayjs().format('YYYY-MM-DD'), user.id, result);
            setGoals(finish_api);
            setLoading(false);
            setGameState('finished');
            setAttempts(attemptsHistory.length);
            setTargetNumber(targetNumber);
            setResult(result);
        } catch (error) {
            console.log(error);
            setMessage({ msg: error.message, type: 'danger' });
        }
    };

    if (loading) {
        return (
            <Container className="py-5">
                <div className="d-flex align-items-center justify-content-center min-vh-50">
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" role="status" size="sm" />
                        <p className="lead mt-3 text-secondary">Caricamento gioco...</p>
                    </div>
                </div>
            </Container>
        );
    }

    // si può giocare solo se si è loggati
    if (!user) {
        return (
            <Container className="py-5">
                <Row className="text-center mb-5">
                    <Col>
                        <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-4 mb-4">
                            <GamepadIcon size={48} className="text-primary" />
                        </div>
                        <h1 className="display-4 fw-bold mb-3">Inizia a Giocare</h1>
                        <p className="lead text-secondary mb-4">
                            Per iniziare la tua avventura numerica, accedi o registrati!
                        </p>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => navigate('/login')}
                            className="px-5 py-3 shadow-sm"
                        >
                            Accedi Ora
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    // se la partita è in corso, mostro il tabellone di gioco
    if (gameState === 'playing') {
        return <GameBoard level={level} gameEnd={handleGameEnd} />;
    }

    // se lo stato è 'choose-difficulty', mostro i livelli di difficoltà per poter iniziare una nuova partita
    if (gameState === 'choose-difficulty') {
        return (
            <Container className="py-5">
                <Row className="text-center mb-5">
                    <Col>
                        <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-4 mb-4">
                            <Target size={48} className="text-primary" />
                        </div>
                        <h1 className="display-4 fw-bold mb-3">Scegli la Difficoltà</h1>
                        <p className="lead text-secondary">
                            Seleziona il livello che preferisci per iniziare la sfida
                        </p>
                    </Col>
                </Row>

                <Row className="g-4">
                    {[1, 2, 3, 4].map((level, index) => {
                        const { icon: LevelIcon, color, label } = levelIcons[index];
                        return (
                            <Col md={3} key={level}>
                                <Card
                                    className="h-100 border-0 shadow-sm hover-lift cursor-pointer"
                                    onClick={() => startGame(level)}
                                >
                                    <Card.Body className="text-center p-4">
                                        <div className={`bg-${color} bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3`}>
                                            <LevelIcon size={32} className={`text-${color}`} />
                                        </div>
                                        <h3 className="h4 mb-2">Livello {level}</h3>
                                        <p className="text-secondary mb-1">{label}</p>
                                        <p className="text-secondary mb-2">
                                            Indovina un numero tra 1 e {Math.pow(10, level)}
                                        </p>
                                        <p className={`text-${color} fw-bold mb-0`}>
                                            {level * 4} tentativi disponibili
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        );
    }

    // se la partita è finita, mostro il risultato e gli obiettivi sbloccati
    if (gameState === 'finished') {
        return (
            <Container className="py-5">
                <Row className="text-center mb-5">
                    <Col>
                        <div className={`bg-${result === Status.WON ? 'success' : 'danger'} bg-opacity-10 rounded-circle d-inline-flex p-4 mb-4`}>
                            <Award size={48} className={`text-${result === Status.WON ? 'success' : 'danger'}`} />
                        </div>
                        <h1 className="display-4 fw-bold mb-3">
                            {result === Status.WON ? 'Vittoria!' : 'Game Over'}
                        </h1>
                        <p className="lead text-secondary mb-2">
                            Il numero fortunato era: <span className="fw-bold">{targetNumber}</span>
                        </p>
                        <p className="text-secondary">
                            {attempts === 1 ? (
                                'Incredibile! Hai indovinato al primo tentativo!'
                            ) : (
                                `Hai utilizzato ${attempts} tentativi`
                            )}
                        </p>
                    </Col>
                </Row>

                <Row className="justify-content-center mb-5">
                    <Col md={6} className="text-center">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => startGame(level)}
                            className="w-100 mb-3 shadow-sm"
                        >
                            Gioca ancora allo stesso livello
                        </Button>
                        <Button
                            variant="outline-primary"
                            size="lg"
                            onClick={() => setGameState('choose-difficulty')}
                            className="w-100 mb-3 shadow-sm"
                        >
                            Scegli un altro livello
                        </Button>
                        <Button
                            variant="outline-secondary"
                            size="lg"
                            onClick={() => navigate('/goals')}
                            className="w-100 shadow-sm"
                        >
                            I tuoi obiettivi
                        </Button>
                    </Col>
                </Row>

                {goals.length > 0 ? (
                    <div className="mt-5">
                        <h2 className="h3 text-center mb-4">Obiettivi Sbloccati</h2>
                        <Row className="g-4">
                            {goals.map((goal) => (
                                <Col md={4} key={goal.id}>
                                    <div className="h-100 hover-lift">
                                        <GoalCard goal={goal} />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ) : (
                    <div className="text-center mt-5">
                        <p className="lead text-secondary">
                            Non hai sbloccato nuovi obiettivi in questa partita
                        </p>
                    </div>
                )}
            </Container>
        );
    }
}

export default GamePage;