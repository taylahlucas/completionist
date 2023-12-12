const getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await db.collection('users').findOne({ _id: ObjectId(userId) });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getUserById
}