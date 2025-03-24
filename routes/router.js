const express = require("express");
const userConrtoller = require("../controllers/userController")
const upload = require("../middelwares/uploads"); // Upload middleware
const campaignController = require("../controllers/campaignController");
const leadController = require("../controllers/leadController")
const followupController = require("../controllers/followupController")
const customerController = require("../controllers/customerController")
const contactController = require("../controllers/contactController")
const authMiddleware = require("../middelwares/authMiddelwares")


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

// add followup 
router.post("/followup-add", followupController.addFollowup)
    // get all followup
router.get("/follow-up", followupController.getAddedFollowp);

// get followup
router.get("/followup-view/:id", followupController.getFollowupById);

// add customer
router.post("/customer-add", customerController.addCustomer);

// Route for managers (fetch all customers)
router.get("/customers", customerController.getAddedCustomers);

// Route for salespeople (fetch only their added customers)
router.get("/customer-view/:id", customerController.getCustomerById);
// edit
router.put("/customer-edit/:id", customerController.updateCustomerById);
// delete
router.delete("/customer-delete/:id", customerController.deleteCustomerById);
// add contact
router.post("/contact", contactController.submitContactForm);

module.exports = router;