const bcrypt = require('bcryptjs');
const prisma = require('../prismaClient');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    const existing = await prisma.user.findFirst({
        where: { OR: [{ email }, { username }] }
    });

    if (existing) return res.status(400).json({ error: "Email lub nick już istnieje" });

    const password_hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password_hash
        }
    });

    const token = generateToken(user);

    res.json({ token });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Zły email lub hasło" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: "Zły email lub hasło" });

    const token = generateToken(user);
    res.json({ token });
};

exports.me = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: { id: true, username: true, email: true, role: true }
    });

    res.json(user);
};