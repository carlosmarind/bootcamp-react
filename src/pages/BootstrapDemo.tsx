import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react"
import { Accordion, Col, Container, Row, Table } from "react-bootstrap";

function BootstrapDemo() {

  //llamada a backend usando token via GET
  useEffect(() => {

    fetch("http://localhost:3001/api/get_endpoint", {
      method: "GET",
      headers: {
        authorization: "Bearer miTokenSecreto"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`problemas al llamar al endpoint ${response.status}`)
        }
        // si endpoint nos respondio bien
      }).catch((error) => {
        console.log(error)
      })

  }, []);

  // llamada a backend usando token via POST
  useEffect(() => {

    fetch("http://localhost:3001/api/post_endpoint", {
      method: "POST",
      body: JSON.stringify({ nombre: "alejadra", apellido: "cualquiera" }),
      headers: {
        authorization: "Bearer miTokenSecreto"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`problemas al llamar al endpoint ${response.status}`)
        }
        // si endpoint nos respondio bien
      }).catch((error) => {
        console.log(error)
      })

  }, []);

  return <Container fluid>
    <Row>
      <Col sm={12} lg={3}>1 of 1</Col>
      <Col sm={12} lg={true}>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
      <Col sm={12} lg={3}> 1 of 3</Col>
    </Row>
    <Row>
      <Col sm={2} lg={2}>1 of 1</Col>
      <Col sm={8} lg={8}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>

      </Col>
      <Col sm={2} lg={2}> 1 of 3</Col>
    </Row>
  </Container>

}

export { BootstrapDemo }
