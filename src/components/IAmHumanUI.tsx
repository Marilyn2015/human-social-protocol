
import { useState } from 'react';

export default function IAmHumanUI() {
  const [verified, setVerified] = useState(false);

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* GLITCH TITLE */}
      <h1 className="glitch text-6xl md:text-8xl font-extrabold tracking-widest text-center z-10">
        I AM HUMAN
        <span aria-hidden="true">I AM HUMAN</span>
        <span aria-hidden="true">I AM HUMAN</span>
      </h1>

      {/* CTA BUTTON */}
      <button
        onClick={() => setVerified(true)}
        className="mt-12 px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition duration-300 z-10"
      >
        {verified ? '✅ Verified' : 'GET STARTED'}
      </button>

      <style jsx>{`
        .glitch {
          position: relative;
          line-height: 1.1;
        }
        .glitch span {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          clip-path: inset(0);
          animation: glitch 2.5s infinite;
        }
        .glitch span:nth-child(2) {
          color: #ff004d;
          clip-path: inset(0 0 66% 0);
          animation-delay: -0.4s;
        }
        .glitch span:nth-child(3) {
          color: #00d9ff;
          clip-path: inset(66% 0 0 0);
          animation-delay: -0.8s;
        }
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-2px, 2px); }
          20% { transform: translate(2px, -2px); }
          30% { transform: translate(-2px, -2px); }
          40% { transform: translate(2px, 2px); }
          50% { transform: translate(-1px, 1px); }
          60% { transform: translate(1px, -1px); }
          70% { transform: translate(-1px, -1px); }
          80% { transform: translate(1px, 1px); }
          90% { transform: translate(-0.5px, 0.5px); }
        }
      `}</style>
    </div>
  );
}
