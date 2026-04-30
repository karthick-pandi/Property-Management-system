import express from 'express';
import MaintenanceController from '../Controller/Maintenance.controller';

const router = express.Router();

// Define routes for maintenance
router.get('/', MaintenanceController.getAllMaintenanceRequests);
router.post('/', MaintenanceController.createMaintenanceRequest);
router.put('/:id', MaintenanceController.updateMaintenanceRequest);
router.delete('/:id', MaintenanceController.deleteMaintenanceRequest);

export default router;