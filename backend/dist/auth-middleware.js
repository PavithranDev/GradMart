import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.AUTH_SECRET || 'secret123';
export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}
export function requireAdmin(req, res, next) {
    requireAuth(req, res, () => {
        if (req.user?.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    });
}
export function requireSeller(req, res, next) {
    requireAuth(req, res, () => {
        if (req.user?.role !== 'SELLER' && req.user?.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    });
}
export function signToken(user) {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '30d' });
}
