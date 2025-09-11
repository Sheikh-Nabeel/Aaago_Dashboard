import React from 'react';

const LiveLocation = () => {
  return (
    <div className="w-full h-[700px]">
      <iframe
       title="Google Map with Zoom"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.64236278531!2d73.07320327479474!3d33.64051393936022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11a4d1a8d62fd41%3A0x1feebab68518189!2sCodesVista!5e0!3m2!1sen!2s!4v1753601036017!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
       
      ></iframe>
    </div>
  );
};

export default LiveLocation;
