import { getOrdersByCustomerId } from "../database.js";

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
};

export default userController;
