import express from "express";

const app = express();

app.use(express.json());

app.get("/users", (_, res) => {

    res.json([
        {
            id: 1,
            name: "Alice"
        },
        {
            id: 2,
            name: "Bob"
        }
    ]);

});

const PORT = 4001;

app.listen(PORT, () => {
    console.log(`User Service running on ${PORT}`);
});