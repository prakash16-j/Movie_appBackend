const jwt = require('jsonwebtoken')

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ message: 'No token' })
    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Invalid token format' })
    const token = parts[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret')
        req.user = payload  // attaches user info (id, role) to req
        next()              // ← This is what was missing before!
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}

exports.requireRole = (role) => (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
    if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden: Insufficient role' })
    next()  // ← Also correctly calls next()
}