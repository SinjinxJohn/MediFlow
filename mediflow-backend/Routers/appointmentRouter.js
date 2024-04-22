const express = require('express');
const router = express.Router();
const appointmentController = require('../Controllers/appointmentController');

// Create Appointment
router.post('/create', appointmentController.createAppointment);

// Get All Appointments
router.get('/', appointmentController.getAllAppointments);

// Get Appointment by ID
router.get('/:id', appointmentController.getAppointmentById);

// Generate and download invoice PDF
router.get('/:id/invoice', async (req, res) => {
    try {
      // Generate the invoice PDF
      const invoicePDF = await appointmentController.generateInvoice(req.params.id);
  
      // Set response headers to prompt download
      res.setHeader('Content-disposition', 'attachment; filename=invoice.pdf');
      res.setHeader('Content-type', 'application/pdf');
  
      // Pipe the PDF stream to the response
      invoicePDF.pipe(res);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Update Appointment by ID
router.put('/:id', appointmentController.updateAppointment);

// Delete Appointment by ID
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
