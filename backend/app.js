const express = require("express");
const connectDB = require("./config/db.config"); // Adjust the path as necessary

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors')

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tagRoutes = require("./routes/tagRoutes");
const socialMediaRoutes = require("./routes/socialMediaRoutes");
const brandRoutes = require("./routes/brandRoutes");
const influencerRoutes = require("./routes/influencerRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Origin",
      "Accept",
      "X-Access-Token",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
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
        url: "http://localhost:5000/api",
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
      {
        name: "Social Media",
        description: "Operations related to Categories",
      },
      {
        name: "Brands",
        description: "Operations related to Brands",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Company REST API" });
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/social-media", socialMediaRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/influencers", influencerRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  // Connect to MongoDB
  await connectDB();
  console.table({
    Server: "Running",
    Endpoint: `http://localhost:5000/api`,
    API_Docs: `http://localhost:5000/api-docs`,
  });
});
