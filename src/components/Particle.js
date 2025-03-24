import React from "react";
import Particles from "react-tsparticles";

function Particle() {
  return (
    <Particles
      id="tsparticles"
      params={{
        particles: {
          number: {
            value: 600,
            density: {
              enable: true,
              value_area: 1500,
            },
          },
          line_linked: {
            enable: false,
            opacity: 0.03,
          },
          move: {
            direction: "right",
            speed: 0.05,
          },
          size: {
            value: 1,
          },
          opacity: {
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.05,
            },
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "attract", // This makes particles move towards the cursor
            },
            onclick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            push: {
              particles_nb: 1,
            },
            attract: { // Attract particles to cursor
              distance: 200, // The distance within which particles will be attracted to the cursor
              duration: 0.4, // Duration of the attract effect
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
}

export default Particle;
