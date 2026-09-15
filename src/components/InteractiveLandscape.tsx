import React, { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function InteractiveLandscape() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // We only want to load the scripts once the component is mounted
  return (
    <>
      {/* Shader required by demo1.js */}
      <script id="custom-vertex" type="x-shader/x-vertex" dangerouslySetInnerHTML={{
        __html: `
          uniform vec3 fogColor;
          uniform float fogNear;
          uniform float fogFar;
          varying float fogDepth;

          void main(){
            vec2 stripPos = vec2( 0.0, vDisplace );
            vec4 stripColor = texture2D( pallete, stripPos );
            stripColor *= pow(1.0-vDisplace, 1.0);

            gl_FragColor = stripColor;

            #ifdef USE_FOG
              float fogFactor = smoothstep( fogNear, fogFar, fogDepth );
              gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
            #endif
          }
        `
      }} />

      <canvas ref={canvasRef} className="landscape absolute inset-0 w-full h-full object-cover" />

      {/* Load all required scripts in order */}
      <Script src="/landscape/js/vendor/three.min.js" strategy="lazyOnload" />
      <Script src="/landscape/js/vendor/Sky.js" strategy="lazyOnload" />
      <Script src="/landscape/js/vendor/hammer.min.js" strategy="lazyOnload" />
      <Script src="/landscape/js/vendor/charming.min.js" strategy="lazyOnload" />
      <Script src="/landscape/js/vendor/TweenMax.min.js" strategy="lazyOnload" />
      <Script 
        src="/landscape/js/demo1.js" 
        strategy="lazyOnload"
        onLoad={() => {
          console.log("Landscape demo loaded!");
        }}
      />
      
      {/* Overlay gradient to blend into the rest of the site */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-[#060606]/40 pointer-events-none" />
    </>
  );
}
