import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { doSaveUserProfile, doSearchUserProfile, doUpdateeUserProfile } from '../Service/profile-controller';

function Profile() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: localStorage.getItem("userEmail"),
    name: "",
    address: "",
    mobile: null,
    village: "",
  });
  const [btn, setbtn] = useState("Save")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function doSaveUpdate() {
    if (btn === 'Save')
      doSave()
   else doUpdate()
  }

  async function doSave() {

    var serverMsg = await doSaveUserProfile(formData);
    if (serverMsg.data.status === true)
      alert("Profile saved....");
    else
      alert(serverMsg.data.err);
    navigate('/')
  }

  async function doSearch() {


    var serverMsg = await doSearchUserProfile()
    if (serverMsg.data.status === true) {
      if (serverMsg.data.result != null) {
        console.log(JSON.stringify(serverMsg.data.result))
        setFormData(serverMsg.data.result);
        setbtn("Update")
      }


    }
    else
      alert(serverMsg.data.err);
  }

  async function doUpdate() {
    var serverMsg = await doUpdateeUserProfile(formData);
    if (serverMsg.data.status === true)
      alert("updated.....")
    else
      alert(serverMsg.data.err);
    navigate('/')
  }

  useEffect(() => {
    doSearch();
  }, []);
  return (
    <>
      <form className="max-w-3xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
        <div className="space-y-8">
          {/* Profile Section */}
          <div className="border-b border-gray-300 pb-8">
            <h2 className="text-lg font-semibold leading-6 text-gray-900 mb-4">Profile</h2>

          </div>

          {/* Personal Information Section */}
          <div className="text-left border-b border-gray-300 pb-8">
            <h2 className="text-lg font-semibold leading-6 text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
              {/* Name */}
              <div className="md:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="mt-1 block w-full border-b-2 border-black-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Mobile */}
              <div className="md:col-span-3">
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-900">Mobile number</label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  autoComplete="tel"
                  className="mt-1 block w-full border-b-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>

              {/* Address */}
              <div className="md:col-span-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-900">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  autoComplete="street-address"
                  className="mt-1 block w-full border-b-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>



              {/* Village/City */}
              <div className="md:col-span-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-900">Village/Town/City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="mt-1 block w-full border-b-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>




            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="rounded-md text-sm font-semibold leading-6 text-gray-900 hover:bg-red-600">
            Cancel
          </button>
          {/* <button
          type="button"
          onClick={doUpdate}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update
        </button> */}
          <button
            type="button"
            onClick={doSaveUpdate}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {btn}
          </button>
        </div>
      </form>
    </>
  )
}

export default Profile
