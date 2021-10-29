import React from "react";
import { Container } from "react-bootstrap";

export const StatisticPage: React.FC = () => {
  if (
    window.location.toString() !== "http://localhost:3000/fragender" ||
    window.location.toString() !== "http://localhost:3000/befragter"
  ) {
    document.querySelector("body > div.WatsonAssistantChatHost")?.remove();
  }
  return (
    <>
      <Container fluid>
        <p className="intention_box_p">
          ----Statistic section Comming Soon----
        </p>
      </Container>
    </>
  );
};
