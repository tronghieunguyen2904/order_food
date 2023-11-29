// hoadonController.js file
import { createOrderWithDetails } from '../database.js';

const hoadonController = {
  createOrderController: {
    async handleCreateOrder(req, res) {
      try {
        // Extract data from the request body, including order details
        const { id, hoten, diachi, sdt, trangthai, ngaydathang, mathanhtoan, mavanchuyen, makhachhang, details } = req.body;

        // Call the createOrderWithDetails function from the database to insert the order and details
        const orderId = await createOrderWithDetails(id, hoten, diachi, sdt, trangthai, ngaydathang, mathanhtoan, mavanchuyen, makhachhang, details);
        // Check if the order was created successfully
        if (orderId) {
          res.status(200).json({ success: true, message: 'Order created successfully', orderId });
        } else {
          res.status(500).json({ success: false, message: 'Failed to create order' });
        }
      } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    },
  },
};

export default hoadonController;
