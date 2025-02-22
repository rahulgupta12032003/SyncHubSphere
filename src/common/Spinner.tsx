// import React from "react";

// const Spinner = () => {
//   return (
//     <div>
//       <div className={`ti-spinner`} role="status" key={Math.random()}>
//         <span className="sr-only">Loading...</span>
//       </div>
//     </div>
//   );
// };

// export default Spinner;
import React from "react";

interface SpinnerProps {
  size: number;
}
const Spinner: React.FC<SpinnerProps> = ({ size }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`border-t-4 border-b-4 border-blue-500 border-t-transparent rounded-full w-${size} h-${size} animate-spin`}
      ></div>
    </div>
  );
};

export default Spinner;
