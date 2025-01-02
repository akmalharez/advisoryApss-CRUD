const Listing = require('../models').Listing;
const { calculateDistance } = require('../utils/distanceHelper');

// Fetch listings for users and admins
exports.getListings = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const { role_type, id: userId } = req.user; // Assuming req.user contains logged-in user's data

    // If user is not an admin and location is required
    if (role_type === 'u' && (!latitude || !longitude)) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    let listings;

    if (role_type === 'a') {
      // Admin fetches all listings without distance calculations
      listings = await Listing.findAll();
    } else {
      // User fetches listings and distance is calculated
      listings = await Listing.findAll();
      listings = listings.map((listing) => ({
        id: listing.id,
        name: listing.name,
        distance: calculateDistance(latitude, longitude, listing.latitude, listing.longitude),
        created_at: listing.createdAt,
        updated_at: listing.updatedAt,
      }));
    }

    res.json({
      status: 200,
      message: 'Success',
      result: {
        current_page: 1,
        total_count: 50,  
        data: listings,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add a new listing (Admin only)
exports.addListing = async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;

    if (!name || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: 'Name, latitude, and longitude are required' });
    }

    const newListing = await Listing.create({ name, latitude, longitude, user_id: req.user.id });
    res.status(201).json({ message: 'Listing added successfully', listing: newListing });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};;

// Edit an existing listing (Admin only)
exports.editListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, latitude, longitude } = req.body;
    const listing = await Listing.findByPk(id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    listing.name = name || listing.name;
    listing.latitude = latitude !== undefined ? latitude : listing.latitude;
    listing.longitude = longitude !== undefined ? longitude : listing.longitude;

    await listing.save();
    res.json({ message: 'Listing updated successfully', listing });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a listing (Admin only)
exports.deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findByPk(id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    await listing.destroy();
    res.json({ message: 'Listing deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
