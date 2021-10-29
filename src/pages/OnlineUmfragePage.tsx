import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import "../styles.css";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import { useHistory } from "react-router-dom";

export const UmfrageOnline: React.FC = () => {
    const history = useHistory();
    const [modalIsOpen, setModalIsOpen] = useState(true);

    if (
        window.location.toString() !== "http://localhost:3000/fragender" ||
        window.location.toString() !== "http://localhost:3000/befragter"
    ) {
        document.querySelector("body > div.WatsonAssistantChatHost")?.remove();
    }

    const goToHomepage = () => {
        // eslint-disable-next-line no-restricted-globals
        history.push("/")
    };

    return (
        <>
        <Container fluid>
            <Modal 
                isOpen={modalIsOpen}
                style={{
                    overlay: {
                    position: 'fixed',
                    backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    },
                    content: {
                    position: 'absolute',
                    top: '10%',
                    left: '20%',
                    right: '20%',
                    bottom: '6%',
                    border: '2px solid #000000',
                    overflow: 'auto',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '3%',
                    }
                }}
            >
                    <h1>Teilnahme zur Umfrage</h1>
                    <b>Zur Verbesserung der Lernplattform benötigen wird deine Hilfe!</b><br></br><br></br>

                    <p>Um unsere Lernplattform stetig weiter verbessern zu können, benötigen wir dazu deine Meinung zu der von uns erstellten Lernplattform. Über den
                    unten stehenden Link wirst du direkt zur Plattform 'Umfrageonline.com' weitergeleitet. <b>Keine Angst dieser Link wird regelmäßig von uns kontrolliert.</b>
                    <br></br>Dort wird der Evaluationsbogen zur Verfügung gestellt. <br></br>
                    Die Bearbeitungsdauer dieser Umfrage beträgt etwa <b>5-10 Minuten</b>. Für die Verbesserung der Lernplattform ist es wichtig, dass du den Fragebogen vollständig ausfüllst und keine der Fragen auslässt. Weiterhin kannst du dein persönliches Feedback im Textfeld nach dem Fragebogen angeben.
                    Deine Angaben werden von uns selbstverständlich vertraulich behandelt, sie können deiner Person nicht zugeordnet werden und werden streng vertraulich behandelt.
                    <br></br>Sobald du fertig bist, klicke einfach auf den 'Schließen' Button um zurück zur Homepage geleitet zur Werden.</p>

                    Link zur Umfrage: <Link to={{ pathname: "https://www.umfrageonline.com/s/761ce8a" }} target="_blank"> Umfrageonline.de/Lernplattform </Link><br></br>
                    <b>Vielen Dank für deine Teilnahme!</b><br></br><br></br>

                    <Button variant="primary" onClick={()=>goToHomepage()}>
                        Schließen
                    </Button>
            </Modal>
        </Container>
        </>
  );
};

