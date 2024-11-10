import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import items from "../constants/index";

const Offers = () => {
  return (
   <div className="grid grid-cols-3  mx-auto my-24 gap-12 bg-blue-100 w-full h-screen px-20 pt-10">
    {
    items.OFFERS.map((offer, index) => {
      console.log(`${index}: ${offer.text}`);
      return (
        <div  key={index} className="flex flex-col gap-y-2 bg-white justify-center items-center border  shadow-lg rounded-lg ">
            <span className="p-4 mt-3 bg-[#FFC820] w-fit text-white rounded-lg text-2xl">
                <FontAwesomeIcon icon={offer.icon} color={offer.iconColor} ></FontAwesomeIcon>
            </span>
            <h3 className="text-2xl  text-white font-bold">{offer.text}</h3>
            <div className= "bg-[#1C8DCB] h-full w-full flex items-center justify-center  text-white">
            {offer.description} 
            </div>
        </div>
      )
     })   
    }
    </div>
  );
};

export default Offers;
