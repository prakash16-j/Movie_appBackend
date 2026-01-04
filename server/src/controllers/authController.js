const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'Email already in use' })
    const user = await User.create({ name, email, password, role })
    res.status(201).json({ id: user._id, email: user.email, role: user.role , name: user.name})
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })
    const matched = await user.comparePassword(password)
    if (!matched) return res.status(401).json({ message: 'Invalid credentials' })
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '7d',
    })
    res.json({ token, user: { id: user._id, email: user.email, role: user.role } })
}
