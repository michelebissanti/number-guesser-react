import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar, Spinner, Button } from 'react-bootstrap';
import { Trophy } from 'lucide-react';
import API from '../API.mjs';
import { Goal, Stat } from '../models.mjs';
import GoalCard from '../components/GoalCard';
import { StatsTable } from '../components/StatsTable';

function GoalsPage(props) {
    const [goals, setGoals] = useState([]);
    const [stats, setStats] = useState([]);
    const [filter, setFilter] = useState('all');
    const user = props.user;

    // se l'utente è loggato richiede al server la lista degli obiettivi e le statistiche dell'utente
    // altrimenti richiede solo la lista degli obiettivi
    // viene eseguito al primo render e quando cambia "user"
    useEffect(() => {
        const getGoals = async () => {
            if (user === '') {
                try {
                    const goals_api = await API.getGoals();
                    setGoals(goals_api);
                } catch (error) {
                    console.log(error);
                    props.setMessage({ msg: error.message, type: 'danger' });
                }
            } else {
                try {
                    const goals_api = await API.getGoalsByUser(user.id);
                    setGoals(goals_api);
                } catch (error) {
                    console.log(error);
                    props.setMessage({ msg: error.message, type: 'danger' });
                }

                try {
                    const stats = await API.getStats(user.id);
                    setStats(stats);
                } catch (error) {
                    console.log(error);
                    props.setMessage({ msg: error.message, type: 'danger' });
                }
            }
        };

        getGoals();
    }, [user]);

    if (goals.length === 0) {
        return (
            <Container className="py-5">
                <div className="d-flex align-items-center justify-content-center min-vh-50">
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" role="status" size="sm" />
                        <p className="lead mt-3 text-secondary">Caricamento obiettivi...</p>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            {/* Header Section */}
            <Row className="text-center mb-5">
                <Col>
                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-4 mb-4">
                        <Trophy size={48} className="text-primary" />
                    </div>
                    <h1 className="display-4 fw-bold mb-3">I Tuoi Obiettivi</h1>
                    {user ? (
                        <p className="lead text-secondary">
                            Traccia i tuoi progressi e sblocca nuovi traguardi nella tua avventura numerica!
                        </p>
                    ) : (
                        <div className="mt-4">
                            <p className="lead text-secondary mb-4">
                                Accedi per iniziare a sbloccare obiettivi e tracciare i tuoi progressi!
                            </p>
                            <Button variant="primary" size="lg" href="/login" className="px-5 py-3 shadow-sm">
                                Accedi Ora
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>

            {/* Stats Section */}
            {stats.length > 0 && (
                <Card className="border-0 shadow-sm mb-5">
                    <Card.Body className="p-4">
                        <h2 className="h4 mb-4">Le tue Statistiche</h2>
                        <StatsTable stats={stats} />
                    </Card.Body>
                </Card>
            )}

            {/* Filters Section */}
            {user && (
                <div className="mb-5">
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <h2 className="h4 mb-0">Lista Obiettivi</h2>
                        <div className="btn-group shadow-sm">
                            <Button
                                variant={filter === 'all' ? 'primary' : 'light'}
                                onClick={() => setFilter('all')}
                                className="px-4"
                            >
                                Tutti
                            </Button>
                            <Button
                                variant={filter === 'unlocked' ? 'success' : 'light'}
                                onClick={() => setFilter('unlocked')}
                                className="px-4"
                            >
                                Sbloccati
                            </Button>
                            <Button
                                variant={filter === 'locked' ? 'danger' : 'light'}
                                onClick={() => setFilter('locked')}
                                className="px-4"
                            >
                                Da Sbloccare
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Goals Grid */}
            <Row className="g-4">
                {goals
                    .filter(goal => {
                        if (filter === 'all') return true;
                        if (filter === 'unlocked') return goal.achieved;
                        if (filter === 'locked') return !goal.achieved;
                        return true;
                    })
                    .map((goal) => (
                        <Col md={4} key={goal.id}>
                            <div className="h-100 hover-lift">
                                <GoalCard goal={goal} />
                            </div>
                        </Col>
                    ))}
            </Row>
        </Container>
    );
}

export default GoalsPage;