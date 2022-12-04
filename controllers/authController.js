const AuthService = require("../services/authService");


const registermember = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("cek" + name)
  const { status, status_code, message, data } = await AuthService.register({
    name,
    email,
    password,
    role: "member"
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  const { status, status_code, message, data } = await AuthService.login({
    email,
    password,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const registeradmin = async (req, res) => {
  const { name, email, password } = req.body;
  const { status, status_code, message, data } = await AuthService.registeradmin({
    name,
    email,
    password
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const currentUser = async (req, res) => {
  const currentUser = req.user;

  res.status(200).send({
    status: true,
    message: "Get current user success.",
    data: {
      user: currentUser,
    },
  });
};

module.exports = { registermember, login, registeradmin, currentUser };
