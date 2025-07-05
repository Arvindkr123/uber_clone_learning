const LocationSearchPanel = ({ setVehiclePanelOpen }) => {
  const locations = [
    "Connaught Place, New Delhi, Delhi 110001, India",
    "Uttam Nagar, New Delhi, Delhi 110001, India",
    "Laxmi Nagar, New Delhi, Delhi 110001, India",
    "Karol Bag, New Delhi, Delhi 110001, India",
    "Nehru Place, New Delhi, Delhi 110001, India",
    "Anand Vihar, New Delhi, Delhi 110001, India",
    "Vasant Vihar, New Delhi, Delhi 110001, India",
    "Kashmeri Gate, New Delhi, Delhi 110001, India",
    "Ashok Vihar, New Delhi, Delhi 110001, India",
  ];
  return (
    <div className="space-y-4">
      {locations.map((location) => {
        return (
          <div
            onClick={() => setVehiclePanelOpen((prev) => !prev)}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-line text-xl"></i>
            </h2>
            <h4 className="font-medium">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};
export default LocationSearchPanel;
