module.exports = {
  up: async (db) => {
    // Add the new field 'settings' with the default value to all documents in the 'users' collection
    await db.collection('users').updateMany({},
      { $set: { settings: [
        { type: 'COMPLETED_ITEMS', isActive: true },
        { type: 'DISABLED_SECTIONS', isActive: true }
      ]}}
    );
  },

  down: async (db) => {
    // Remove the 'settings' field from all documents in the 'users' collection
    await db.collection('users').updateMany({}, { $unset: { settings: 1 } });
  }
};
