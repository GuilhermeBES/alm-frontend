import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./MyNavbar.module.css";
import logo from "../assets/logo.png";

const MyNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hiddenButtonRoutes = ["/admin"];
  const shouldShowButton = !hiddenButtonRoutes.includes(location.pathname);

  return (
    <>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="sm"
        bg="dark"
        variant="dark"
        data-bs-theme="dark"
      >
        <Container fluid>
          {/* Logo à esquerda */}
          <Navbar.Brand href="/">
            <img src={logo} style={{ height: "4rem" }} alt="Logo" />
          </Navbar.Brand>

          {/* Botão toggle para telas pequenas */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* Menu colapsável */}
          {shouldShowButton && (
            <>
              <Navbar.Collapse id="responsive-navbar-nav">
                {/* Espaçamento flexível para posicionar o conteúdo */}
                <div className="d-flex w-100 justify-content-between align-items-center">
                  {/* Links no centro */}
                  <Nav className={`mx-auto`}>
                    <Nav.Link className="me-5" href="/#">
                      Sobre Nós
                    </Nav.Link>
                    <Nav.Link className="me-5" href="/#duvidas">Dúvidas Frequentes</Nav.Link>
                    <Nav.Link className="me-5" href="/#">Aprendizagem</Nav.Link>
                    <Nav.Link className="me-5" href="/acoes">Ações</Nav.Link>
                  </Nav>
                  <Button
                    className={styles.mainButton}
                    variant="primary"
                    onClick={() => navigate("/simulacao")}
                  >
                    Simular agora
                  </Button>

                  <Button
                    className={`${styles.secondaryButton} ms-3`}
                    variant="primary"
                    onClick={() => navigate("/admin")}
                  >
                    Entrar
                  </Button>
                </div>
              </Navbar.Collapse>
            </>
          )}
          {!shouldShowButton && (
            <Button className={styles.mainButton} variant="primary" onClick={() => navigate("/")}>
              Voltar ao site
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
