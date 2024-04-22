const mongoose = require('mongoose');
// const db_link = "mongodb+srv://sinjinhotlinebling:hotlinebling@cluster0.v7rnuns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// mongoose.connect(db_link)
//     .then(function (db) {
//         console.log("db2 connected");
//     })
//     .catch(function (err) {
//         console.log(err);
//     })
const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  reason:{type:String,required:true},
  createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;