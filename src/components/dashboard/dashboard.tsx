/* eslint-disable @typescript-eslint/no-explicit-any */
 // src/components/Dashboard.tsx
 import React from "react";
 import { useNavigate } from "react-router-dom";
 import "./Dashboard.css";
import { services } from "../../utils/constants";

 
 const Dashboard: React.FC = () => {
   const navigate = useNavigate();
 
   const handleServiceClick = (service: any) => {
     navigate(`${service.serviceRoute}`);
   };
 
   return (
     <div className="dashboard">
       <h1>Services Dashboard</h1>
       <div className="services-container">
         {services.map((service) => (
           <div
             key={service.id}
             className="service-card"
             onClick={() => handleServiceClick(service)}
           >
             <h2>{service.serviceName}</h2>
           </div>
         ))}
       </div>
     </div>
   );
 };
 
 export default Dashboard; 