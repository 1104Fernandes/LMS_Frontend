import React, { useContext, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
  ToggleButton,
} from "react-bootstrap";
import "../register.css";
import { useHistory } from "react-router-dom";
import { CreateUserData } from "../models/User";
import { userContext } from "../contexts/UserContext";
import { categoryContext } from "../contexts/CategoryContext";
import { Category } from "../models/Category";
import { professionContext } from "../contexts/ProfessionContext";
import { jobContext } from "../contexts/JobRoleContext";
import { Job } from "../models/Job";
import Modal from 'react-modal';
import { PrivacyPolicyText } from "../components/PrivacyPolicyText";

export const Signup: React.FC = () => {
  const context = useContext(userContext);
  const jobContent = useContext(jobContext);
  const categoryContent = useContext(categoryContext);
  const professionContent = useContext(professionContext);
  const history = useHistory();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [e_mail, setEmail] = useState("");
  const [ageState, setAgeState] = useState("");
  const [msg, setMsg] = useState("");
  const [errorMsgName, setErrorMsgName] = useState("");
  const [errorMsgPw, setErrorMsgPw] = useState("");
  const [errorMsgConfirmPw, setErrorMsgConfirmPw] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [genderValue, setRadioValue] = useState(0);
  const [ageError, setAgeError] = useState("");
  const [professionState, setProfessionState] = useState(0);
  const [job_state, setJobState] = useState(0);
  const [notCompleteMsg, setNotCompleteMsg] = useState("");
  const [categories, setCategory] = useState<Category[]>(
    categoryContent.categories
  );
  const [jobs, setJobs] = useState<Job[]>(jobContent.jobs);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [errorMsgPrivacy, setErrorMsgPrivacy] = useState("");
  const [privacyModalIsOpen, setPrivacyModalIsOpen] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [errorMsgSecret, setErrorMsgSecret] = useState("");



  type gender = {
    name: string;
    value: number;
  };
  const genderRadios: Array<gender> = [
    { name: "Weiblich", value: 1 },
    { name: "Männlich", value: 2 },
    { name: "Divers", value: 3 },
  ];

  const checkIfComplete = () => {
    if (
      nickname === "" ||
      password === "" ||
      confirmPassword === "" ||
      ageState === "" ||
      genderValue === 0 ||
      professionState === 0 ||
      job_state === 0 ||
      secretKey === ""
    ) {
      setNotCompleteMsg("Bitte füllen Sie alle Pflichtfelder aus!");
      return false;
    } else {
      setNotCompleteMsg("");
      return true;
    }
  }

  const checkSecretKey = (value: string) => {
    if (value !== "B[=jDw57") {
      setErrorMsgSecret("Geheimschlüssel ist nicht korrekt!");
      return false;
    } else {
      setErrorMsgSecret("");
      return true;
    }
  }

  const vusername = (value: string) => {
    if (value.length < 3 || value.length > 20) {
      setErrorMsgName("Der Nickname muss 3 bis 20 Zeichen lang sein.");
      return false;
    } else {
      setErrorMsgName("");
      return true;
    }
  };

  const checkPassword = (value: string) => {
    var requiredComponents =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/;

    if (!value.match(requiredComponents)) {
        setErrorMsgPw("Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Ziffer und ein Sonderzeichen enthalten.");
        return false;
    } else {
      setErrorMsgPw("");
      return true;
    }
  };

  const checkConfirmPassword = (value: string, confirmPassword: string) => {
    if (value !== confirmPassword) {
      setErrorMsgConfirmPw("Die Passwörter stimmen nicht überein!");
      return false;
    } else {
      setErrorMsgConfirmPw("");
      return true;
    }
  };

  const handleAge = (target: any) => {
    if (target.value.length > 2) {
      target.value = target.value.slice(0, 2);
    }
    setAgeState(target.value);
  };

  const clearStates = () => {
    setNickname("");
    setPassword("");
    setEmail("");
    setAgeState("");
    setErrorMsgName("");
    setErrorMsgPw("");
    setMsg("");
    setRadioValue(0);
    setAgeError("");
    setPrivacyPolicy(false);
    setConfirmPassword("");
  };

  const onSubmitHandler = (event: any, userData: CreateUserData) => {
    event.preventDefault();

    setLoading(true);
    if (checkIfComplete()) {
      if (
        vusername(userData.nickname) &&
        checkPassword(userData.password) &&
        checkConfirmPassword(password, confirmPassword) &&
        checkSecretKey(secretKey)
      ) {
        context.actions.register(userData).then((response: any) => {
          setLoading(false);
          if (response === null) {
            return;
          }
          if (response.status === 200) {
            context.actions.login({ nickname, password });
            clearStates();
            history.push("/");
          }
          if (response.data.status === "failed") {
            setMsg(response.data.message);
          }
        });
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
        setErrorMsgPrivacy("Sie müssen zum Registrieren den Datenschutzbetimmungen zustimmen.");
      };
  };

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md="12" className="bg-muster"></Col>
        <Col md="6" className="registerBox">
          <Form>
            <h1 className="text-center">Account erstellen</h1>
            <Form.Group>
              <Form.Label>Nickname (Pseudonym)*</Form.Label>
              <Form.Control
                type="name"
                name="name"
                placeholder="Nickname eingeben"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <Form.Text className="text-danger">{errorMsgName}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email Adresse</Form.Label>
                <Form.Control
                  type="email"
                  name="e_mail"
                  placeholder="Email eingeben (Optional)"
                  value={e_mail}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Label>Passwort*</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Passwort eingeben"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text className="text-danger">{errorMsgPw}</Form.Text>
              <Form.Label>Passwort bestätigen*</Form.Label>
              <Form.Control
                type="password"
                name="checkPassword"
                placeholder="Passwort bestätigen"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Form.Text className="text-danger">{errorMsgConfirmPw}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Alter*</Form.Label>
              <Form.Control
                type="number"
                name="alter"
                placeholder="Alter eingeben"
                min="15"
                max="99"
                value={ageState}
                onChange={(e: any) => handleAge(e.currentTarget)}
              />
              <Form.Text className="text-danger">{ageError}</Form.Text>
            </Form.Group>
            <div className="lableform">
              <p className="text-center m-2">Geschlecht*</p>
              <ButtonGroup className="genderRadioBox" toggle>
                {genderRadios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    type="radio"
                    name="radio"
                    className="genderRadios"
                    value={radio.value}
                    checked={genderValue === radio.value}
                    onChange={(e) =>
                      setRadioValue(Number(e.currentTarget.value))
                    }
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
              <Form.Group controlId="BerufsgruppeForm.SelectCustom">
                <Form.Label className="m-3">Berufsgruppe*</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  name="categories"
                  key={professionState}
                  value={professionState}
                  onChange={(e: any) => setProfessionState(e.target.value)}
                >
                  <option value="0" disabled>
                    Wählen Sie Ihre Berufsgruppe aus
                  </option>
                  {professionContent.professions.map((profession) => {
                    return (
                      <option
                        key={profession.profession_id}
                        value={profession.profession_id}
                      >
                        {profession.profession}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="BerufsrolleForm.SelectCustom">
                <Form.Label className="m-3">Berufsrolle*</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  name="jobs"
                  value={job_state}
                  onChange={(e: any) => setJobState(e.target.value)}
                >
                  <option value="0" disabled>
                    Wählen Sie Ihre Berufsrolle aus
                  </option>
                  {jobContent.jobs.map((job) => {
                    return (
                      <option key={job.job_id} value={job.job_id}>
                        {job.job_name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                  <input type="checkbox" onChange={(e)=>setPrivacyPolicy(e.target.checked)}/>
                  <span id="dataprivacy"> Ich habe die Bedingungen zum <Button
                    className="text-primary" 
                    onClick={()=>setPrivacyModalIsOpen(true)}
                    variant="light"
                    size="sm"
                    >Datenschutz</Button> dieser Website gelesen und stimme denen zu.</span>
                  <Form.Text className="text-danger">{errorMsgPrivacy}</Form.Text>
              </Form.Group>
              <Form.Group>
              <Modal 
              isOpen={privacyModalIsOpen} 
              onRequestClose={() => setPrivacyModalIsOpen(false)}
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
              <PrivacyPolicyText></PrivacyPolicyText>
              <Button variant="primary" onClick={()=>setPrivacyModalIsOpen(false)}>
                        Schließen
              </Button>
            </Modal>
                <Form.Label>Geheimschlüssel</Form.Label>
                <Form.Control
                  type="name"
                  name="name"
                  placeholder="Geheimschlüssel eingeben"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                />
                <Form.Text className="text-danger">{errorMsgSecret}</Form.Text>
              </Form.Group>
            </div>
            <p className="requiredFields">*Pflichtfelder</p>
            <Form.Text className="text-danger font-weight-bold">{notCompleteMsg}</Form.Text>
            <p className="text-white m-2">{msg}</p>
            <Button
              className="mb-2 mt-2"
              variant="info"
              size="lg"
              block
              onClick={(e: any) =>
                onSubmitHandler(e, {
                  nickname: nickname,
                  password: password,
                  e_mail: e_mail,
                  age: Number(ageState),
                  gender_id: genderValue,
                  profession_id: professionState,
                  job_id: job_state,
                })
              }
            >
              Registrieren
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
            {/* <Link to="/login" className="text-white text-center">
              Ich bin bereits Registriert
            </Link> */}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
