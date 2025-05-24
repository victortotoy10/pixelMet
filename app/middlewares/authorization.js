import jsonwebToken from "jsonwebtoken";
import dotenv from "dotenv";
import { usuarios } from "./../controllers/authentication.controller.js";
dotenv.config();

function soloAdmin(req, res, next) {
  const logueado = revisarCookie(req);
  if (logueado) return next();
  return res.redirect("/");
}

function SoloPublico(req, res, next) {
  const logueado = revisarCookie(req);
  if (!logueado) return next();
  return res.redirect("/admin");
}

function revisarCookie(req) {
  try {
    const cookieJWT = req.headers.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="))
      .slice(4);
    const decodificada = jsonwebToken.verify(cookieJWT, process.env.JWT_SECRET);
    console.log(decodificada);
    const usuarioAresvisar = usuarios.find(
      (usuario) => usuario.user === decodificada.user
    );
    console.log(usuarioAresvisar);
    if (!usuarioAresvisar) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export const methods = {
  soloAdmin,
  SoloPublico,
};
