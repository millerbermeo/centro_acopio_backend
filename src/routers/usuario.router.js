import { Router } from "express";
import { listarUsuario, registrarUsuario, usuarioListarId, usuarioActualizar, usuarioAdmin, usuarioEstado, usuariolistaPasante, usuarioEliminarId } from "../controllers/usuario.controller.js";
import { validarToken } from "../controllers/validator.controller.js";


const router = Router();
router.get('/listar',validarToken, listarUsuario);
router.get('/listar_admin',validarToken, usuarioAdmin);
router.get('/listar_pasante',validarToken, usuariolistaPasante);
router.get('/listar_id/:id',validarToken, usuarioListarId);
router.post('/registrar',registrarUsuario);
router.put('/actualizar/:id',validarToken, usuarioActualizar);
router.put('/estado/:id',validarToken, usuarioEstado);
router.get('/eliminar/:id',validarToken, usuarioEliminarId);



// router.get('/listar',validarToken,residuoListar);



export default router;