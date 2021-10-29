import React from "react";
import Jumbotrons from "../components/Jumbotron";
import { CardElement } from "../../src/components/card";
import { Col, Container, Row, Image } from "react-bootstrap";
import "../styles.css";

export const HomePage: React.FC = () => {
  if (
    window.location.toString() !== "http://localhost:3000/fragender" ||
    window.location.toString() !== "http://localhost:3000/befragter"
  ) {
    document.querySelector("body > div.WatsonAssistantChatHost")?.remove();
  }
  return (
    <>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md="auto" className="p-0 position-absolute">
            <Jumbotrons />
          </Col>
        </Row>
        <Row className="justify-content-md-flex-end titel_col">
          <Col md lg="6" className="custom_col">
            <div className="title_box">
              <h1 className="title_box_h1">Security Awareness Training</h1>
              <p className="title_box_p">
                Stärken Sie Ihre menschliche Firewall!
              </p>
            </div>
          </Col>
          <Col md lg="6" className="custom_col">
            <div className="intention_box">
              <h3 className="intention_box_h3">Angriffsziel Mitarbeiter</h3>
              <p className="intention_box_p">
                Wussten Sie, dass die meisten aller erfolgreichen Cyber-Angriffe
                auf dem Fehlverhalten von Mitarbeitern basieren? In vielen
                Unternehmen wurde in der Vergangenheit die Sicherheit in den
                Bereichen Virenschutz und Firewall auf ein vernünftiges Maß
                erhöht. Aktuelle Cyber-Angriffe konzentrieren sich jedoch auf
                das schwächste Glied der Verteidigungskette – den Menschen.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <div className="custom_div">
              <h2 className="custom_h_white">Sicherheitsrisiko Mensch</h2>
              <p className="custom_p_white">
                Da der Großteil aller Cyberangriffe mit einer E-Mail beginnt,
                steht und fällt die Sicherheit Ihrer Daten mit aufmerksamen
                Endbenutzern. Klassische Cyber-Attacken nutzen oftmals die
                Schwachstelle Mensch aus, um gezielt an Informationen zu
                gelangen. Social Engineering Angriffe oder Cyber Attacken werden
                mit infizierten Phishing E-Mails oder personalisierten Spear
                Phishing E-Mails an ausgewählte Mitarbeiter verschickt, um die
                Datensicherheit zu gefährden.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="mt-6 justify-content-md-center Card_row">
          <Col md="auto">
            <CardElement
              width="30"
              background="#fff"
              bordersize="1"
              border_radius="0.25rem"
              title_color="black"
              text_color="black"
              src="./study.jpg"
              title="AWARENESS TEST"
              text="Wieviele Ihrer Nutzer klicken auf fingierte Phishing-Mails? 
                    Probieren Sie unsere Tests aus und erhalten Sie einen ersten Eindruck über das Sicherheitsverhalten Ihres Unternehmens!"
            />
          </Col>
          <Col md="auto">
            <CardElement
              width="30"
              background="#fff"
              bordersize="1"
              border_radius="0.25rem"
              title_color="black"
              text_color="black"
              src="./learning.jpg"
              title="TRAININGSINHALTE"
              text="Stöbern Sie in Security Awareness Trainingsinhalten mithilfe eines KI-Assistenten! 
                    Überzeugen Sie sich selbst von den ansprechenden Schulungsmethoden die nachhaltig wirken!"
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center  mt-5">
          <Col md="auto" lg="12" className="text-center">
            <h2>Sicherheitslücken für Hacker</h2>
          </Col>
          <Col md="auto">
            <Image className="bg-white" src="./Sicherheitslücken.png" fluid />
          </Col>
        </Row>
        <Row className="justify-content-md-center bg-dark">
          <Col md lg="5" className="risk_col">
            <div className="mt-5">
              <h2 className="custom_h_dark">Sicherheitsrisiko Mensch</h2>
              <p className="custom_p_dark">
                Da der Großteil aller Cyberangriffe mit einer E-Mail beginnt,
                steht und fällt die Sicherheit Ihrer Daten mit aufmerksamen
                Endbenutzern. Klassische Cyber-Attacken nutzen oftmals die
                Schwachstelle Mensch aus, um gezielt an Informationen zu
                gelangen. Social Engineering Angriffe oder Cyber Attacken werden
                mit infizierten Phishing E-Mails oder personalisierten Spear
                Phishing E-Mails an ausgewählte Mitarbeiter verschickt, um die
                Datensicherheit zu gefährden.
              </p>
            </div>
          </Col>
          <Col md lg="5" className="risk_col">
            <div className="bg-white mt-3">
              <h3 className="intention_box_h3">
                Minimieren Sie Risiken über das Einfallstor Mitarbeiter
              </h3>
              <p className="intention_box_p">
                Wieso sollte ein Angreifer tagelang versuchen die
                Sicherheitstechnik auszutricksen, wenn er mit einem
                betrügerischen Anruf oder durch eine Phishing-Mail die
                Zugangsdaten des Mitarbeiters sofort erhält. Mit diesen
                Zugangsdaten greift er ungebremst auf das Netzwerk zu. Erst dann
                verursacht er den eigentlichen Schaden wie den Datendiebstahl,
                die Verschlüsselung der Systeme einhergehend mit Erpressung oder
                einen erheblichen Produktionsausfall.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
