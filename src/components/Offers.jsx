import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import items from "../constants/index";


const Offers = () => {
  return (
   <div className="grid grid-cols-3  mx-auto my-24 gap-12 bg-blue-100 w-full h-[500px] px-20 pt-10">
    {
    items.OFFERS.map((offer, index) => {
      console.log(`${index}: ${offer.text}`);
      return (
        <div  key={index} className="flex flex-col gap-y-2 bg-white justify-center items-center border  shadow-lg rounded-lg h-[460px]">
            <span className="p-4 mt-10 bg-[#FFC820] w-fit text-white rounded-lg text-2xl">
                <FontAwesomeIcon icon={offer.icon} color={offer.iconColor} ></FontAwesomeIcon>
            </span>
            <h3 className="text-2xl  text-[rgba(8,42,88,0.9)] font-bold">{offer.text}</h3>
            <h3 className= "bg-[rgba(8,42,88,0.9)] h-full mt-20 w-full flex items-center justify-center  text-white p-5">
            {offer.description} 
            </h3>
        </div>
      )
     })   
    }


 {/* Additional Features Section */}
 <div className="mt-16 md:mt-24 text-white text-center">
          {/* <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">Why Choose EETS?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-lg p-6 transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-200">{feature.description}</p>
              </div>
            ))}
          </div> */}
        </div>
        {/* Features */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg p-6 md:p-8 text-center transform hover:scale-105 transition duration-300 shadow-xl">
            <FaGraduationCap className="text-4xl md:text-5xl text-[rgba(8,42,88,0.9)] mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Student Portal</h3>
            <p className="text-gray-600">Access your courses, track progress, and manage assignments with ease</p>
          </div>

          <div className="bg-white rounded-lg p-6 md:p-8 text-center transform hover:scale-105 transition duration-300 shadow-xl">
            <FaChalkboardTeacher className="text-4xl md:text-5xl text-[rgba(8,42,88,0.9)] mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Teacher Dashboard</h3>
            <p className="text-gray-600">Manage classes, grade assignments, and track student performance</p>
          </div> */}

          {/* <div className="bg-white rounded-lg p-6 md:p-8 text-center transform hover:scale-105 transition duration-300 shadow-xl">
            <FaBook className="text-4xl md:text-5xl text-[rgba(8,42,88,0.9)] mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Course Management</h3>
            <p className="text-gray-600">Organize and access course materials efficiently and effectively</p>
          </div> */}
           {/* <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div> */}
        </div>


    
  );
};

export default Offers;
