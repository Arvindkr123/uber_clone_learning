import car1Img from "../assets/car1.png";
const VehiclePanel = ({ setConfirmPanelRide, setVehiclePanelOpen }) => {
  return (
    <>
      <h5
        className="p-1 text-center w-[93%]"
        onClick={() => setVehiclePanelOpen(false)}
      >
        <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[80vh] overflow-y-auto">
        {Array.from({ length: 10 }).map((car, index) => (
          <div
            onClick={() => setConfirmPanelRide(true)}
            className="flex flex-col sm:flex-row justify-between p-3 border-2 border-black rounded-xl mb-2 cursor-pointer last:mb-5"
          >
            <img className="hidden sm:flex sm:h-36" src={car1Img} alt="" />
            <div className="w-1/2">
              <h4 className="font-medium text-lg">
                UberGo{" "}
                <span>
                  <i className="ri-user-3-fill"></i>4
                </span>
              </h4>
              <h5 className="font-medium text-lg">2 mins away</h5>
              <p className="font-medium text-lg text-gray-600">
                affordable, compact ride
              </p>
            </div>
            <h2 className="text-2xl font-semibold">₹193.20</h2>
            <img className="h-[50%] sm:hidden" src={car1Img} alt="" />
          </div>
        ))}
      </div>
    </>
  );
};
export default VehiclePanel;
