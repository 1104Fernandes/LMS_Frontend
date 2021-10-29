import Card from "react-bootstrap/Card";

export type CardElementProps = {
  width: string;
  background: string;
  bordersize: string;
  border_radius: string;
  title_color: string;
  text_color: string;
  src: string;
  title: string;
  text: string;
};

export const CardElement: React.FC<CardElementProps> = ({
  width = "30",
  background,
  bordersize,
  border_radius,
  title_color,
  text_color,
  src,
  title,
  text,
}) => {
  return (
    <Card
      style={{
        width: `${width}rem`,
        background: `${background}`,
        border: `${bordersize}px solid rgba(0,0,0,.125)`,
        borderRadius: `${border_radius}`,
      }}
    >
      {src && <Card.Img style={{filter: 'sepia(40%)'}} variant="top" src={src} alt="Card Image"/>}
      <Card.Body>
        <Card.Title className={`text-center text-${title_color}`}>{title}</Card.Title>
        <Card.Text className={`text-center text-${text_color}`}>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};
