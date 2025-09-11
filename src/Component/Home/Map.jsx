import React, { useState } from 'react';

const Map = () => {
  const [activeService, setActiveService] = useState("Recovery");

  const services = ["Recovery", "Delivery", "Car Services", "Movers"];

  return (
    <div className="p-6">
      {/* Top Buttons */}
      <div className="flex justify-between mx-4 mb-4">
        <div className="flex gap-4">
          {services.map((service) => (
            <button
              key={service}
              onClick={() => setActiveService(service)}
              className={`px-4 py-2 rounded transition ${
                activeService === service
                  ? "bg-yellow-400 text-black"
                  : "border border-yellow-400"
              }`}
            >
              {service}
            </button>
          ))}
        </div>
<div className="bg-yellow-400 text-black rounded-full flex items-center font-semibold px-4 text-sm">
  <label htmlFor="">Sort By:</label>
 <select className='bg-transparent'>
          <option value="">Region</option>
        </select>
</div>
       
      </div>

      {/* Map */}
      <div className="w-full flex justify-center items-center p-4 rounded">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.64236278531!2d73.07320327479474!3d33.64051393936022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11a4d1a8d62fd41%3A0x1feebab68518189!2sCodesVista!5e0!3m2!1sen!2s!4v1753251776780!5m2!1sen!2s"
          width="100%"
          height="400"
          className="rounded-2xl"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Debug: Show selected service */}
      <p className="mt-4 text-center">
        Selected Service: <span className="font-bold">{activeService}</span>
      </p>
    </div>
  );
};

export default Map;
