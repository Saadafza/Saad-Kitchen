import React from 'react';

const Videotemp = () => {
  return (
    <video controls width="320" height="240">
      <source src="https://drive.google.com/file/d/14eovKSqYgVY-oQYHWRprhHJRP1XC2VMc/view?usp=drive_link.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Videotemp;
