import { RiCustomerService2Fill } from "react-icons/ri";
import { MdEmail, MdLocationOn } from "react-icons/md";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";

const ContactForm = () => {
  return (
    <section className="text-center py-24 px-4 sm:px-8 md:px-24" id="contact">
      <h1>Contact Us</h1>
      <div className="line"></div>
      <div className="flex gap-7 my-9 flex-col md:flex-row">
        <Card className="flex flex-col justify-center items-center w-full gap-3 px-4">
          <span className="text-[#e12454] text-7xl">
            <RiCustomerService2Fill />
          </span>
          <h4>Call Us</h4>
        </Card>
        <Card className="flex flex-col justify-center items-center w-full py-7 gap-3 px-4">
          <span className="text-[#e12454] text-7xl">
            <MdEmail />
          </span>
          <h4>Email Us</h4>

          {/* <a href="mailto:info@capitalspringsbank.com">
            info@capitalspringsbank.com
          </a> */}
        </Card>
        <Card className="flex flex-col justify-center items-center w-full py-7 gap-3 px-4">
          <span className="text-[#e12454] text-7xl">
            <MdLocationOn />
          </span>
          <h4>Location</h4>
        </Card>
      </div>
      <p className="mt-10 font-medium text-xl mb-3">Write us a message</p>
      <form className="space-y-5">
        <div className="flex gap-5 flex-col md:flex-row">
          <Input type="text" placeholder="Your Name" />
          <Input type="email" placeholder="Your Email" />
        </div>
        <div className="flex gap-5 flex-col md:flex-row">
          <Input type="text" placeholder="Your Phone Number" />
          <Input type="text" placeholder="Subject" />
        </div>
        <Textarea placeholder="Your Message" className="h-48"></Textarea>
        <button
          type="submit"
          className="mt-5 p-4 text-white rounded-md block mx-auto bg-[#e12454]"
        >
          SEND MESSAGE
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
