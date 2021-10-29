import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { RouteComponentProps, useHistory } from "react-router-dom";
import "../styles.css";

type TParams = { id: string };


export const LearningEntryPage = ({ match }: RouteComponentProps<TParams>) => { 
  const history = useHistory();
  const [category_id] = useState(match.params.id);
  console.log('param: ',match.params.id);
  console.log(category_id);
  
  if (
    window.location.toString() !== "http://localhost:3000/fragender/" + category_id ||
    window.location.toString() !== "http://localhost:3000/befragter/" + category_id
  ) {
    document.querySelector("body > div.WatsonAssistantChatHost")?.remove();
  }

  const handleFirst = () => {
    history.push(`/fragender/${category_id}`);
  };

  const handleSecond = () => {
    history.push(`/befragter/${category_id}`);
  };

  return (
    <Container>
      <h1 className="text-center m-3">Lernmethoden Auswahl</h1>
      <Row className="justify-content-md-center mt-5">
        <Col md="4">
          <Card>
            <Card.Header>KI-Chatbot</Card.Header>
            <Card.Body>
              <Card.Title>Fragender</Card.Title>
              <Card.Text>
                Möchten Sie den Chatbot befragen? Dann klicken Sie auf den
                Button "Fragender"
              </Card.Text>
              <Button variant="primary" onClick={() => handleFirst()}>
                Fragender
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <Card.Header>KI-Chatbot</Card.Header>
            <Card.Body>
              <Card.Title>Befragter</Card.Title>
              <Card.Text>
                Möchten Sie vom Chatbot befragt werden? Dann klicken Sie auf den
                Button "Befragter"
              </Card.Text>
              <Button variant="primary" onClick={() => handleSecond()}>
                Befragter
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
/*
Main Catch: All the statics should placed inside the public folder. Any video, audio, images, etc.

Why?
Public folder will not be processed by Web-pack and hence remains untouched and you could see it as it is. 
Placing it anywhere else would be processed and tweaked and optimised by webpacks, thus may change the compression, 
or extensions of video file that result in unproper parsing of code (though it is not seen with images, videos get affected by it).

How to access public folder from code?
Every file url is pointed to public folder. Every file url with ./ is pointed to file directory.
To access public/video1.mp4 just write url='video1.mp4'
*/
