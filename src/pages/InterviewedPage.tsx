import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { RouteComponentProps, useHistory } from "react-router-dom";
import "../styles.css";

type TParams = { id: string };

export const InterviewedPage = ({ match }: RouteComponentProps<TParams>) => {
  const history = useHistory();
  const [category_id] = useState(match.params.id);

  if (
    window.location.toString() ===
      "http://localhost:3000/befragter/" + category_id &&
    !document.querySelector("body > div.WatsonAssistantChatHost")
  ) {
    window.watsonAssistantChatOptions = {
      integrationID: "08818266-e54b-49a9-9009-ad5778cbb46c", // The ID of this integration.
      region: "eu-de", // The region your integration is hosted in.
      serviceInstanceID: "ec5fee4d-65db-4469-8700-6edbf1f31303", // The ID of your service instance.
      //element: document.getElementById("chatBot"),  //chatbot im eigenen elem rendern
      //showLauncher: "false",
      onLoad: function (instance: any) {
        instance.render();
      },
    };
    setTimeout(function () {
      const t = document.createElement("script");
      t.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
      document.head.appendChild(t);
    });
  }

  const handleButton = () => {
    history.push("/abschlusstest");
  };

  return (
    <Container>
      <Row className="flex-column justify-content-md-start">
        <Col id="chatBot" className="chatBot" md="7">
          <Image src="/MindMapCyber.png" alt="Mindmap" fluid />
        </Col>
        <Col>
          <Button onClick={() => handleButton()}>zum Abschlusstest</Button>
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
