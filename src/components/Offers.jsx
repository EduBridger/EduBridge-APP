import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import items from "../constants/index";

const Offers = () => {
  return (
   <div className="grid grid-cols-3  mx-auto my-24 gap-12 bg-blue-100 w-full h-screen px-20 pt-10">
    {
    items.OFFERS.map((offer, index) => {
      console.log(`${index}: ${offer.text}`);
      return (
        <div  key={index} className="flex flex-col gap-y-2 bg-white justify-center items-center border  shadow-lg rounded-lg h-[300px]">
            <span className="p-4  bg-[#FFC820] w-fit text-white rounded-lg text-2xl">
                <FontAwesomeIcon icon={offer.icon} color={offer.iconColor} ></FontAwesomeIcon>
            </span>
            <h3 className="text-2xl  text-[rgba(8,42,88,0.9)] font-bold">{offer.text}</h3>
            <h3 className= "bg-[rgba(8,42,88,0.9)] h-full mt-7 w-full flex items-center justify-center  text-white p-5">
            {offer.description} 
            </h3>
        </div>
      )
     })   
    }
    </div>
  );
};

export default Offers;
