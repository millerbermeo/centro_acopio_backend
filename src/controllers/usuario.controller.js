import { pool } from "../database/conexion.js";


export const listarUsuario = async (req, res) => {

    try {
        const { rol } = req.user;

        if (rol === 'administrador') {
            let query = 'SELECT * from usuarios'

            let [result] = await pool.query(query)
            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de usuarios' });
            }

        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}

export const registrarUsuario = async (req, res) => {
    try {

        let { nombre, apellidos, identificacion, email, password, rol } = req.body
        const sql = `INSERT into usuarios (nombre, apellidos, identificacion, email, password, rol) values (?,?,?,?,?,?)`
        await pool.query(sql, [nombre, apellidos, identificacion, email, password, rol])
        res.status(201).json({ success: true, message: "usuario registrado con éxito." });


    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }

}

export const usuarioListarId = async (req, res) => {
    try {

        const { rol } = req.user;

        if (rol === 'administrador') {

            const id = req.params.id
            const query = 'SELECT * from usuarios WHERE id_usuario = ?'
            const [result] = await pool.query(query, [id])

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ 'message': `No se encontraron registros del usurario con el id ${id}` });
            }

        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }

    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}

export const usuarioEliminarId = async (req, res) => {
    try {
        const { rol } = req.user;

        if (rol === 'administrador') {
            const id = req.params.id;
            const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
            const result = await pool.query(query, [id]);

            return res.status(200).json({ "mensaje": "Eliminado correctamente" });

        } else {
            return res.status(403).json({ 'message': 'Error: Usuario no autorizado' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ 'message': 'Error interno en el servidor' });
    }
};





export const usuarioAdmin = async (req, res) => {
    try {
        const { rol } = req.user;

        if (rol === 'administrador') {
            const query = 'SELECT * FROM usuarios WHERE rol = ?';
            const [result] = await pool.query(query, ['administrador']);

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros del usuario con el rol administrador' });
            }
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }

    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
};


export const usuariolistaPasante = async (req, res) => {
    try {
        const { rol } = req.user;

        if (rol === 'administrador') {
            const query = 'SELECT * FROM usuarios WHERE rol = ?';
            const [result] = await pool.query(query, ['pasante']);

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros del usuario con el rol pasante' });
            }
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }

    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
};



export const usuarioActualizar = async (req, res) => {

    try {


        const { rol } = req.user;

        if (rol === 'administrador') {


            let id = req.params.id

            const { nombre, apellidos, identificacion, email, password, rol, estado } = req.body

            let sql = `update usuarios SET nombre = '${nombre}', apellidos = '${apellidos}', identificacion = '${identificacion}', email = '${email}', password = '${password}', rol = '${rol}', estado = '${estado}' WHERE id_usuario = ${id}`

            let [rows] = await pool.query(sql)

            if (rows.affectedRows > 0)
                return res.status(200).json({ "message": "actualizado correctamente" })

            else
                return res.status(500).json({ "message": "no actualizado" })

        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }
    } catch (error) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}


export const usuarioEstado = async (req, res) => {

    try {


        const { rol } = req.user;

        if (rol === 'administrador') {


            let id = req.params.id

            let estado = 'inactivo'

            let sql = `update usuarios SET estado = '${estado}' WHERE id_usuario = ${id}`

            let [rows] = await pool.query(sql)

            if (rows.affectedRows > 0)
                return res.status(200).json({ "message": "Estado actualizado correctamente" })

            else
                return res.status(500).json({ "message": "no actualizado" })

        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }
    } catch (error) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}