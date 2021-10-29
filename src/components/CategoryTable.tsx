import React, { useContext, useState } from "react";
import { Category, CreateCategoryData } from "../models/Category";
import { categoryContext } from "../contexts/CategoryContext";
import { Button, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { BsPencil, BsTrashFill } from "react-icons/bs";
import { Response } from "../contexts/ResponseContext";
import { userContext } from "../contexts/UserContext";

const CategoryTable: React.FC = () => {
  const host = "http://localhost:4000/api/category";
  const user_context = useContext(userContext);
  const context = useContext(categoryContext);
  const [categories, setCategories] = useState<Category[]>(context.categories);
  const [row, setRow] = useState<Category>({
    category_id: 0,
    category_name: "",
  });

  const [show, setShowModal] = useState(false);
  const [show1, setShowModal1] = useState(false);
  const [show2, setShowModal2] = useState(false);

  const changeHandler = (e: any) => {
    setRow((prevState) => ({ ...prevState, category_name: e.target.value }));
  };
  
  const handleShow = () => setShowModal(true);

  const handleShow1 = (category: Category) => {
    setShowModal1(true);
    setRow(category);
  };

  const handleShow2 = (category: Category) => {
    setShowModal2(true);
    setRow(category);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowModal1(false);
    setShowModal2(false);
    setRow({
      category_id: 0,
      category_name: "",
    });
  };

  const createCategory = async (category_name: CreateCategoryData) => {
    try {
      const res = await fetch(host, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user_context.actions.authHeader()!,
        },
        body: JSON.stringify(category_name),
      });

      if (res.status === 200) {
        const { data: newCategory } = (await res.json()) as Response<Category>;
        setCategories([...categories, newCategory]);
        handleClose();
      } else {
        //TODO Errormeldung!
      }
    } catch (e) {
      console.error(e);
      handleClose();
    }
  };

  const updateCategory = async (categoryData: Category) => {
    if (categoryData === null) return;
    try {
      const res = await fetch(`${host}/${categoryData.category_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: user_context.actions.authHeader()!,
        },
        body: JSON.stringify(categoryData),
      });

      if (res.status === 200) {
        const { data: newCategory } = (await res.json()) as Response<Category>;

        categories.forEach((category) => {
          if (category.category_id === newCategory.category_id) {
            category.category_name = newCategory.category_name;
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

  const deleteCategory = async (categoryData: Category) => {
    if (categoryData === null) return;
    try {
      const res = await fetch(`${host}/${categoryData.category_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: user_context.actions.authHeader()!,
        },
        body: JSON.stringify(categoryData),
      });

      if (res.status === 200) {
        const { data: Category } = (await res.json()) as Response<Category>;

        setCategories(
          categories.filter(
            (category) => category.category_id !== Category.category_id
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
        <Button
          className="createButton rounded-top"
          variant="info"
          onClick={handleShow}
          size="lg"
          block
        >
          Neue Kategorie erstellen
        </Button>
      </Row>
      <Row className="justify-content-md-center">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Kategorie ID</th>
              <th>Kategorie Name</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              return (
                <tr key={String(category.category_id)}>
                  <td>{String(category.category_id)}</td>
                  <td>{String(category.category_name)}</td>
                  <td>
                    <Button
                      className="editButton"
                      variant="white"
                      onClick={() => handleShow2(category)}
                    >
                      <BsPencil />
                    </Button>
                    &nbsp;
                    <Button
                      className="deleteButton"
                      variant="white"
                      onClick={() => handleShow1(category)}
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
            <Modal.Title>Kategorie erstellen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Kategorie Textfeld</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={row.category_name}
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
                createCategory({
                  category_name: row.category_name,
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
                  Möchten Sie wirklich die ausgewählte Kategorie Löschen?
                </Form.Label>
                <p>
                  <strong>{String(row.category_name)}</strong>
                </p>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Schließen
            </Button>
            <Button variant="danger" onClick={() => deleteCategory(row)}>
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
                  value={row.category_name}
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
                updateCategory({
                  category_name: row.category_name,
                  category_id: row.category_id,
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

export default CategoryTable;
