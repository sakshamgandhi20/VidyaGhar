import React, { useState, useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { doShowBooks, doDeleteBook } from '../Service/book-controller';

function ManageBooks() {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [email, setEmail] = useState({
    email: localStorage.getItem("userEmail")
  });

  async function doFetch() {
    console.log(email);
    var serverMsg = await doShowBooks();
    console.log(serverMsg.data);
    if (serverMsg.data.status === true) {
      if (serverMsg.data.result) {
        setData(serverMsg.data.result);
        console.log(serverMsg.data);
      } else {
        alert("No record");
      }
    } else {
      alert(serverMsg.data.err);
    }
  }

  async function deleteBook(bookPath) {
    var serverMsg = await doDeleteBook({ bookPath: bookPath });
    if (serverMsg.data.status === true) {
      alert("Book deleted");
      // Remove the deleted book from the state
      setData(data.filter(book => book.bookPath !== bookPath));
    } else {
      alert(serverMsg.data.err);
    }
  }

  function doEditBook(uId) {
    navigate(`/addbooks/${uId}`)
  }

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div>
      <div className="mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
        <div className="border-b border-gray-300 pb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold leading-6 text-gray-900 mx-auto">Books Manager</h2>
            <button
              type="button"
              onClick={() => navigate('/addbooks')}
              className="ml-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Book
            </button>
          </div>
        </div>
      </div>
      {data.length === 0 ?
        <div className="text-center px-4 bg-white">
          <img className="w-1/4 mx-auto card-rounded-bottom" alt="" src="./assests/emptycart.png" />
          <div className="py-7">
            <p className="text-dark-light fs-4 fw-bold">Sorry you have no book to sell</p>
            <a href="/addbooks" type="button" title="" className="btn bg-indigo-600 me-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Book</a>
          </div>
        </div>
        :
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">Image</th>
                      <th scope="col" className="px-6 py-4">Book Name</th>
                      <th scope="col" className="px-6 py-4">Standard</th>
                      <th scope="col" className="px-6 py-4">Price</th>
                      <th scope="col" className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <img src={`http://localhost:2005/uploadbook/${item.bookPath}`} alt='image' className="inline-flex mr-4 h-10 w-12 text-gray-300" aria-hidden="true"
                              onError={(e) => {
                                console.error('Error loading image:', e);
                                // Optionally, you can update the state or UI to indicate that the image failed to load.
                              }}></img>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">{item.bookName}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.standard}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.price}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <button
                              onClick={() => doEditBook(item.uId)}
                              className="font-medium text-red-500 hover:text-red-700"
                            >
                              <MdEdit className='w-6 h-6' />
                            </button>
                            <button
                              onClick={() => deleteBook(item.bookPath)}
                              className="font-medium text-red-500 hover:text-red-700"
                            >
                              <MdDeleteOutline className="w-6 h-6" />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>}
    </div>
  );
}

export default ManageBooks;
