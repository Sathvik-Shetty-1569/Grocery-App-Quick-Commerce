export const handleFitToPath = (
  mapRef: any,
  deliveryLocation: any,
  pickupLocation: any,
  hasPickedUp: any,
  hasAccepted: any,
  deliveryPersonLocation: any,
) => {
  if (!mapRef) return;

  const pointA = hasAccepted ? deliveryPersonLocation : pickupLocation;
  const pointB = hasPickedUp ? deliveryPersonLocation : deliveryLocation;

  // Avoid fitting to identical coordinates
  if (!pointA || !pointB || pointA.latitude === pointB.latitude && pointA.longitude === pointB.longitude) {
    console.warn('Skipping fitToCoordinates: identical or invalid points');
    return;
  }

  mapRef.fitToCoordinates([pointA, pointB], {
    edgePadding: {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    },
    animated: true,
  });
};
