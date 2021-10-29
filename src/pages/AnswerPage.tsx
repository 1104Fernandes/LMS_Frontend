import React, { useContext, useState } from "react";
import { answerContext } from "../contexts/AnswerContext";
import { Answer } from "../models/Answers";
import { Container, Row, Table } from "react-bootstrap";

export const AnswerPage: React.FC = () => {
  const context = useContext(answerContext);
  const [answers, setAnswers] = useState<Answer[]>(context.answers);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Antwort ID</th>
              <th>Antwort</th>
              <th>Frage ID</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer) => {
              return (
                <tr key={String(answer.answer_id)}>
                  <td>{String(answer.answer_id)}</td>
                  <td>{String(answer.description)}</td>
                  <td>{String(answer.question_id)}</td>
                </tr>
              );
            })} 
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};
