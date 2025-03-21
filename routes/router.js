const express = require("express");
const userConrtoller = require("../controllers/userController")
const upload = require("../middelwares/uploads"); // Upload middleware
const campaignController = require("../controllers/campaignController");
const leadController = require("../controllers/leadController")

const router = express.Router();
// add user register
router.post("/register", userConrtoller.addUserController)
    // login
router.post("/login", userConrtoller.loginController)
    // add campign
router.post("/add-campaign", upload.single("image"), campaignController.addCampaignController);

// Get all campaigns
router.get("/campaigns", campaignController.getAllCampaigns);

// Route to delete a campaign
router.delete("/campaigns/:id", campaignController.deleteCampaign);

// view byid
router.get("/campaigns/:id", campaignController.getCampaignById);

// update
router.put("/campaigns/:id", campaignController.updateCampaign);

// add leads
router.post("/add-lead", leadController.addLeadController)


// get all leads
router.get("/all-leads", leadController.getAllLeadsController);

// fecth salsperson only 
router.get("/salespersons", userConrtoller.getSalespersons);

// get leads
router.get("/lead-view/:id", leadController.getLeadById);

// Route to delete a lead
router.delete("/leads/:id", leadController.deleteLead);
// update lead
router.put("/leads/:id", leadController.updateLead);

module.exports = router;