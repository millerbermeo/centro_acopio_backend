import { Router } from "express";
import { elementoRegistrar, elementoListar, elementoListarId, elementoActualizar, elementoEliminar } from "../controllers/elementos.controller.js";
import { validarToken } from "../controllers/validator.controller.js";

const router = Router();

router.get('/listar',validarToken, elementoListar);
router.get('/listar/:id',validarToken, elementoListarId);
router.post('/registrar',validarToken, elementoRegistrar);
router.put('/actualizar/:id',validarToken, elementoActualizar);
router.delete('/eliminar/:id',validarToken, elementoEliminar);


export default router;