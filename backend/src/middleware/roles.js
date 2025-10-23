// Role permit middleware
// Usage: const permit = require('../middleware/roles');
// router.post('/', auth, permit('admin','librarian'), controller.createSomething);

module.exports = function permit(...allowedRoles) {
  return (req, res, next) => {
    // req.user must be set by auth middleware (JWT)
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: missing authentication' });
    }

    const userRole = req.user.role || 'student';
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }

    next();
  };
};