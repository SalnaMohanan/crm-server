const Customer = require("../models/customerModel");

// ✅ Add a new customer (with salesperson tracking)
exports.addCustomer = async(req, res) => {
    try {
        const { name, email, phone, address, company, industry, website, notes } = req.body;

        // Ensure salesperson info is available
        if (!req.user || !req.user.username) {
            return res.status(401).json({ error: "Unauthorized: Salesperson info missing" });
        }

        console.log("Inside addCustomerController", req.body);

        const newCustomer = new Customer({
            name,
            email,
            phone,
            address,
            company,
            industry,
            website,
            notes,
            assignedTo: req.user.username, // ✅ Make sure this field is consistent
        });

        await newCustomer.save();
        res.status(201).json({ message: "Customer added successfully", customer: newCustomer });
    } catch (error) {
        console.error("Error adding customer:", error);
        res.status(500).json({ error: "Failed to add customer" });
    }
};

exports.getAddedCustomers = async(req, res) => {
    try {
        const customers = await Customer.find(); // Get all customers

        res.status(200).json(customers);
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getCustomerById = async(req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error("Error fetching customer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update customer by ID
exports.updateCustomerById = async(req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );
        if (!updatedCustomer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        res.json(updatedCustomer);
    } catch (error) {
        console.error("Error updating customer:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteCustomerById = async(req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        res.json({ message: "Customer deleted successfully!" });
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ error: "Server error" });
    }
};