const express = require("express");
const cors = require("cors");
const scrapperRouter = require("./routes/route");
const app = express();
const port = 4000;

app.use(cors());
app.use("/scrapper", scrapperRouter.router);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
