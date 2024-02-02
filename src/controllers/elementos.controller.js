import { pool } from "../database/conexion.js";

export const elementoRegistrar = async (req, res) => {

    try {

        const { rol } = req.user;

        if (rol === 'administrador') {

        const { nombre_elm, tipo_elm, cantidad } = req.body

        const sql = `INSERT INTO elementos (nombre_elm, tipo_elm, cantidad) VALUES (?,?,?)`

        const [rows] = await pool.query(sql, [nombre_elm, tipo_elm, cantidad])

        res.status(201).json({ success: true, message: "Residuo registrado con éxito." });

    } else {
        return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
    }
    } catch (error) {
        console.error("Error al registrar elemento:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor." });
    }

}

export const elementoListar = async (req, res) => {
    try {
        const { rol } = req.user;

        if (rol === 'administrador') {
        let query = "SELECT * from elementos"

        let [result] = await pool.query(query)

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ 'message': 'No se encontraron elementos' });
        }

    } else {
        return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
    }

    } catch (error) {
        console.error("Error al registrar residuo:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
}


export const elementoListarId = async (req, res) => {
    try {
        const { rol } = req.user;

        if (rol === 'administrador') {
        const id = req.params.id

        const query = 'SELECT * from elementos WHERE id_elemento = ?'
        const [result] = await pool.query(query, [id])

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ 'message': `No se encontraron registros del elementos con el id ${id}` });
        }

    } else {
        return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
    }

    } catch (error) {
        console.error("Error al buscar elemento:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
}


export const elementoActualizar = async (req, res) => {
    try {
        const { rol } = req.user;

        if (rol === 'administrador') {

        const id = req.params.id

        const { nombre_elm, tipo_elm, cantidad } = req.body

        let sql = `UPDATE elementos SET nombre_elm = '${nombre_elm}', tipo_elm = '${tipo_elm}', cantidad = '${cantidad}' WHERE id_elemento = ${id}`

        let [rows] = await pool.query(sql)

        if (rows.affectedRows > 0)
            return res.status(200).json({ "message": "actualizado correctamente" })

        else
            return res.status(500).json({ "message": "no actualizado" })
   } else {
        return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
    }
    } catch (error) {
        console.error("Error al actualizar elemento:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
}

export const elementoEliminar = async (req, res) => {
    try {
        const { rol } = req.user;

        if (rol === 'administrador') {

        const id = req.params.id

        const query = `DELETE from elementos WHERE id_elemento = ${id}`
        await pool.query(query)

        return res.status(200).json({ "message": "eliminado correctamente" })
   } else {
        return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
    }
    } catch (error) {
        console.error("Error al eliminar elemento:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
}