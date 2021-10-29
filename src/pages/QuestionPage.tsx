import React, { useContext, useEffect, useState } from "react";
import { questionContext } from "../contexts/QuestionContext";
import { CreateQuestionData, Question } from "../models/Questions";
import { Response } from "../contexts/ResponseContext";
import { Button, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { BsList, BsPencil, BsTrashFill } from "react-icons/bs";
import { Category } from "../models/Category";
import { categoryContext } from "../contexts/CategoryContext";
import { Link } from "react-router-dom";
import { userContext } from "../contexts/UserContext";

export const QuestionPage: React.FC = () => {
  const user_context = useContext(userContext);
  const context = useContext(questionContext);
  const categoryContent = useContext(categoryContext);
  const host = "http://localhost:4000/api/question";
  const [questions, setQuestions] = useState<Question[]>(context.questions);
  const [categories, setCategory] = useState<Category[]>(
    categoryContent.categories
  );
  const [show, setShowModal] = useState(false);
  const [show1, setShowModal1] = useState(false);
  const [show2, setShowModal2] = useState(false);
  const [description, setDescription] = useState("");
  const [radioState, setRadioState] = useState(1);
  const [selectState, setSelectState] = useState(1);
  const [row, setRow] = useState<Question>({
    question_id: 0,
    description: "",
    category_id: 0,
    difficult_id: 0,
  });
  const [updateID, setUpdateID] = useState(0);
  const [updateDescription, setUpdateDescription] = useState(row.description);
  const [updateRadioState, setUpdateRadioState] = useState(row.difficult_id);
  const [updateSelectState, setUpdateSelectState] = useState(row.category_id);

  const handleRadio = (nr: number) => {
    setRadioState(nr);
    setUpdateRadioState(nr);
  };

  const handleSelect = (target: any) => {
    setSelectState(target.value);
    setUpdateSelectState(target.value);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowModal1(false);
    setShowModal2(false);
  };

  const handleShow = () => setShowModal(true);

  const handleShow1 = (question: Question) => {
    setShowModal1(true);
    setRow(question);
  };

  const handleShow2 = (question: Question) => {
    setShowModal2(true);
    setRow(question);
    setUpdateID(question.question_id);
    setUpdateDescription(question.description);
    setUpdateRadioState(question.difficult_id);
    setUpdateSelectState(question.category_id);
  };

  // Do the magic
  useEffect(() => {
    if (questions !== null) {      
      setCategory(categories);
    }
  }, [questions, categories]);

  const changeHandler = (e: any) => {
    setDescription(e.target.value);
  };

  const updateChangeHandler = (e: any) => {
    setUpdateDescription(e.target.value);
  };

  // Send new question to DB
  const onCreateQuestion = async (questionData: CreateQuestionData) => {
    try {
      const res = await fetch(host, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user_context.actions.authHeader()!,
        },
        body: JSON.stringify(questionData),
      });

      if (res.status === 200) {
        const { data: newQuestion } = (await res.json()) as Response<Question>;
        setQuestions([...questions, newQuestion]);
        handleClose();
      } else {
        //TODO Errormeldung!
      }
    } catch (e) {
      console.error(e);
      handleClose();
    }
  };

  const onUpdateQuestion = async (questionData: Question) => {
    if (questionData === null) return;
    try {
      const res = await fetch(`${host}/${questionData.question_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: user_context.actions.authHeader()!,
        },
        body: JSON.stringify(questionData),
      });

      if (res.status === 200) {
        const { data: newQuestion } = (await res.json()) as Response<Question>;

        questions.forEach((question) => {
          if (question.question_id === newQuestion.question_id) {
            question.description = newQuestion.description;
            question.difficult_id = newQuestion.difficult_id;
            question.category_id = newQuestion.category_id;
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

  const onDeleteQuestion = async (question_id: Number) => {
    if (question_id === null) return;
    try {
      const res = await fetch(`${host}/${question_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: user_context.actions.authHeader()!,
        },
        body: JSON.stringify(question_id),
      });

      if (res.status === 200) {
        const { data: Question } = (await res.json()) as Response<Question>;

        setQuestions(
          questions.filter(
            (question) => question.question_id !== Question.question_id
          )
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

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-end">
        <Button className="createButton rounded-top" variant="info" onClick={handleShow} size="lg" block>
          Neue Frage erstellen
        </Button>
      </Row>
      <Row className="justify-content-md-center">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Frage ID</th>
              <th>Frage</th>
              <th>Kategorie ID</th>
              <th>Schwierigkeits ID</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => {
              return (
                <tr key={Number(question.question_id)}>
                  <td>{Number(question.question_id)}</td>
                  <td>{String(question.description)}</td>
                  <td>{Number(question.category_id)}</td>
                  <td>{Number(question.difficult_id)}</td>
                  <td>
                    <Link to={`/antworten/${question.question_id}`}>
                      <Button className="listButton" variant="info">
                        <BsList />
                      </Button>
                    </Link>
                    &nbsp;
                    <Button
                      className="editButton"
                      variant="white"
                      onClick={() => handleShow2(question)}
                    >
                      <BsPencil />
                    </Button>
                    &nbsp;
                    <Button
                      className="deleteButton"
                      variant="white"
                      onClick={() => handleShow1(question)}
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
            <Modal.Title>Frage erstellen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Frage Textfeld</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Kategorie</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  name="categories"
                  value={selectState}
                  onChange={(e: any) => handleSelect(e.target)}
                >
                  {categories.map((category) => {
                    return (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.category_name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <div key={'create-"radio'} className="mb-12">
                <Form.Label>Schwierigkeitsstufe</Form.Label>
                <br />
                <Form.Check
                  inline
                  label="Einfach"
                  name="createRadio"
                  onChange={() => handleRadio(1)}
                  checked={radioState === 1 ? true : false}
                  type="radio"
                />
                <Form.Check
                  inline
                  label="Mittel"
                  name="createRadio"
                  onChange={() => handleRadio(2)}
                  checked={radioState === 2 ? true : false}
                  type="radio"
                />
                <Form.Check
                  inline
                  label="Schwer"
                  name="createRadio"
                  onChange={() => handleRadio(3)}
                  checked={radioState === 3 ? true : false}
                  type="radio"
                />
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Schließen
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                onCreateQuestion({
                  description: description,
                  category_id: selectState,
                  difficult_id: radioState,
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
                  Möchten Sie wirklich die ausgewählte Frage Löschen?
                </Form.Label>
                <p>
                  <strong>{String(row?.description)}</strong>
                </p>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Schließen
            </Button>
            <Button
              variant="danger"
              onClick={() => onDeleteQuestion(row.question_id)}
            >
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
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Kategorie</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  name="categories"
                  value={updateSelectState}
                  onChange={(e: any) => handleSelect(e.target)}
                >
                  {categories.map((category) => {
                    return (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.category_name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <div key={'update-"radio'} className="mb-12">
                <Form.Label>Schwierigkeitsstufe</Form.Label>
                <br />
                <Form.Check
                  inline
                  label="Einfach"
                  name="updateRadio"
                  value="1"
                  onChange={() => handleRadio(1)}
                  checked={Number(updateRadioState) === 1 ? true : false}
                  type="radio"
                />
                <Form.Check
                  inline
                  label="Mittel"
                  name="updateRadio"
                  value="2"
                  onChange={() => handleRadio(2)}
                  checked={Number(updateRadioState) === 2 ? true : false}
                  type="radio"
                />
                <Form.Check
                  inline
                  label="Schwer"
                  name="updateRadio"
                  value="3"
                  onChange={() => handleRadio(3)}
                  checked={Number(updateRadioState) === 3 ? true : false}
                  type="radio"
                />
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Schließen
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                onUpdateQuestion({
                  question_id: updateID,
                  description: updateDescription,
                  category_id: updateSelectState,
                  difficult_id: updateRadioState,
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
