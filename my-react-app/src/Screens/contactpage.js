import React from "react";
import Footer from "../components/Footer";

const Contactpage = () => {
  return (
    <>
      {/* <Navbar /> */}

      <div className="text-center py-8">
        <p className="text-lg font-semibold">
          For any enquiry - Fill in the below form and we will contact you...
        </p>
      </div>

      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <form action="action_page.php" className="space-y-6">
          <div>
            <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="fname"
              name="firstname"
              placeholder="Your name.."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="lname" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              name="lastname"
              placeholder="Your last name.."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <textarea
              id="subject"
              name="subject"
              placeholder="Write something.."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          <div>
            <input
              type="submit"
              value="Submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            />
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Contactpage;
