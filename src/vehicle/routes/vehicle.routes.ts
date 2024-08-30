import { Router } from 'express'
const router: Router = Router();

import { 
    createVehicle,
    getVehicle,
    getAllVehicles,
    updateVehicle,
    deleteVehicle,
    vehicleValuation,
    getVehicleValuations,
    createLoan,
    getLoanApplication
} from '../controllers/vehicleController';

router.post('/vehicles', createVehicle);
router.get('/vehicles/:vin', getVehicle);
router.get('/vehicles', getAllVehicles);
router.put('/vehicles/:vin', updateVehicle);
router.delete('/vehicles/:vin', deleteVehicle);
router.post('/vehicles/:vehicleId/valuations', vehicleValuation);
router.get('/vehicles/:vin/valuations', getVehicleValuations);
router.post('/vehicles/:vin/loan', createLoan);
router.get('/vehicles/:vin/loan', getLoanApplication);




export default router;

