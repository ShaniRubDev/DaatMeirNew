import { useState, ChangeEvent, FormEvent } from "react";
import { Button, Form } from 'react-bootstrap';
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
    
    await submitBasket({
      ...basketData,
      image: imageUrl,
      sum: typeof basketData.sum === 'number' ? basketData.sum : 0,
      freeAmount: typeof basketData.freeAmount === 'number' ? basketData.freeAmount : 0
    });
  };
return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded">
      <Form.Control type="text" name="title" placeholder="Title" value={basketData.title} onChange={handleChange} required />
      <Form.Control type="text" name="description" placeholder="Description" value={basketData.description} onChange={handleChange} required />
      <Form.Control type="number" name="sum" placeholder="Sum" value={basketData.sum} onChange={handleChange} required />
      <Form.Control type="number" name="freeAmount" placeholder="Free Amount" value={basketData.freeAmount} onChange={handleChange} required />
      <Form.Control type="file" onChange={handleImageChange} accept="image/*" />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AddBasket;
