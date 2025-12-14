import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Target, History, Gamepad2 } from 'lucide-react';
import { Container, Row, Col, Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import { Status } from '../models.mjs';

export function GameBoard(props) {
    const level = props.level;
    const [guess, setGuess] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [maxAttempts, setMaxAttempts] = useState(level * 4);
    const [attemptsHistory, setAttemptsHistory] = useState([]);
    const randomNumber = Math.floor(Math.random() * Math.pow(10, level)) + 1;
    const [targetNumber, setTargetNumber] = useState(randomNumber);

    // funzione per fare un tentativo
    // se il tentativo è corretto, setta il feedback e chiama la funzione gameEnd
    // se il tentativo è sbagliato, setta il feedback e se i tentativi sono finiti chiama la funzione gameEnd
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!guess) return;

        const newAttempts = attempts + 1;
        const newAttemptsHistory = [...attemptsHistory, guess];

        setAttempts(newAttempts);
        setAttemptsHistory(newAttemptsHistory);

        if (guess === targetNumber) {
            setFeedback('Congratulazioni! Hai indovinato il numero!');
            props.gameEnd(level, newAttemptsHistory, targetNumber, Status.WON);
        } else {
            if (maxAttempts < newAttempts + 1) {
                setFeedback('Game over! Hai esaurito i tentativi.');
                setLoading(true);
                props.gameEnd(level, newAttemptsHistory, targetNumber, Status.LOST);
            } else {
                setFeedback(guess > targetNumber ? 'Troppo alto!' : 'Troppo basso!');
            }
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body className="p-4">
                            {/* Header Section */}
                            <div className="text-center mb-4">
                                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                                    <Gamepad2 size={32} className="text-primary" />
                                </div>
                                <h2 className="h3 mb-2">Livello {level}</h2>
                                <div className="d-flex align-items-center justify-content-center gap-2">
                                    <Target size={18} className="text-primary" />
                                    <p className="mb-0">
                                        <span className="fw-bold text-primary">{maxAttempts - attempts}</span>
                                        <span className="text-secondary"> tentativi rimanenti su </span>
                                        <span className="fw-bold text-primary">{maxAttempts}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Game Form */}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-medium">
                                        Inserisci un numero tra 1 e {Math.pow(10, level)}:
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={guess}
                                        onChange={(e) => {
                                            // se il campo è vuoto, setta guess a ''
                                            // altrimenti, setta guess con il suo valore intero
                                            const val = e.target.value === '' ? '' : parseInt(e.target.value);
                                            setGuess(val);
                                        }}
                                        min={1}
                                        max={Math.pow(10, level)}
                                        placeholder="Inserisci il tuo tentativo"
                                        disabled={loading}
                                        className="form-control-lg text-center"
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={loading || !guess}
                                        size="lg"
                                        className="shadow-sm"
                                    >
                                        {loading ? (
                                            <Spinner animation="border" size="sm" />
                                        ) : (
                                            'Invia Tentativo'
                                        )}
                                    </Button>
                                </div>
                            </Form>

                            {/* Feedback Alert */}
                            {feedback && (
                                <Alert
                                    variant={feedback.includes('Congratulazioni') ? 'success' :
                                        feedback.includes('Game over') ? 'danger' : 'info'}
                                    className="mt-4 text-center"
                                >
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                        {feedback.includes('alto') && <ArrowUp size={24} className="text-primary" />}
                                        {feedback.includes('basso') && <ArrowDown size={24} className="text-danger" />}
                                        <span className="fw-medium">{feedback}</span>
                                    </div>
                                </Alert>
                            )}

                            {/* Attempts History */}
                            {attemptsHistory.length > 0 && (
                                <div className="mt-4">
                                    <div className="d-flex align-items-center gap-2 mb-3">
                                        <History size={18} className="text-primary" />
                                        <h5 className="mb-0">Storico Tentativi</h5>
                                    </div>
                                    <div className="list-group">
                                        {attemptsHistory.map((attempt, index) => (
                                            <div
                                                key={index}
                                                className="list-group-item border-0 d-flex justify-content-between align-items-center bg-light rounded mb-2"
                                            >
                                                <span className="fw-medium">
                                                    Tentativo {index + 1}:
                                                    <span className="text-primary ms-2">{attempt}</span>
                                                </span>
                                                {attempt !== targetNumber && (
                                                    <div className={`badge ${attempt > targetNumber ? 'bg-primary' : 'bg-danger'}`}>
                                                        {attempt > targetNumber ? (
                                                            <ArrowUp size={18} />
                                                        ) : (
                                                            <ArrowDown size={18} />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}