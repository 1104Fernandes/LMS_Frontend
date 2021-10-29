import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import { LoginOptions } from "../models/User";

export const Signin: React.FC = () => { 
  const context = useContext(userContext);
  const history = useHistory();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error_msg, setErrorMsg] = useState("");
  const [error_msg_name, setErrorMsgName] = useState("");
  const [error_msg_pw, setErrorMsgPw] = useState("");
  const [isLoading, setLoading] = useState(false);

  const vusername = (value: string) => {
    if (value.length < 3 || value.length > 20) {
      setErrorMsgName("The username must be between 3 and 20 characters.");
      return false;
    } else {
      setErrorMsgName("");
      return true;
    }
  };

  const vpassword = (value: string) => {
    if (value.length < 6 || value.length > 40) {
      setErrorMsgPw("The password must be between 6 and 40 characters.");
      return false;
    } else {
      setErrorMsgPw("");
      return true;
    }
  };

  const clearStates = () => {
    setNickname("");
    setPassword("");
    setErrorMsgName("");
    setErrorMsgPw("");
    setErrorMsg("");
    setMsg("");
  };

  const handleSignIn = (event: any, loginOptions: LoginOptions) => {
    setLoading(true);
    if (vusername(loginOptions.nickname) && vpassword(loginOptions.password)) {
      context.actions
        .login(loginOptions)
        .then((response: any) => {
          setLoading(false);
          if (response === null) {
            return;
          }
          if (response.status === 200) {
            clearStates();
            history.push("/");
          }
          if (
            response.data.status === "failed" &&
            response.data.success === undefined
          ) {
            setErrorMsgName(response.data.validation_error.nickname);
            setErrorMsgPw(response.data.validation_error.password);
          } else if (
            response.data.status === "failed" &&
            response.data.success === false
          ) {
            setErrorMsg(response.data.message);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md="12" className="bg-muster-login"></Col>
        <Col md="6" className="loginBox">
          <Form>
            <h1>Einloggen</h1>
            <Form.Group>
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="name"
                name="name"                
                placeholder="Nicknamen eingeben"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <span className="text-danger m-2">{msg}</span>
              <span className="text-danger m-2">{error_msg_name}</span>
            </Form.Group>
            <Form.Group>
              <Form.Label>Passwort</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Passwort eingeben"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="text-danger m-2">{error_msg_pw}</span>
            </Form.Group>
            <p className="text-danger m-2">{error_msg}</p>
            <Button
              className="mb-4 mt-4"
              variant="info"
              size="lg"
              block
              onClick={(e: any) =>
                handleSignIn(e, {
                  nickname: nickname,
                  password: password,
                })
              }
            >
              Einloggen
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm ml-5"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                <span></span>
              )}
            </Button>
            <Link to="/registrieren" className="text-white text-center">
              Noch kein Account? Registriere dich hier
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
