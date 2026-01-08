export function transformLocation(location?: any) {
  return {
    id: location?.identity,
    display_name: location?.displayName,
    address: location?.address,
    postal_code: location?.postal_code || location?.postcode,
    name: location?.name || '',
    coordinate: {
      latitude: location?.coordinate?.latitude || '',
      longitude: location?.coordinate?.longitude || '',
    },
    google_place_id: location?.google_place_id || '',
  };
}

export function extractCountryCode(zoneCode?: string) {
  return zoneCode?.split('_')[0];
}
