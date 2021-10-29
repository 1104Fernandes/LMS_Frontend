import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  ToggleButton,
} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import { Answer } from "../models/Answers";

type TParams = { id: string };
type Test = {
  question_id: number;
  description: string;
  category_id: number;
  difficult_id: number;
  right_answer: number | null;
  test_id: number;
  answers: [];
};

type Post = {
  user_id: number | undefined;
  test_id: number;
  answers: Answer[];
};

export const EntryTestPage: React.FC = () => {
  const context = useContext(userContext);
  const history = useHistory();
  const [fire, setFire] = useState(false);
  const [tests, setTests] = useState<Test[]>([]);
  const { id } = useParams<TParams>();
  const [radio, setRadio] = useState<any>([{}]);
  const [postRadio, setPostRadio] = useState<any>([...radio]);
  const [test_id, setTestID] = useState(0);
  const [post_values] = useState([...radio]);

  const changeHandler = (
    e: any,
    indexQuestion: number,
    question_id: number
  ) => {
    const values = [...radio];

    values[indexQuestion] = Number(e.value);
    post_values[indexQuestion] = [question_id, Number(e.value)];

    setPostRadio(post_values);
    setRadio(values);
    setTestID(tests[0].test_id);
  };

  const submitHandler = () => {
    const user_id = context.user?.user_id;

    const submitObject: Post = {
      user_id: user_id,
      test_id: test_id,
      answers: postRadio,
    };
   
    axios
      .post(
        "http://localhost:4000/api/Test/finishTest",
        {
          submitObject,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: context.actions.authHeader(),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          history.push(`/lernmethode/${id}`);
          console.log(response.data.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          //console.error
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  useEffect(() => {
    if (fire === false) {
      axios
        .post(
          "http://localhost:4000/api/Test/createEntryTest",
          {
            user_id: context.user?.user_id,
            category_id: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: context.actions.authHeader(),
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            if (response.data.status === "done") {
              history.push("/lernmethode");
            }
            console.log(response.data.data);
            setTests(response.data.data);
            setFire(true);
          }
        })
        .catch((error) => {
          if (error.response) {
            //console.error
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
  }, []);

  return (
    <Container>
      <h1 className="text-center m-3">Eingangstest</h1>
      {tests.length > 0 ? (
        tests.map((test, index) => {
          return (
            <Row
              className="justify-content-md-center border shadow-sm rounded-lg m-2"
              key={index}
            >
              <Col className="" key={index}>
                <h4 className="text-center m-2" key={index}>
                  {test.description}
                </h4>
                <Row className="justify-content-md-center">
                  <ButtonGroup className="m-2" toggle>
                    {test.answers.map((answer: any, idx) => {
                      return (
                        <ToggleButton
                          key={idx}
                          type="radio"
                          variant="outline-secondary"
                          name={"radio" + idx}
                          value={answer.answer_id}
                          checked={radio[index] === answer.answer_id}
                          onChange={(e: any) =>
                            changeHandler(
                              e.currentTarget,
                              index,
                              test.question_id
                            )
                          }
                        >
                          &nbsp;{answer.description}
                        </ToggleButton>
                      );
                    })}
                  </ButtonGroup>
                </Row>
              </Col>
            </Row>
          );
        })
      ) : (
        <h1>Loading...</h1>
      )}
      <Row className="justify-content-md-end">
        <Button
          className="mr-4 m-2"
          variant="primary"
          onClick={(e: any) => submitHandler()}
        >
          Eingaben bestätigen
        </Button>
      </Row>
    </Container>
  );
};
