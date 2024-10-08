const authMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); //usuario  autenticado, puedes continuar con la solicitud
    }
    res.redirect('/login'); //redirige al login si no está autenticado
};

module.exports = { authMiddleware };


/*
Verifica que este aenticado el usuario, cuando usa req.isAuthenticated(), dandole permiso para continuar si lo està retornando next(); sino lo està`redirige a loging
*/