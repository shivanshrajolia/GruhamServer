const User = require('../models/User');

const subscribe = async (req, res) => {
  const { plan } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.subscription = plan;
    await user.save();

    res.json({ message: 'Subscription updated successfully', subscription: user.subscription });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ subscription: user.subscription });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { subscribe, getSubscription };
