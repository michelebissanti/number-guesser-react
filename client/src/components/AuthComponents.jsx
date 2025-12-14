import { useState } from 'react';
import { Form, Button, Row, Col, Card, Container, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { User, Lock, LogIn, ArrowLeft } from 'lucide-react';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // funzione per sottomettere il login con i dati del form
  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = { username, password };
    props.login(credentials);
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="border-0 shadow-lg">
            <Card.Body className="p-5">
              {/* Header Section */}
              <div className="text-center mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                  <User size={32} className="text-primary" />
                </div>
                <h2 className="h3 mb-4">Accedi per giocare</h2>
              </div>

              {/* Login Form */}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-4">
                  <Form.Label className="fw-medium">Indirizzo Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light">
                      <User size={18} className="text-primary" />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="Inserisci la tua email"
                      value={username}
                      onChange={ev => setUsername(ev.target.value)}
                      required
                      className="py-2"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="password" className="mb-4">
                  <Form.Label className="fw-medium">Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light">
                      <Lock size={18} className="text-primary" />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Inserisci la password"
                      value={password}
                      onChange={ev => setPassword(ev.target.value)}
                      required
                      minLength={6}
                      className="py-2"
                    />
                  </InputGroup>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="mb-3 py-2 shadow-sm"
                  >
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <LogIn size={20} />
                      <span>Accedi</span>
                    </div>
                  </Button>

                  <Link
                    to="/"
                    className="btn btn-light btn-lg shadow-sm"
                  >
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <ArrowLeft size={20} />
                      <span>Torna indietro</span>
                    </div>
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

function LogoutButton(props) {
  return (
    <Button
      variant="outline-light"
      onClick={props.logout}
      className="d-flex align-items-center gap-2"
    >
      <LogIn size={18} />
      <span>Logout</span>
    </Button>
  );
}

export { LoginForm, LogoutButton };