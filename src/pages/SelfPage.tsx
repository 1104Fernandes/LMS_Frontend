import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import RangeSlider from "react-bootstrap-range-slider";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import { categoryContext } from "../contexts/CategoryContext";
import { userContext } from "../contexts/UserContext";
import { Category } from "../models/Category";
import "../styles.css";
import axios from "axios";

type TParams = { id: string };

export type Self = {
  user_id: number;
  category_id: number;
  value: number;
};

export const SelfPage = ({ match }: RouteComponentProps<TParams>) => {
  const user_context = useContext(userContext);
  const category_context = useContext(categoryContext);
  const [categories, setCategory] = useState<Category[]>(
    category_context.categories
  );
  const [category] = useState(Number(match.params.id));
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [Slider, setSlider] = useState(0);
  const [youtubeURL, setYoutubeURL] = useState("");

  useEffect(() => {
    if (categories !== null) {
      setCategory((categories: Category[]) =>
        categories.filter(
          (category) => Number(category.category_id) === Number(match.params.id)
        )
      );
    }
    switch(category) {
      case 1:
        setYoutubeURL("KSMfBDhBNiI");
        break;
      case 2:
        setYoutubeURL("NV_sXRw5Nyk");
        break;
      case 39:
        setYoutubeURL("zNrMIMlvcjg");
        break;
      case 40:
        setYoutubeURL("uCtKcleMilk");
        break;
      case 41:
        setYoutubeURL("Dcg5CnmSSWA");
        break;
      case 42:
        setYoutubeURL("1Ct0q975B8A");
        break;
      case 43:
        setYoutubeURL("e58DIlqZIMA");
        break;
      case 44:
        setYoutubeURL("x3G1B_JAkIw");
        break;
      case 51:
        setYoutubeURL("KMNx1UfymB8");
        break;
      case 67:
        setYoutubeURL("gi9SzUbP_vk");
        break;
      default:
        setYoutubeURL("");
        break;
    }
  }, [match.params.id]);

  const onSubmitHandler = (event: any, selfData: Self) => {
    event.preventDefault();
  
    setLoading(true);
    axios
      .post("http://localhost:4000/api/self", selfData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: user_context.actions.authHeader(),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          history.push("/eingangstest/" + category);
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="7">
          <Form>
            <Form.Group>
              <h2 className="text-center m-4">
                Wissensstand (Selbsteinschätzung)
              </h2>
              <p className="rangeLabelText">
                Bitte geben Sie eine Selbsteinschätzung Ihres Wissensstandes ab
              </p>
              <p className="text-center m-0">{categories[0].category_name}</p>
              <Row className="justify-content-start">
                <Col md="3">
                  <p className="rangeLabelText">kein Vorwissen [0]</p>
                </Col>
                <Col md="6">
                  <RangeSlider
                    tooltipPlacement="top"
                    min={0}
                    max={5}
                    value={Slider}
                    variant="info"
                    size="lg"
                    className="RangeSlider"
                    onChange={(e) => setSlider(Number(e.target.value))}
                  />
                </Col>
                <Col md="3">
                  <p className="rangeLabelText">Experte [5]</p>
                </Col>
              </Row>
            </Form.Group>
            <Button
              className="mb-2 mt-2 nonlink"
              variant="info"
              size="lg"
              block
              onClick={(e: any) =>
                onSubmitHandler(e, {
                  user_id: user_context.user?.user_id!,
                  category_id: category,
                  value: Slider,
                })
              }
            >
              Selbsteinschätzung übermitteln
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
          </Form>
          <ReactPlayer
            height=""
            width=""
            className="borderPlayer"
            controls={true}
            url={`https://youtu.be/${youtubeURL}`}
          />
        </Col>
      </Row>
    </Container>
  );
};
