import React from "react";

const Learnmore = () => {
  return (
   
      <div className="flex-col overflow-hidden p-14 text-gray bg-gray-100 ">
        <div className=" flex flex-row justify-between items-center m-9  p-5  shadow-lg rounded-lg bg-white cursor-pointer hover:bg-blue-100"  >
          <img
            src="src/assets/images/Dashboard.jpg"
            alt="Dashboard"
            style={{ width: "120px" }}
          />
          <div className=" text-center ">
            <h2 className="text-2xl font-bold mb-4">
              Comprehensive Dashboard :
            </h2>
            <p className="text-lg font-semibold">
              Access patient histories, schedules, and communications all in
              one user-friendly dashboard, designed to enhance decision-making
              and efficiency
            </p>
          </div>
        </div >
        <div className=" flex justify-between items-center m-9  p-5 rounded-lg shadow-lg mb-5 bg-white cursor-pointer hover:bg-blue-100">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Real-time Collaboration Tools :
            </h2>
            <p className="text-lg font-semibold">
              Chat and collaborate securely with your patients directly through
              our app, providing immediate support and guidance for their health
              concerns
            </p>
          </div>
          <img
            src="src/assets/images/Collaboration.png"
            alt="Collaboration"
            style={{ width: "120px" }}
          />
        </div>
        <div className=" flex flex-row justify-between items-center m-9  p-5 rounded-lg shadow-lg bg-white cursor-pointer hover:bg-blue-100">
          <img
            src="src/assets/images/Notifications.png"
            alt="Notifications"
            style={{ width: "120px" }}
          />
          <div className="text-center ">
            <h2 className="text-2xl font-bold mb-4">
              Customizable Notifications and Alerts:
            </h2>
            <p className="text-xl font-semibold">
              Keep informed with tailored alerts and notifications for
              appointments, and patient updates, ensuring you never miss
              critical information
            </p>
          </div>
        </div>
      </div>
  
  );
};

export default Learnmore;
