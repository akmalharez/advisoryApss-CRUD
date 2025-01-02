const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models').User;


exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.role_type !== 'u') {
      return res.status(403).json({ message: 'Access denied for this role' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role_type },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      status: 200,
      message: 'Logged in',
      result: {
        user_id: user.id,
        access_token: token,
        token_type: 'Bearer',
        role_type: user.role_type,
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.role_type !== 'a') {
      return res.status(403).json({ message: 'Access denied for this role' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role_type },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      status: 200,
      message: 'Logged in',
      result: {
        user_id: user.id,
        access_token: token,
        token_type: 'Bearer',
        role_type: user.role_type,
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
