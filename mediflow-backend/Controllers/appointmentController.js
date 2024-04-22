// controllers/appointmentController.js
const Appointment = require('../Models/appointmentModel');
const PDFDocument = require('pdfkit');
const fs = require('fs');
// Create Appointment
exports.createAppointment = async (req, res) => {
    try {
      // Extract data from request body
      const { patientName, doctorName, appointmentDate, reason } = req.body;
  
      // Validate input data
      if (!patientName || !doctorName || !appointmentDate || !reason) {
        return res.status(400).json({ success: false, message: "Patient name, doctor name, and appointment date are required" });
      }
  
      // Create new appointment instance
      const appointment = new Appointment({ patientName, doctorName, appointmentDate,reason });
  
      // Save appointment to the database
      const savedAppointment = await appointment.save();
  
      // Send response with success message and saved appointment data
      res.status(201).json({ success: true, message: "Appointment created successfully", appointment: savedAppointment });
    } catch (error) {
      // Handle errors
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// Get All Appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    if(!appointments){
        return res.status(404).json({success:false,message:"No appointment found"})
    }else{
        res.status(200).json({success:true,appointment:appointments});

    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Appointment by ID
exports.updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Appointment by ID
exports.deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  

// Route handler to generate and download invoice PDF


};

exports.generateInvoice = async (appointmentId) => {
    try {
      // Retrieve appointment data from the database
      const appointment = await Appointment.findById(appointmentId);
  
      // Create a new PDF document
      const doc = new PDFDocument();
  
      // Add content to the PDF document
      doc.fontSize(12);
      doc.text('Invoice', { align: 'center' });
      doc.text(`Patient Name: ${appointment.patientName}`);
      doc.text(`Doctor Name: ${appointment.doctorName}`);
      doc.text(`Appointment Date: ${appointment.appointmentDate}`);
      doc.text(`Reason: ${appointment.reason}`);
      doc.text(`Consultation Fee: Rs.120`)
      // Add bill details here...
  
      // Return the PDF document
      return doc;
    } catch (error) {
        // console.log(error.message);
      throw new Error(error.message);
    }
};
