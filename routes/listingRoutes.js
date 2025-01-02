// backend/routes/listings.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const listingController = require("../controllers/listingController");

// Fetch listings for users and admins (remove admin-specific restriction)
router.get("/", auth(), listingController.getListings);

// Admin-specific routes
router.post("/",auth(), listingController.addListing);
router.put("/:id", listingController.editListing);
router.delete("/:id", listingController.deleteListing);

module.exports = router;
