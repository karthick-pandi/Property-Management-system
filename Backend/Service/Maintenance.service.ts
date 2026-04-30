import { AppDataSource } from '../config/data-source';
import MaintenanceRequest from '../Entity/MaintenanceRequest';

class MaintenanceService {
  static async getAllRequests() {
    const repository = AppDataSource.getRepository(MaintenanceRequest);
    return await repository.find();
  }

  static async createRequest(data: Partial<MaintenanceRequest>) {
    const repository = AppDataSource.getRepository(MaintenanceRequest);
    const newRequest = repository.create(data);
    return await repository.save(newRequest);
  }

  static async updateRequest(id: string, data: Partial<MaintenanceRequest>) {
    const repository = AppDataSource.getRepository(MaintenanceRequest);
    await repository.update(id, data);
    return await repository.findOne({ where: { id } });
  }

  static async deleteRequest(id: string) {
    const repository = AppDataSource.getRepository(MaintenanceRequest);
    return await repository.delete(id);
  }
}

export default MaintenanceService;