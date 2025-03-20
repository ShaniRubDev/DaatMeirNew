import { useState, ChangeEvent, FormEvent } from "react";
import { Button, Form, Container, Card, Toast, ToastContainer } from "react-bootstrap";
import { uploadImage, submitBasket } from "../../services/basketService";

interface BasketData {
  title: string;
  description: string;
  sum: number | "";
  freeAmount: number | "";
}

const AddBasket: React.FC = () => {
  const [basketData, setBasketData] = useState<BasketData>({
    title: "",
    description: "",
    sum: "",
    freeAmount: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVariant, setToastVariant] = useState<string>("success");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBasketData({
      ...basketData,
      [name]: name === "sum" || name === "freeAmount" ? Number(value) || "" : value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Basket Data:", basketData);
    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImage(image);
    }
    console.log("Image URL:", imageUrl);

    try {
      await submitBasket({
        ...basketData,
        image: imageUrl,
        sum: typeof basketData.sum === "number" ? basketData.sum : 0,
        freeAmount: typeof basketData.freeAmount === "number" ? basketData.freeAmount : 0,
      });
      setToastMessage(":) הסל נוסף בהצלחה");
      setToastVariant("success");
    } catch (error) {
      setToastMessage("אירעה שגיאה בעת הוספת הסל.");
      setToastVariant("danger");
    } finally {
      setShowToast(true);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: "400px" }}>
        <Card.Title className="text-center mb-3">הוספת סל</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>כותרת</Form.Label>
            <Form.Control type="text" name="title" value={basketData.title} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>תיאור</Form.Label>
            <Form.Control type="text" name="description" value={basketData.description} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>סכום</Form.Label>
            <Form.Control type="number" name="sum" value={basketData.sum} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>כמות חופשית</Form.Label>
            <Form.Control type="number" name="freeAmount" value={basketData.freeAmount} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>העלה תמונה</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} accept="image/*" />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            <i className="bi bi-cart-plus"></i> הוסף סל
          </Button>
        </Form>
      </Card>

      {/* Toast for success or error message */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          style={{
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            maxWidth: "350px",
            zIndex: 1050,
          }}
        >
          <Toast.Body
            className={`d-flex justify-content-between align-items-center text-white p-3 ${
              toastVariant === "success" ? "bg-success" : "bg-danger"
            }`}
            style={{
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>{toastMessage}</span>
            <i
              className={`bi bi-${toastVariant === "success" ? "check-circle" : "x-circle"}`}
              style={{ fontSize: "20px", marginLeft: "10px" }}
            />
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default AddBasket;
