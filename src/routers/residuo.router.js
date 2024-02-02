import { Router } from "express";
import { residuoRegistrar, residuoListar, residuoListarId, residuoActualizar, residuoRegistrarSalida, residuoListarMovimientos, tiposResiduos, actividadesListar, almacenamientosTipos, residuoListarTipo, listarAlmCantidad, listarMovMesY } from "../controllers/residuo.controller.js";
import { validarToken } from "../controllers/validator.controller.js";

const router = Router();


router.get('/listar',validarToken,residuoListar);
router.post('/movimientos',validarToken,residuoListarMovimientos);
router.get('/listar/:id',validarToken,residuoListarId);
router.post('/registrar',validarToken,residuoRegistrar);
router.post('/salida/:id',validarToken,residuoRegistrarSalida);
router.put('/actualizar/:id',validarToken,residuoActualizar);
router.get('/tipos_residuos',validarToken,tiposResiduos);
router.get('/actividades',validarToken,actividadesListar);
router.get('/almacenamiento',validarToken,almacenamientosTipos);



router.get('/listar_tipos_residuos',validarToken,residuoListarTipo);
router.get('/listar_cantidad_alm',validarToken,listarAlmCantidad);

router.get('/listar_mov_mes',validarToken,listarMovMesY);



export default router;