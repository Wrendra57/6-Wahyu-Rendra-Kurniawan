const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8000;
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerJsdoc = require("swagger-jsdoc");
// SWAGGER
const swaggerOptions = require("./utils/swaggerOptions");
const swaggerSpec = swaggerJsdoc(swaggerOptions);

const upload = require("./helpers/fileUploadCloudinary");
const authController = require("./controllers/authController");
const carController = require("./controllers/carController");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Import Midleware
const middleware = require("./middlewares/auth");

// API USER
app.post("/auth/register", authController.registermember);
app.post("/auth/login", authController.login);
app.get("/auth/me", middleware.authenticate, authController.currentUser);

// API SUPERADMIN
app.post(
  "/auth/registeradmin",
  middleware.authenticate,
  middleware.isSuperAdmin,
  authController.registeradmin
);

//
app.post("/auth/login-google", authController.loginGoogle);
// API CRUD CARS
app.post(
  "/cars",
  middleware.authenticate,
  middleware.isAdmin,
  upload.single("picture"),
  carController.create
);

app.get("/cars", carController.getAllCars);
app.get("/cars/:id", carController.getDetailCar);

app.put(
  "/cars/:id",
  middleware.authenticate,
  middleware.isAdmin,
  upload.single("picture"),
  carController.updatedCar
);

app.delete(
  "/cars/:id",
  middleware.authenticate,
  middleware.isAdmin,
  carController.deleteCarsById
);

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
