import { Col, Container, Row } from "react-bootstrap";
import styles from "./MyFooter.module.css";
import instagram from "../assets/instagram.png";
import youtube from "../assets/facebook.png";
import facebook from "../assets/facebook.png";
import logo from "../assets/logo.png";

const MyFooter = () => {
  return (
    <Container className={styles.container} fluid>
      <Row className={`${styles.footer}`}>
        <Col>
          <img src={logo} />
          <div className="d-flex gap-4 mt-3 mb-3">
            <a href="https://instagram.com" target="_blank">
              <img src={instagram} />
            </a>
            <a href="https://youtube.com" target="_blank">
              <img src={youtube} />
            </a>
            <a href="https://facebook.com" target="_blank">
              <img src={facebook} />
            </a>
          </div>
          <p>ALM ChatBot © alguns direitos reservados.</p>
        </Col>

        <Col>
          <h3 className="mb-4">Contato</h3>

          <p>+55 61 99999-9999</p>
          <p>alm.contato@gmail.com</p>
          <p>St. Leste Projeção A - Gama Leste. 72444-240</p>
          <p>Brasília - DF</p>
        </Col>
        <Col>
          <h3 className="mb-4">Informações</h3>

          <p style={{ cursor: "pointer" }}>Termos e condições</p>
          <p style={{ cursor: "pointer" }}>Política de privacidade</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MyFooter;
