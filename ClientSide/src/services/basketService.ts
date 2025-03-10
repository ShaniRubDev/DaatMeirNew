export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:5000/basekt/upload", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to upload image");
    }

    const data: { imageUrl: string } = await response.json();
    return data.imageUrl;
};
interface BasketData {
    title: string;
    description: string;
    sum: number;
    freeAmount: number;
    image?: string;
}

export const submitBasket = async (basket: BasketData): Promise<any> => {
    console.log("Sending basket:", basket);

    const response = await fetch("http://localhost:5000/api/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"},
            body: JSON.stringify(basket),
    });

    if(!response.ok) {
        throw new Error("Failed to submit basket");
    }
    return response.json();
}; 