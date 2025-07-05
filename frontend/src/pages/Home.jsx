import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmVehicle from "../components/ConfirmVehicle";
import WaitForDriver from "../components/WaitForDriver.jsx";
import LookingForDriver from "../components/LookingForDriver.jsx";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmPanelRide, setConfirmPanelRide] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const panelRef = useRef(null);
  const closePanelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmVehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.set(panelRef.current, { display: "block" });
      gsap.to(panelRef.current, {
        height: "70%",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(closePanelRef.current, {
        opacity: 1,
        duration: 0.3,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        opacity: 0,
        duration: 0.3,
        onComplete: () => gsap.set(panelRef.current, { display: "none" }),
      });
      gsap.to(closePanelRef.current, {
        opacity: 0,
        duration: 0.3,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.inOut",
        height:'100%'
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [vehiclePanelOpen]);
  useGSAP(() => {
    if (confirmPanelRide) {
      gsap.to(confirmVehiclePanelRef.current, {
        transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.inOut",
        height:'100%'
      });
    } else {
      gsap.to(confirmVehiclePanelRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [confirmPanelRide]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.inOut",
        height:'100%'
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [vehicleFound]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt=""
      />

      {/* for map */}
      <div className="w-screen h-screen">
        <img
          className="w-full h-full object-cover"
          src="https://imgs.search.brave.com/Ra6Nw9cgxRgAvBMrlrslYFc-TAcft_eZErwlEbCMcB8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMucmViZWxtb3Vz/ZS5pby9leUpoYkdj/aU9pSklVekkxTmlJ/c0luUjVjQ0k2SWtw/WFZDSjkuZXlKcGJX/Rm5aU0k2SW1oMGRI/QnpPaTh2WVhOelpY/UnpMbkppYkM1dGN5/ODFNak0xTlRFeE9T/OXZjbWxuYVc0dWFu/Qm5JaXdpWlhod2FY/SmxjMTloZENJNk1U/YzJNRGt3TkRRMk9I/MC5DVkVRVEZjS2pG/Y3VNZnNWRk5WUWl6/aUJCY0ZTYmlvWS1r/cFRjRnNrMUx3L2lt/Zy5qcGc_d2lkdGg9/MTIwMCZoZWlnaHQ9/ODAwJnF1YWxpdHk9/ODUmY29vcmRpbmF0/ZXM9MCwwLDAsMA"
          alt=""
        />
      </div>

      {/* for search destination to from */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] sm:h-[20%] p-6 sm:p-10 bg-white relative">
          <h5
            ref={closePanelRef}
            onClick={() => {
              setPanelOpen(false);
              setVehiclePanelOpen(false);
            }}
            className="absolute opacity-0 top-10 right-4 sm:right-48 text-3xl cursor-pointer "
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold my-2">Find a Trip</h4>
          <form
            onClick={(e) => onSubmitHandler(e)}
            className="flex flex-col sm:flex-row sm:gap-10"
          >
            {/*  Line for Mobile Screen  */}
            <div className="flex sm:hidden line absolute bg-gray-700 h-16 w-1 top-[53%] left-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-1 bg-white"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-1 bg-white"></div>
            </div>

            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full sm:w-[40%] mt-5 sm:mt-0"
              value={pickup}
              onClick={() => setPanelOpen(true)}
              onChange={(e) =>
                setPickup(e.target.value) && setVehiclePanelOpen(false)
              }
              type="text"
              placeholder="Enter pick up location "
            />
            {/* Line with dots */}
            <div className="hidden sm:flex absolute left-[44%] xl:left-[42%] top-26 -translate-x-1/2 bg-gray-700 h-1 w-16">
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full border border-gray-400"></div>
              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full border border-gray-400"></div>
            </div>

            <input
              type="text"
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full sm:w-[40%] mt-3 sm:mt-0"
              onClick={() => setPanelOpen(true)}
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setVehiclePanelOpen(false);
              }}
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-[0] p-5">
          <LocationSearchPanel setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
      </div>

      {/* for vehicles select */}
      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bottom-0 p-3 bg-white w-full"
      >
        <VehiclePanel setVehiclePanelOpen={setVehiclePanelOpen} setConfirmPanelRide={setConfirmPanelRide} />
      </div>

      {/* for confirm  vehicles select */}
      <div
        ref={confirmVehiclePanelRef}
        className="fixed z-10 bottom-0 p-3 bg-white w-full translate-y-full"
      >
        <ConfirmVehicle setVehicleFound={setVehicleFound} setConfirmPanelRide={setConfirmPanelRide} />
      </div>

      {/* looking for driver */}
      <div
        ref={vehicleFoundRef}
        className="fixed z-10 bottom-0 p-3 bg-white w-full translate-y-full"
      >
        <LookingForDriver setVehicleFound={setVehicleFound}  />
      </div>

    </div>
  );
};
export default Home;
