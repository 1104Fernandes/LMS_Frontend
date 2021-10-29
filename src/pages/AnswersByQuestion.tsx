import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { BsPencil, BsTrashFill } from "react-icons/bs";
import { RouteComponentProps } from "react-router-dom";
import { Response } from "../contexts/ResponseContext";
import { answerContext } from "../contexts/AnswerContext";
import { Answer, CreateAnswerData } from "../models/Answers";
import { userContext } from "../contexts/UserContext";
type TParams = { id: string };

export const AnswersByQuestion = ({ match }: RouteComponentProps<TParams>) => {
  const user_context = useContext(userContext);
  const context = useContext(answerContext);
  const [answers, setAnswers] = useState<Answer[]>(context.answers);
  const host = "http://localhost:4000/api/answer";
  const [show, setShowModal] = useState(false);
  const [show1, setShowModal1] = useState(false);
  const [show2, setShowModal2] = useState(false);
  const [description, setDescription] = useState("");
  const [row, setRow] = useState<Answer>({
    answer_id: 0,
    description: "",
    question_id: 0,
  });

  const [updateID, setUpdateID] = useState(0);
  const [updateDescription, setUpdateDescription] = useState(row.description);
  const [updateQuestion, setUpdateQuestion] = useState(row.question_id);
  const [question] = useState(Number(match.params.id));
  const history = useHistory();

  const changeHandler = (e: any) => {
    setDescription(e.target.value);
  };
  const handleClose = () => {
    setShowModal(false);
    setShowModal1(false);
    setShowModal2(false);
  };
  const handleShow = () => setShowModal(true);

  const handleShow1 = (answer: Answer) => {
    setShowModal1(true);
    setRow(answer);
  };

  const handleShow2 = (answer: Answer) => {
    setShowModal2(true);
    setRow(answer);
    setUpdateID(answer.answer_id);
    setUpdateDescription(answer.description);
    setUpdateQuestion(answer.question_id);
  };

  const updateChangeHandler = (e: any) => {
    setUpdateDescription(e.target.value);
  };

  useEffect(() => {
    if (answers !== null) {
      setAnswers((answers: Answer[]) =>
        answers.filter(
          (answer) => Number(answer.question_id) === Number(match.params.id)
        )
      );
    }
  }, [match.params.id]);

  const onCreateAnswer = async (answerData: CreateAnswerData) => {
    try {
      const res = await fetch(host, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user_context.actions.authHeader()!,
        },
        body: JSON.stringify(answerData),
      });

      if (res.status === 200) {
        const { data: newAnswer } = (await res.json()) as Response<Answer>;
        console.log(newAnswer);
        setAnswers([...answers, newAnswer]);
        handleClose();
      } else {
        //TODO Errormeldung!
      }
    } catch (e) {
      console.error(e);
      handleClose();
    }
  };

  const onDeleteAnswer = async (answerData: Answer) => {
    if (answerData === null) return;
    try {
      const res = await fetch(`${host}/${answerData.answer_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: user_context.actions.authHeader()!,
        },
        body: JSON.stringify(answerData),
      });

      if (res.status === 200) {
        const { data: Answer } = (await res.json()) as Response<Answer>;

        setAnswers(
          answers.filter((answers) => answers.answer_id !== Answer.answer_id)
        );
        handleClose();
      } else {
        //TODO Errormeldung!
      }
    } catch (e) {
      console.error(e);
      handleClose();
    }
  };

  const onUpdateAnswer = async (answerData: Answer) => {
    if (answerData === null) return;
    try {
      const res = await fetch(`${host}/${answerData.answer_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: user_context.actions.authHeader()!,
        },
        body: JSON.stringify(answerData),
      });

      if (res.status === 200) {
        const { data: newAnswer } = (await res.json()) as Response<Answer>;

        answers.forEach((answer) => {
          if (answer.answer_id === newAnswer.answer_id) {
            answer.description = newAnswer.description;
            answer.question_id = newAnswer.question_id;
          }
        });

        handleClose();
      } else {
        //TODO Errormeldung!
      }
    } catch (e) {
      console.error(e);
      handleClose();
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-end">
        <Col md="6" className="p-0">
          <Button
            className="createButton rounded-upperleft"
            variant="info"
            onClick={handleShow}
            size="lg"
            block
          >
            Neue Antwort erstellen
          </Button>{" "}
        </Col>
        <Col md="6" className="p-0">
          <Button
            className="createButton rounded-upperright"
            variant="info"
            onClick={() => {
              history.goBack();
            }}
            size="lg"
            block
          >
            zurück zu Fragen
          </Button>{" "}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Antwort ID</th>
              <th>Antwort</th>
              <th>Frage ID</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer) => {
              return (
                <tr key={String(answer.answer_id)}>
                  <td>{String(answer.answer_id)}</td>
                  <td>{String(answer.description)}</td>
                  <td>{String(answer.question_id)}</td>
                  <td>
                    <Button
                      className="editButton"
                      variant="white"
                      onClick={() => handleShow2(answer)}
                    >
                      <BsPencil />
                    </Button>
                    &nbsp;
                    <Button
                      className="deleteButton"
                      variant="white"
                      onClick={() => handleShow1(answer)}
                    >
                      <BsTrashFill />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
      <>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Antwort erstellen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Antwort Textfeld</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={changeHandler}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Schließen
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                onCreateAnswer({
                  description: description,
                  question_id: question,
                })
              }
            >
              Speichern
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <>
        <Modal show={show1} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Löschen bestätigen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>
                  Möchten Sie wirklich die ausgewählte Antwort Löschen?
                </Form.Label>
                <p>
                  <strong>{String(row.description)}</strong>
                </p>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Schließen
            </Button>
            <Button variant="danger" onClick={() => onDeleteAnswer(row)}>
              Löschen
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <>
        <Modal show={show2} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Frage bearbeiten</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Frage Textfeld</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={updateDescription}
                  onChange={updateChangeHandler}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Schließen
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                onUpdateAnswer({
                  answer_id: updateID,
                  description: updateDescription,
                  question_id: question,
                })
              }
            >
              Speichern
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
};
