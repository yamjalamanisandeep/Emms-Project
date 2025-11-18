// import React, { useEffect, useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

//  const Home = () => {
//   const [username, setUsername] = useState('');
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate(); // for navigation

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setUsername(user.user_id); // or use emp_codeno
//     }

//     // Close dropdown on click outside
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/'); // assumes login is at / route
//   };

//   const handleChangePassword = () => {
//     navigate('/home/change-password'); // assumes route exists
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="bg-[#2e5d95] text-white flex justify-between items-center px-6 py-3 shadow relative">
//         <Link to="/">
//           <div className="text-lg font-semibold">Home</div>
//         </Link>
//         <div className="text-xl font-bold">Head of Division</div>
        
//         <div className="relative" ref={dropdownRef}>
//           <button
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             className="text-sm font-semibold focus:outline-none"
//           >
//             {username} ▾
//           </button>
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
//               <button
//                 onClick={handleChangePassword}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Change Password
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Body */}
//       <div className="p-6">
//         <div className="flex justify-start gap-4 mb-6">
//           <button className="bg-[#2e5d95] text-white px-4 py-2 font-semibold rounded shadow hover:bg-blue-800">
//             Create Project Request
//           </button>
//         </div>

//         <hr className="border-dashed border-t-2 border-[#2e5d95] mb-6" />

//         <div className="flex justify-center">
//           <button className="bg-[#2e5d95] text-white px-4 py-2 font-semibold rounded shadow hover:bg-blue-800">
//             Requested Service
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleCreateProjectClick = () => {
    navigate('/home/reqform');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Body */}
      <div className="p-6">
        <div className="flex justify-start gap-4 mb-6">
          <button
            onClick={handleCreateProjectClick}
            className="bg-[#2e5d95] text-white px-4 py-2 font-semibold rounded shadow hover:bg-blue-800"
          >
            Create Project Request
          </button>
        </div>

        <hr className="border-dashed border-t-2 border-[#2e5d95] mb-6" />

        <div className="flex justify-center">
          <button className="bg-[#2e5d95] text-white px-4 py-2 font-semibold rounded shadow hover:bg-blue-800">
            Requested Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

