import React from 'react';
import { Link } from 'react-router-dom';
import { GamepadIcon, Trophy, Target } from 'lucide-react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const HomePage = ({ user }) => {
    return (
        <Container className="py-5">
            {/* Hero Section */}
            <Row className="text-center mb-5">
                <Col>
                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-4 mb-4">
                        <GamepadIcon size={48} className="text-primary" />
                    </div>
                    {user ? (<h1 className="display-4 fw-bold mb-3">Benvenut*, {user.name}</h1>) : (<h1 className="display-4 fw-bold mb-3">Number Guesser</h1>)}

                    <p className="lead text-secondary mb-4">
                        Sfida la tua mente con un gioco di logica e deduzione.
                        Indovina il numero segreto nel minor numero di tentativi possibili!
                    </p>
                    {user ? (
                        <>
                            <Link to="/play" className="me-3">
                                <Button variant="primary" size="lg" className="px-5 py-3 shadow-sm">
                                    Inizia la Sfida
                                </Button>
                            </Link>
                            <Link to="/goals">
                                <Button variant="outline-primary" size="lg" className="px-5 py-3 shadow-sm">
                                    I tuoi obiettivi
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Link to="/login">
                            <Button variant="primary" size="lg" className="px-5 py-3 shadow-sm">
                                Accedi per Iniziare
                            </Button>
                        </Link>
                    )}
                </Col>
            </Row>

            {/* Features Section */}
            <Row className="g-4">
                <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm hover-lift">
                        <Card.Body className="text-center p-4">
                            <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                                <Target size={32} className="text-primary" />
                            </div>
                            <Card.Title className="h4 mb-3">Livelli Progressivi</Card.Title>
                            <Card.Text className="text-secondary">
                                Quattro livelli di difficoltà per metterti alla prova.
                                Inizia dal facile e scala fino al livello esperto!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm hover-lift">
                        <Card.Body className="text-center p-4">
                            <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                                <Trophy size={32} className="text-primary" />
                            </div>
                            <Card.Title className="h4 mb-3">Sistema Obiettivi</Card.Title>
                            <Card.Text className="text-secondary">
                                Sblocca achievement speciali completando sfide uniche
                                e migliorando le tue performance di gioco.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm hover-lift">
                        <Card.Body className="text-center p-4">
                            <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                                <GamepadIcon size={32} className="text-primary" />
                            </div>
                            <Card.Title className="h4 mb-3">Statistiche Dettagliate</Card.Title>
                            <Card.Text className="text-secondary">
                                Monitora i tuoi progressi con statistiche complete e
                                visualizza il tuo miglioramento nel tempo.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
};

export default HomePage;