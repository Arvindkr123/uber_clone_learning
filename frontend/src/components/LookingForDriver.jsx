import car1Img from "../assets/car1.png";
const LookingForDriver = ({setVehicleFound={setVehicleFound}}) => {
  return (
     <>
          <h5 className="p-1 text-center w-[93%] absolute top-0" onClick={()=>setVehicleFound(false)} >
            <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
          </h5>
          <h3 className="text-2xl font-semibold my-5">Looking for a driver</h3>
    
          <div className="flex gap-2 justify-between flex-col items-center">
            <img
              className="h-64"
            //   src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            src={car1Img}
              alt=""
            />
            <div className="w-full sm:w-1/2 mt-5">
              <div className="flex items-center gap-5 p-3 border-b-2">
                <i className="ri-map-pin-user-fill"></i>
                <div>
                  <h3 className="text-lg font-medium">562/11-A</h3>
                  <p className="text-sm -mt-1 text-gray-600">Uttar Pradesh</p>
                </div>
              </div>
              <div className="flex items-center gap-5 p-3 border-b-2">
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                  <h3 className="text-lg font-medium">562/11-A</h3>
                  <p className="text-sm -mt-1 text-gray-600">Delhi</p>
                </div>
              </div>
              <div className="flex items-center gap-5 p-3">
                <i className="ri-currency-line"></i>
                <div>
                  <h3 className="text-lg font-medium">₹ 193</h3>
                  <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
                </div>
              </div>
            </div>
            
          </div>
        </>
  )
}
export default LookingForDriver