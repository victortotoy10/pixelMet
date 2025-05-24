import bcryptjs from "bcryptjs";
import jsonwebToken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const usuarios = [
  {
    user: "a",
    email: "a@a.com",
    password: "$2b$05$IIJt4baqhTw4RWoA5daBGuOta14Rics3LJUD1bsE.PP9qFTc9LFAO",
  },
];

async function login(req, res) {
  console.log(req.body);
  const user = req.body.user;
  const password = req.body.password;
  if (!user || !password) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los campos estan incompletos" });
  }
  const usuarioAresvisar = usuarios.find((usuario) => usuario.user === user);

  if (!usuarioAresvisar) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error durante el login" });
  }
  const loginCorrecto = await bcryptjs.compare(
    password,
    usuarioAresvisar.password
  );
  if (!loginCorrecto) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error durante el login" });
  }
  const token = jsonwebToken.sign(
    { user: usuarioAresvisar.user },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    path: "/",
  };
  res.cookie("jwt", token, cookieOption);
  res.send({ status: "ok", message: "usuario loggeado", redirect: "/admin" });
}

async function register(req, res) {
  console.log(req.body);
  const user = req.body.user;
  const password = req.body.password;
  const email = req.body.email;

  if (!user || !password || !email) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los campos estan incompletos" });
  }
  const usuarioAresvisar = usuarios.find((usuario) => usuario.user === user);

  if (usuarioAresvisar) {
    return res
      .status(400)
      .send({ status: "Error", message: "El usuario ya existe" });
  }
  const salt = await bcryptjs.genSalt(5);
  const hashPassword = await bcryptjs.hash(password, salt);
  const nuevoUsuario = {
    user,
    email,
    password: hashPassword,
  };

  usuarios.push(nuevoUsuario);
  console.log(usuarios);
  return res.status(201).send({
    status: "ok",
    message: `Usuario ${nuevoUsuario.user} agregado`,
    redirect: "/",
  });
}

export const methods = {
  login,
  register,
};
