import express from "express";

const app = express();

app.use(express.json());

app.get("/products", (_, res) => {
    res.json([
        {
            id: 1,
            name: "iPhone"
        },
        {
            id: 2,
            name: "Shoes"
        }
    ]);
});

const PORT = 4002;

app.listen(PORT, () => {
    console.log(`Product Service running on ${PORT}`);
});