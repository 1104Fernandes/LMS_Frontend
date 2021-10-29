import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { categoryContext } from "../contexts/CategoryContext";
import { Category } from "../models/Category";

export const SelectionPage: React.FC = () => {
  const categoryContent = useContext(categoryContext);
  const [categories, setCategory] = useState<Category[]>(
    categoryContent.categories
  );
  const [selectState, setSelectState] = useState(undefined);
  const handleSelect = (target: any) => {
    setSelectState(target.value);
   
    console.log(target.value);
  };

  if (
    window.location.toString() !== "http://localhost:3000/fragender" ||
    window.location.toString() !== "http://localhost:3000/befragter"
  ) {
    document.querySelector("body > div.WatsonAssistantChatHost")?.remove();
  }
  return (
    <>
      <Container fluid>
        <Row className="justify-content-md-center mt-5 mb-5">
          <Col md="12">
            <h3 className="text-center">
              Bitte wählen Sie eine Kategorie zum Testen Ihrer
              Wissensstandsstufe aus und bestätigen sie diese mit einem Klick
              auf den Button "Thema auswählen"
            </h3>
          </Col>
          <Col className="testForm" md="6">
            <Form>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Kategorie</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  name="categories"
                  value={selectState}
                  defaultValue="select"
                  onChange={(e: any) => handleSelect(e.target)}
                >
                  <option value="select" disabled>
                    Wählen Sie hier Ihre Kategorie aus
                  </option>
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
              <Link to={`/selbsttest/${selectState}`} className="nonlink">
                <Button
                  className="mb-2 mt-2"
                  variant="info"
                  size="lg"
                  block
                  type="submit"
                >
                  Thema auswählen
                </Button>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
