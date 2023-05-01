import { Building } from '../entity/Building';
import { dataSource } from '../data-source';

const db = dataSource.getRepository(Building);

const getBuildingById = async (id: number)
: Promise<Building> => {
  const bulding = await db.findOneBy({
    id: id
  })
  return bulding;
};

const fetchBuildingsByLatitudeAndLongitude = async (
  latitude: number, 
  longitude: number
): Promise<Building[]> => {
  const buildings = await db.findBy({
    latitude: latitude,
    longitude: longitude
  })
return buildings;
};

const fetchBuildingsByBbox = async (
  west: number, 
  south: number,
  east: number,
  north: number
): Promise<Building[]> => {
  const buildings = await db.createQueryBuilder('b')
  .where(':north <= b.latitude && b.latitude <= :west', { north, west })
  .andWhere(':south <= b.longitude && b.longitude <= :east', { south, east })
  .getMany();
  return buildings;
};

export {
  getBuildingById,
  fetchBuildingsByLatitudeAndLongitude,
  fetchBuildingsByBbox
};