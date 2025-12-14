import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';

export default function NotFound() {
    return (
        <Container className="py-5">
            <Row className="text-center">
                <Col>
                    <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex p-4 mb-4">
                        <h1 className="display-1 text-danger">404</h1>
                    </div>
                    <h2 className="mb-4">Pagina Non Trovata</h2>
                    <p className="lead text-secondary mb-4">
                        Ops! Sembra che tu stia cercando una pagina che non esiste.
                    </p>
                    <Link to="/">
                        <Button variant="primary" className="px-4 py-2">
                            <HomeIcon size={18} className="me-2" />
                            Torna alla Home
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}