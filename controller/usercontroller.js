import { getOrdersByCustomerId , updateCustomerInfo } from "../database.js";

const userController = {
  getOrdersByCustomerId: async (req, res) => {
    try {
      const { id } = req.params; // Assuming your route parameter is named 'customerId'
      const [orders, fields] = await getOrdersByCustomerId(id);

      if (orders.length === 0) {
        return res.status(404).json({
          message: "No orders found for the specified customer ID",
        });
      }

      res.json({
        message: "ok",
        data: orders,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  updateCustomer: async (req, res) => {
    try {

      const updatedInfo = req.body;

      // Call the updateCustomerInfo function from the database
      const updateResult = await updateCustomerInfo(updatedInfo);

      // Check if the update was successful
      if (updateResult) {
        res.status(200).json({ success: true, message: 'Customer info updated successfully' });
      } else {
        console.log("SQL Parameters:", [updatedInfo , updateResult.affectedRows]);
        res.status(404).json({ success: false, message: 'Customer not found or no changes made' });
      }
    } catch (error) {
      console.error('Error updating customer info:', error.message);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
};

export default userController;
