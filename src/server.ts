const express = require('express');
import connectDB from './data-source/database';
import vehicleRoutes from '../src/vehicle/routes/vehicle.routes';


const app = express();
connectDB;


app.use(express.json());

app.use('/api', vehicleRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Autochek Server is running on port http://localhost:${PORT}`);
});


