import { Modal } from 'antd';
import MapView, { type LocationItem } from '@/base/components/map-view';

export interface TripRoutePopupProps {
  locationItems: LocationItem[];
  onClose: () => void;
}

export const TripRoutePopup = ({
  locationItems,
  onClose,
}: TripRoutePopupProps) => {
  return (
    <Modal
      centered
      title='Route Map'
      open={true}
      width={500}
      footer={null}
      onCancel={onClose}
    >
      <div className='py-4'>
        {locationItems.length > 0 ? (
          <MapView locationList={locationItems} showDistance />
        ) : (
          <div className='text-center text-gray-500'>
            No location data available
          </div>
        )}
      </div>
    </Modal>
  );
};
