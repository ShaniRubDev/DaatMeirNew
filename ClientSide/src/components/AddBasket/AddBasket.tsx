
// export default AddBasket;
import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { submitBasket } from "../../services/basketService";
import { Messages } from 'primereact/messages';

export default function AddBasketWithImageUpload() {
    const toast = useRef<Toast>(null);
    const [prevSum, setPrevSum] = useState(0); // משתנה לשמירת הסכום הקודם
    const msgs = useRef<Messages>(null);  // עבור הודעות
    const [basketData, setBasketData] = useState({
        title: "",
        description: "",
        sum: 0,
        freeAmount: false,
    });
    const [image, setImage] = useState<File | null>(null);


    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value, type, checked } = e.target;
    //     if (type === 'checkbox') {
    //         setBasketData({
    //             ...basketData,
    //             [name]: checked,
    //         });
    //     } else {
    //         setBasketData({
    //             ...basketData,
    //             [name]: name === "sum" || name === "freeAmount" ? Number(value) || "" : value,
    //             sum: checked ? 0 : basketData.sum, // מאפס את sum אם freeAmount נבחר

    //         });
    //     }
    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
    
        setBasketData((prev) => {
            if (name === "freeAmount") {
                return {
                    ...prev,
                    freeAmount: checked,
                    sum: checked ? 0 : prevSum, // אם freeAmount מסומן - sum יהיה 0, אחרת הוא יחזור לערך הקודם
                };
            } else if (name === "sum") {
                const numericValue = Number(value) || 0;
                setPrevSum(numericValue); // שמור את הערך של sum לפני שינויים
                return {
                    ...prev,
                    sum: numericValue,
                };
            } else {
                return {
                    ...prev,
                    [name]: value,
                };
            }
        });
    };

    const onUpload = () => {
        toast.current?.show({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded',
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        // הוספת פרטי סל לתוך FormData
        formData.append("title", basketData.title);
        formData.append("description", basketData.description);
        formData.append("sum", String(basketData.sum));
        formData.append("freeAmount", basketData.freeAmount ? '1' : '0');

        // אם יש תמונה, נוסיף אותה ל-FormData
        if (image) {
            formData.append("image", image);
        }

        // שליחה לשרת
        // await submitBasket(formData);
        const response = await submitBasket(formData);
        if (response.ok) {
          msgs.current?.clear();  // מנקה הודעות ישנות
          msgs.current?.show([
              { severity: 'success', summary: 'Success', detail: 'Basket data submitted successfully!' },
          ]);
      } else {
          msgs.current?.clear();
          msgs.current?.show([
              { severity: 'error', summary: 'Error', detail: 'Something went wrong. Please try again.' },
          ]);
      }

    };

    return (
      <div
      className="d-flex justify-content-center align-items-center"
      style={{
          height: '100vh',
          backgroundColor: '#f4f7fc',
          padding: '20px',
      }}
  >

      <div className="card flex justify-content-center p-4 shadow-lg" style={{ width: '100%', maxWidth: '600px' }}>
      <Messages ref={msgs} />  {/* כאן ממוקמת הודעת ההצלחה או השגיאה */}
          <Toast ref={toast}></Toast>
          <form onSubmit={handleSubmit}>
              <h3 className="text-center mb-4">Add New Basket</h3>
              <Row className="mb-3">
                  <Col sm={12}>
                      <Form.Group controlId="title">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                              type="text"
                              name="title"
                              placeholder="Enter title"
                              value={basketData.title}
                              onChange={handleChange}
                              required
                              className="rounded"
                          />
                      </Form.Group>
                  </Col>
              </Row>

              <Row className="mb-3">
                  <Col sm={12}>
                      <Form.Group controlId="description">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                              as="textarea"
                              name="description"
                              placeholder="Enter description"
                              value={basketData.description}
                              onChange={handleChange}
                              required
                              rows={3}
                              className="rounded"
                          />
                      </Form.Group>
                  </Col>
              </Row>

              <Row className="mb-3">
                  <Col sm={12} md={6}>
                      <Form.Group controlId="sum">
                          <Form.Label>Sum</Form.Label>
                          <Form.Control
                              type="number"
                              name="sum"
                              placeholder="Enter sum"
                              value={basketData.sum}
                              onChange={handleChange}
                              required={!basketData.sum}  // אם freeAmount נבחר, השדה sum לא יהיה חובה
                              disabled={basketData.freeAmount}
                              className="rounded"
                          />
                      </Form.Group>
                  </Col>
                  <Col sm={12} md={6}>
                      <Form.Group controlId="freeAmount">
                          <Form.Check
                              type="checkbox"
                              label="Free Amount"
                              name="freeAmount"
                              checked={basketData.freeAmount}
                              onChange={handleChange}
                              className="mt-2"
                            //   required={!basketData.freeAmount}  // אם freeAmount נבחר, השדה sum לא יהיה חובה
                            required={!basketData.sum && !basketData.freeAmount}  // לפחות אחד מהם חייב להיות מלא

                          />
                      </Form.Group>
                  </Col>
              </Row>

              <Row className="mb-3">
                  <Col sm={12}>
                      <Form.Group controlId="imageUpload">
                          <Form.Label>Upload Image</Form.Label>
                          <FileUpload
                              mode="basic"
                              name="image"
                              url="/api/upload"
                              accept="image/*"
                              maxFileSize={1000000}
                              onUpload={onUpload}
                              chooseLabel="Select Image"
                              uploadLabel="Upload"
                              cancelLabel="Cancel"
                              onSelect={(e) => setImage(e.files[0])}
                              className="w-100"
                          />
                      </Form.Group>
                  </Col>
              </Row>

              <Button type="submit" className="w-100 btn-primary mt-4">Submit</Button>
          </form>
      </div>
  </div>
    );
}
