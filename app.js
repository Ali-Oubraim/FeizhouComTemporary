const express = require("express");
const connectDB = require("./config/db.config"); // Adjust the path as necessary

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tagRoutes = require("./routes/tagRoutes");

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Swagger Options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Company REST API",
      description:
        "A REST API built with Express and MongoDB. This API provides Company CRUD operations",
    },
    servers: [
      {
        url: "http://localhost:5000/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "Operations related to authentication",
      },
      {
        name: "Users",
        description: "Operations related to users",
      },
      {
        name: "Tags",
        description: "Operations related to tags",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tags", tagRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT} 🚀`));
