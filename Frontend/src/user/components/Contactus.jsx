import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail, MdMessage } from "react-icons/md";

export default function Contactus() {
  return (
    <div className="bg-gray-100 min-h-screen py-12 flex flex-col items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 justify-center py-8 md:gap-24 bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <FaPhoneAlt className="text-xl text-blue-500" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-gray-600">+91 9737080195</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <MdOutlineEmail className="text-xl text-blue-500" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-gray-600">dixitdesai809@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <MdMessage className="text-xl text-blue-500" />
            <div>
              <p className="font-medium">Address</p>
              <p className="text-gray-600">Nikol Naroda Road</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-12 mt-8">
          <form className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-semibold mb-4 text-center text-blue-500">
              Contact Us
            </h1>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your name :-"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email :-"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Your Address :-"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                ></textarea>
              </div>
              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
          <div className="w-full lg:w-1/2 h-64 md:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29370.761108803752!2d72.65020868550309!3d23.047804906308265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e86d53c2ed683%3A0x161958a4f45e809a!2sNikol%2C%20Ahmedabad%2C%20Gujarat%20380038!5e0!3m2!1sen!2sin!4v1721665503703!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>

    
  );
}
