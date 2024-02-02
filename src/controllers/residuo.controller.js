import { pool } from "../database/conexion.js";

export const residuoRegistrar = async (req, res) => {
    try {
        const { rol } = req.user;

        if (rol === 'administrador') {
            const { nombre_residuo, tipo_residuo, cantidad, unidad_medida, fk_alm, usuario, fk_actividad } = req.body;

            // Check if the cantidad_alm is greater than or equal to tope_alm
            const checkAlmSql = 'SELECT tope_alm, cantidad_alm FROM almacenamiento WHERE id_almacenamiento = ?';
            const [almRows] = await pool.query(checkAlmSql, [fk_alm]);

            if (almRows.length > 0) {
                const currentTopeAlm = almRows[0].tope_alm;
                const currentCantidadAlm = almRows[0].cantidad_alm;

                if (parseFloat(currentCantidadAlm) + parseFloat(cantidad) >= currentTopeAlm) {
                    return res.status(400).json({ 'message': 'Error: cantidad_alm is equal to or greater than tope_alm' });
                }
            }

            // Continue with the registration process

            // Verificar si el residuo ya existe
            const checkResiduoSql = 'SELECT id_residuo, cantidad, fk_alm FROM residuos WHERE nombre_residuo = ?';
            const [rows] = await pool.query(checkResiduoSql, [nombre_residuo]);

            let id_residuo;

            if (rows.length > 0) {
                // El residuo ya existe, actualiza la cantidad
                const id_residuo_existente = rows[0].id_residuo;
                const cantidad_existente = parseFloat(rows[0].cantidad) + parseFloat(cantidad);
                const alm = rows[0].fk_alm;

                const updateResiduoSql = 'UPDATE residuos SET cantidad = ? WHERE id_residuo = ?';
                await pool.query(updateResiduoSql, [cantidad_existente, id_residuo_existente]);

                id_residuo = id_residuo_existente;
            } else {
                // El residuo no existe, agrégalo a la tabla residuos
                const insertResiduoSql = 'INSERT INTO residuos (nombre_residuo, tipo_residuo, cantidad, unidad_medida, fk_alm) VALUES (?, ?, ?, ?, ?)';
                const [rows1] = await pool.query(insertResiduoSql, [nombre_residuo, tipo_residuo, cantidad, unidad_medida, fk_alm]);

                id_residuo = rows1.insertId;
            }

            const destino = 'centro de acopio'

            // Agrega el movimiento a la tabla movimientos
            const insertMovimientoSql = 'INSERT INTO movimientos (tipo_movimiento, cantidad, fecha, usuario_adm, fk_residuo, fk_actividad, destino) VALUES (?, ?, CURDATE(), ?, ?, ?, ?)';
            await pool.query(insertMovimientoSql, ['entrada', cantidad, usuario, id_residuo, fk_actividad, destino]);

            // Actualizar estado de la actividad
            const updateActividadSql = `UPDATE actividades SET estado_actividad = 'terminada' WHERE id_actividad = ${fk_actividad}`;
            await pool.query(updateActividadSql);

            // Actualizar cantidad de almacenamiento
            const updateCantidadAlmSql = 'UPDATE almacenamiento SET cantidad_alm = cantidad_alm + ? WHERE id_almacenamiento = ?';
            await pool.query(updateCantidadAlmSql, [cantidad, fk_alm]);

            res.status(201).json({ success: true, message: "Residuo registrado con éxito." });
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }
    } catch (error) {
        console.error("Error al registrar residuo:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
};



export const tiposResiduos = async (req, res) => {
    try {

        const { rol } = req.user;

        if (rol === 'administrador') {

            const query = 'SELECT * from tipos';
            const [result] = await pool.query(query);

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de tipos de residuos' });
            }

        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }


    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}

export const almacenamientosTipos = async (req, res) => {
    try {

        const { rol } = req.user;

        if (rol === 'administrador') {

            const query = 'SELECT * from almacenamiento';
            const [result] = await pool.query(query);

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de tipos de almacenamientos' });
            }

        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }


    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}

export const actividadesListar = async (req, res) => {
    try {

        const { rol } = req.user;

        if (rol === 'administrador') {

            const query = 'SELECT * FROM actividades a  WHERE estado_actividad = \'asignada\' AND tipo_actividad = 1';

            const [result] = await pool.query(query);

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de actividades' });
            }

        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }


    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}



export const residuoListar = async (req, res) => {
    try {

        const { rol } = req.user;

        if (rol === 'administrador') {

            const query = 'SELECT r.id_residuo, r.nombre_residuo, t.tipo_residuo, r.cantidad, r.unidad_medida, a.nombre_alm AS nombre_almacenamiento FROM residuos r JOIN almacenamiento a ON r.fk_alm = a.id_almacenamiento JOIN tipos t ON r.tipo_residuo = t.id_tipo';
            const [result] = await pool.query(query);

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de residuos' });
            }

        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }


    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}

export const residuoListarId = async (req, res) => {
    try {


        const { rol } = req.user;

        if (rol === 'administrador') {


            const id = req.params.id;
            const query = 'SELECT r.id_residuo, r.nombre_residuo, t.tipo_residuo, r.cantidad, r.unidad_medida, a.nombre_alm AS nombre_almacenamiento FROM residuos r JOIN almacenamiento a ON r.fk_alm = a.id_almacenamiento JOIN tipos t ON r.tipo_residuo = t.id_tipo  WHERE r.id_residuo = ?';
            const [result] = await pool.query(query, [id]);

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ 'message': `No se encontraron registros de residuos con id_residuo ${id}` });
            }
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }

    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}

export const residuoActualizar = async (req, res) => {
    try {

        const { rol } = req.user;

        if (rol === 'administrador') {

            let Id = req.params.id
            const { nombre_residuo, tipo_residuo, cantidad, unidad_medida, fk_alm } = req.body;

            let sql = `update residuos SET nombre_residuo = '${nombre_residuo}', tipo_residuo = '${tipo_residuo}', cantidad = '${cantidad}', unidad_medida = '${unidad_medida}', fk_alm = '${fk_alm}' WHERE id_residuo = ${Id}`

            let [rows] = await pool.query(sql)

            if (rows.affectedRows > 0)
                return res.status(200).json({ "message": "actualizado correctamente" })

            else
                return res.status(500).json({ "message": "no actualizado" })
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }

    } catch (error) {
        return res.status(500).json({ 'message': 'Error: ' + error });
    }
}


export const residuoRegistrarSalida = async (req, res) => {
    try {
        const { rol } = req.user;

        if (rol === 'administrador') {
            let id = req.params.id;
            const { cantidad, usuario, destino } = req.body;

            // Obtener la cantidad actual del residuo
            const obtenerCantidadResiduoSql = 'SELECT cantidad FROM residuos WHERE id_residuo = ?';
            const [residuoData] = await pool.query(obtenerCantidadResiduoSql, [id]);
            let cantidadResiduoActual = residuoData[0].cantidad;

            // Validar que la cantidad del req.body no sea mayor a la cantidad del residuo
            if (parseFloat(cantidad) > parseFloat(cantidadResiduoActual)) {
                return res.status(400).json({ success: false, message: "Error: La cantidad de salida es mayor que la cantidad del residuo." });
            }

            // Validar que la cantidad del residuo no sea menor a 0
            cantidadResiduoActual = Math.max(parseFloat(cantidadResiduoActual) - parseFloat(cantidad), 0);

            // Realizar la inserción en la tabla movimientos
            const sql = `INSERT INTO movimientos (tipo_movimiento, cantidad, fecha, usuario_adm, fk_residuo, destino) VALUES ('salida', ?, CURRENT_TIMESTAMP(), ?, ?, ?)`;
            await pool.query(sql, [cantidad, usuario, id, destino]);

            // Actualizar la cantidad del residuo en la tabla residuos
            const sql2 = `UPDATE residuos SET cantidad = ? WHERE id_residuo = ?`;
            await pool.query(sql2, [cantidadResiduoActual, id]);

            // Obtener el ID del almacenamiento asociado al residuo
            const obtenerFk = `SELECT fk_alm from residuos WHERE id_residuo = ?`;
            let fk_alm = await pool.query(obtenerFk, [id]);
            const currentResiduoFk = fk_alm[0][0].fk_alm;

            // Obtener los datos del almacenamiento
            const obtenerAlm = `SELECT tope_alm, stock_alm, cantidad_alm FROM almacenamiento WHERE id_almacenamiento = ${currentResiduoFk}`;
            let obtenerDatos = await pool.query(obtenerAlm);

            // Extract the current tope_alm, stock_alm, and cantidad_alm
            const currentTopeAlm = obtenerDatos[0][0].tope_alm;
            const currentStockAlm = obtenerDatos[0][0].stock_alm;
            const currentCantidadAlm = obtenerDatos[0][0].cantidad_alm;

            // Calculate the difference between tope_alm and cantidad
            const difference = currentTopeAlm + parseFloat(cantidad);

            // Update cantidad_alm in the almacenamiento table with the incoming cantidad
            const newCantidadAlm = Math.max(parseFloat(currentCantidadAlm) - parseFloat(cantidad), 0); // Set to 0 if negative
            const updateCantidadAlmSql = 'UPDATE almacenamiento SET cantidad_alm = ? WHERE id_almacenamiento = ?';
            await pool.query(updateCantidadAlmSql, [newCantidadAlm, currentResiduoFk]);

            // Update stock_alm in the almacenamiento table by subtracting the difference
            const newStockAlm = Math.min(Math.max(currentStockAlm + parseFloat(cantidad), 0), currentTopeAlm); // Set to 0 if negative, and don't exceed tope_alm
            const updateStockSql = 'UPDATE almacenamiento SET stock_alm = ? WHERE id_almacenamiento = ?';
            await pool.query(updateStockSql, [newStockAlm, currentResiduoFk]);

            res.status(201).json({ success: true, message: "Registro de salida de residuo exitoso." });
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }
    } catch (error) {
        console.error("Error al registrar salida de residuo:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
};






export const residuoListarMovimientos = async (req, res) => {
    try {
        const { rol } = req.user;

        if (rol === 'administrador') {

            const { mes, year, movimiento } = req.body;

            if (!mes || !year) {

                let query = `
                SELECT m.id_movimiento, m.tipo_movimiento, m.cantidad, a.nombre_act, r.unidad_medida, m.fecha, u.nombre as usuario_adm, r.nombre_residuo, ti.nombre_actividad, m.destino
                FROM movimientos m
                JOIN residuos r ON m.fk_residuo = r.id_residuo
                JOIN usuarios u ON m.usuario_adm = u.id_usuario
                LEFT JOIN actividades a ON m.fk_actividad = a.id_actividad
                LEFT JOIN tipos_actividades ti ON a.id_actividad = ti.id_tipo_actividad 
                `;
                const [result] = await pool.query(query);

                if (result.length > 0) {
                    return res.status(200).json(result);
                } else {
                    return res.status(404).json({ 'message': 'No se encontraron movimientos' });
                }
            } else {

                if (movimiento == 'todos') {
                    const query = `SELECT m.id_movimiento, m.tipo_movimiento, m.cantidad, m.fecha, u.nombre as usuario_adm, r.nombre_residuo, ti.nombre_actividad
                        FROM movimientos m
                        JOIN residuos r ON m.fk_residuo = r.id_residuo
                        JOIN usuarios u ON m.usuario_adm = u.id_usuario
                        LEFT JOIN actividades a ON m.fk_actividad = a.id_actividad
                        LEFT JOIN tipos_actividades ti ON a.id_actividad = ti.id_tipo_actividad WHERE MONTH(fecha) = ${mes} AND YEAR(fecha) = ${year}`;

                    const [result] = await pool.query(query);

                    if (result.length > 0) {
                        return res.status(200).json(result);
                    } else {
                        return res.status(404).json({ 'message': 'No se encontraron registros de residuos' });
                    }
                }
                else if (movimiento === 'entrada' || movimiento === 'salida') {
                    const query = `SELECT m.id_movimiento, m.tipo_movimiento, m.cantidad, m.fecha, u.nombre as usuario_adm, r.nombre_residuo, ti.nombre_actividad
                        FROM movimientos m
                        JOIN residuos r ON m.fk_residuo = r.id_residuo
                        JOIN usuarios u ON m.usuario_adm = u.id_usuario
                        LEFT JOIN actividades a ON m.fk_actividad = a.id_actividad
                        LEFT JOIN tipos_actividades ti ON a.id_actividad = ti.id_tipo_actividad WHERE MONTH(fecha) = ${mes} AND YEAR(fecha) = ${year} AND tipo_movimiento = '${movimiento}'`;

                    const [result] = await pool.query(query);

                    if (result.length > 0) {
                        return res.status(200).json(result);
                    } else {
                        return res.status(404).json({ 'message': 'No se encontraron registros de residuos' });
                    }
                }
            }

        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
};




//FUNCION PARA LISTAR CANTIDAD POR TIPO DE RESIDUO

export const residuoListarTipo = async (req, res) => {
    try {

        const { rol } = req.user;

        if (rol === 'administrador') {

            // const query = 'SELECT r.id_residuo, r.nombre_residuo, t.tipo_residuo, r.cantidad, r.unidad_medida, a.nombre_alm AS nombre_almacenamiento FROM residuos r JOIN almacenamiento a ON r.fk_alm = a.id_almacenamiento JOIN tipos t ON r.tipo_residuo = t.id_tipo';

            const query = `SELECT t.tipo_residuo, SUM(cantidad) as cantidad_total FROM residuos r JOIN tipos t ON r.tipo_residuo = t.id_tipo GROUP BY tipo_residuo`

            const [result] = await pool.query(query);

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de residuos' });
            }

        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }


    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}


//FUNCION PARA LISTAR CANTIDAD POR ALMACENAMIENTO

export const listarAlmCantidad = async (req, res) => {
    try {

        const { rol } = req.user;

        if (rol === 'administrador') {

            // const query = `SELECT t.tipo_residuo, SUM(cantidad) as cantidad_total FROM residuos r JOIN tipos t ON r.tipo_residuo = t.id_tipo GROUP BY tipo_residuo`

            const query = `SELECT nombre_alm, tope_alm, cantidad_alm FROM almacenamiento`

            const [result] = await pool.query(query);

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de residuos' });
            }

        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }


    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}


//FUNCION PARA LISTAR CANTIDAD MOVIMINETOS POR MES

export const listarMovMesY = async (req, res) => {
    try {

        const { rol } = req.user;

        if (rol === 'administrador') {

            const query = `
            SELECT 
              YEAR(fecha) AS anio, 
              CASE 
                WHEN MONTH(fecha) = 1 THEN 'Enero'
                WHEN MONTH(fecha) = 2 THEN 'Febrero'
                WHEN MONTH(fecha) = 3 THEN 'Marzo'
                WHEN MONTH(fecha) = 4 THEN 'Abril'
                WHEN MONTH(fecha) = 5 THEN 'Mayo'
                WHEN MONTH(fecha) = 6 THEN 'Junio'
                WHEN MONTH(fecha) = 7 THEN 'Julio'
                WHEN MONTH(fecha) = 8 THEN 'Agosto'
                WHEN MONTH(fecha) = 9 THEN 'Septiembre'
                WHEN MONTH(fecha) = 10 THEN 'Octubre'
                WHEN MONTH(fecha) = 11 THEN 'Noviembre'
                WHEN MONTH(fecha) = 12 THEN 'Diciembre'
              END AS nombre_mes,
              COUNT(*) AS cantidad_movimientos,
              SUM(CASE WHEN tipo_movimiento = 'entrada' THEN 1 ELSE 0 END) AS cantidad_entradas,
              SUM(CASE WHEN tipo_movimiento = 'salida' THEN 1 ELSE 0 END) AS cantidad_salidas
            FROM movimientos
            GROUP BY anio, MONTH(fecha)
            ORDER BY anio DESC, MONTH(fecha) DESC;
          `;






            const [result] = await pool.query(query);

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de residuos' });
            }

        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }


    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}



