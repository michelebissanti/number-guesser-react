import React from 'react';
import { Table, Card, Row, Col } from 'react-bootstrap';

function StatsTable({ stats }) {
    const totalWon = stats.reduce((acc, stat) => acc + stat.won, 0);
    const totalLost = stats.reduce((acc, stat) => acc + stat.lost, 0);
    const totalGames = totalWon + totalLost;
    const winRate = totalGames > 0 ? ((totalWon / totalGames) * 100).toFixed(1) : 0;

    return (
        <>
            <Row className="g-4 mb-4">
                <Col md={3}>
                    <Card className="border-0 bg-primary bg-opacity-10 h-100">
                        <Card.Body className="text-center">
                            <h6 className="text-primary mb-2">Partite Totali</h6>
                            <h3 className="mb-0 fw-bold">{totalGames}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="border-0 bg-success bg-opacity-10 h-100">
                        <Card.Body className="text-center">
                            <h6 className="text-success mb-2">Vittorie</h6>
                            <h3 className="mb-0 fw-bold">{totalWon}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="border-0 bg-danger bg-opacity-10 h-100">
                        <Card.Body className="text-center">
                            <h6 className="text-danger mb-2">Sconfitte</h6>
                            <h3 className="mb-0 fw-bold">{totalLost}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="border-0 bg-info bg-opacity-10 h-100">
                        <Card.Body className="text-center">
                            <h6 className="text-info mb-2">% Vittoria</h6>
                            <h3 className="mb-0 fw-bold">{winRate}%</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Table hover className="shadow-sm bg-white">
                <thead className="bg-light">
                    <tr>
                        <th className="border-0">Difficoltà</th>
                        <th className="border-0 text-center">Vinte</th>
                        <th className="border-0 text-center">Perse</th>
                        <th className="border-0 text-center">% Vittoria</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((stat, index) => {
                        const total = stat.won + stat.lost;
                        const winRate = total > 0 ? ((stat.won / total) * 100).toFixed(1) : 0;
                        return (
                            <tr key={index}>
                                <td className="fw-medium">{stat.difficulty}</td>
                                <td className="text-center text-success">{stat.won}</td>
                                <td className="text-center text-danger">{stat.lost}</td>
                                <td className="text-center">{winRate}%</td>
                            </tr>
                        );
                    })}
                    <tr className="bg-light">
                        <td className="fw-bold">Totale</td>
                        <td className="text-center fw-bold text-success">{totalWon}</td>
                        <td className="text-center fw-bold text-danger">{totalLost}</td>
                        <td className="text-center fw-bold">{winRate}%</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export { StatsTable };