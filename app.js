const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerConfig.js/swagger");

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health Check
app.get("/", (req, res) => {
  res.send("API Test Assignment is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
