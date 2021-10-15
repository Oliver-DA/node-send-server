const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

//Connect DataBase
connectDB();
const corsOptions = {
    origin: `${process.env.FRONTEND_URL}`,
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static('uploads'))

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/links", require("./routes/link"));
app.use("/api/file", require("./routes/file"));

const port = process.env.PORT || 4000;

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})