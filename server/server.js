const express = require('express');
const app = express();
const cors = require('cors');
const corseOptions = {
    origin: 'http://localhost:5173',
};
app.use(cors(corseOptions));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
}
);