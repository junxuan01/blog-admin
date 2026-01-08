// import { logger } from '@utils/logger';
// import { getGoogleLocation } from '../api/trips';

// const useSearchByGoogleMap = () => {
//   const searchByGoogleMap = async (value: string) => {
//     try {
//       const { data } = await getGoogleLocation(value);
//       const { locations: places = [] } = data;

//       return places.map((place: any) => {
//         return {
//           id: place.postal_code || '',
//           name: place?.display_name || '',
//           address: place.address || '',
//           postcode: place?.postal_code,
//           coordinate: place?.coordinate,
//           displayName: place?.display_name,
//           desc: place?.address,
//           google_place_id: place?.google_place_id,
//         };
//       });
//     } catch (error) {
//       logger.error('Failed to search places:', error);
//       return Promise.resolve([]);
//     }
//   };

//   return {
//     searchByGoogleMap,
//   };
// };

// export default useSearchByGoogleMap;
