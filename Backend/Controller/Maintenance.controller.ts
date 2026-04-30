import { Request, Response } from 'express';
import MaintenanceService from '../Service/Maintenance.service';

class MaintenanceController {
  static async getAllMaintenanceRequests(req: Request, res: Response) {
    try {
      const requests = await MaintenanceService.getAllRequests();
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch maintenance requests' });
    }
  }

  static async createMaintenanceRequest(req: Request, res: Response) {
    try {
      // Extract and validate required fields
      const { propertyId, title, description, priority, status, assignedTo, scheduledDate, tenantId } = req.body;
      if (!propertyId || !title || !description || !priority || !status) {
        return res.status(400).json({ error: 'Missing required fields: propertyId, title, description, priority, status' });
      }

      // Prepare the data object for entity
      const data = {
        propertyId,
        title,
        description,
        priority,
        status,
        assignedTo: assignedTo || '',
        scheduledDate: scheduledDate ? new Date(scheduledDate) : undefined,
        tenantId: tenantId || ''
      };

      const newRequest = await MaintenanceService.createRequest(data);
      res.status(201).json(newRequest);
    } catch (error) {
      console.error('Error creating maintenance request:', error);
      const errMsg = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: 'Failed to create maintenance request', details: errMsg });
    }
  }

  static async updateMaintenanceRequest(req: Request, res: Response) {
    try {
      const updatedRequest = await MaintenanceService.updateRequest(req.params.id as string, req.body);
      res.status(200).json(updatedRequest);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update maintenance request' });
    }
  }

  static async deleteMaintenanceRequest(req: Request, res: Response) {
    try {
      await MaintenanceService.deleteRequest(req.params.id as string);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete maintenance request' });
    }
  }
}

export default MaintenanceController;