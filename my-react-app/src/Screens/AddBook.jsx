import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { doSaveBookDetails, doSerachBookDetail, doUpdateBookDetails } from '../Service/book-controller';

function AddBook() {
    let navigate = useNavigate();
    const { uId } = useParams();
    const [formData, setFormData] = useState({
        uId: uuidv4(),
        email: localStorage.getItem("userEmail"),
        bookName: "",
        standard: "",
        edition: "",
        authorName: "",
        status: true,
        price: null,
        bookPic: null
    });
    const [btn, setbtn] = useState('Publish')
    const [path, setPath] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (uId)
            doSearch(uId)
    }, [uId])

    const handleFileChange = (e) => {
        setFormData({ ...formData, ["bookPic"]: e.target.files[0] });
        const [file] = e.target.files;
        setPath(URL.createObjectURL(file));
    };

    async function doPublish() {
        // console.log(formData)
        var bookData = new FormData();
        for (var prop in formData) {
            bookData.append(prop, formData[prop]);
        }
        var serverMsg = await doSaveBookDetails(bookData);
        if (serverMsg.data.status === true) {
            alert("saved....");
            navigate('/managebook')
        }
        else
            alert(serverMsg.data.err);
    }

    async function doSearch(obj) {
        var serverMsg = await doSerachBookDetail(obj)
        if (serverMsg.data.status == true) {
            if (serverMsg.data.result != null) {
                console.log(JSON.stringify(serverMsg.data.result))
                setFormData(serverMsg.data.result);
                setbtn("Update")
                setPath(`http://localhost:2005/uploadbook/${serverMsg.data.result.bookPath}`)
            }
        }
        else
            alert(serverMsg.data.err);
    }

    async function doUpdate() {
        // console.log(formData);
        //   //  console.log(path);
        console.log(formData);
        var bookData = new FormData();
        for (var prop in formData) {
            bookData.append(prop, formData[prop]);
        }
        var serverMsg = await doUpdateBookDetails(bookData);
        if (serverMsg.data.status === true)
            alert("updated.....")
        else
            alert(serverMsg.data.err);
    }

    function ShowPic() {
        return (
            <>
                {path ?
                    <img src={path} alt='image' className="w-40 h-40" aria-hidden="true"
                        onError={(e) => {
                            console.error('Error loading image:', e);
                        }} />
                    :
                    <FontAwesomeIcon icon={faImage} className='w-40 h-40' style={{ color: "#4f46e5" }} />
                }
            </>
        );
    }

    return (
        <form className="max-w-3xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
            <div className="space-y-8">
                {/* Profile Section */}
                <div className="border-b border-gray-300 pb-8">
                    <h2 className="text-lg font-semibold leading-6 text-gray-900 mb-4">Add Book</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
                        {/* email */}
                        {/* <div className="md:col-span-3">
                            <label htmlFor="username" className="text-left block text-sm font-medium text-gray-900">Email</label>
                            <div className="mt-1 max-w-[350px] rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    className="flex-1 block w-full min-w-0 max-w-[350px] border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* product details Section */}
                <div className="border-b border-gray-300 pb-8">
                    <h2 className="text-lg font-semibold leading-6 text-gray-900 mb-4">Book Details</h2>
                    <div className="text-left grid grid-cols-1 gap-6 md:grid-cols-6">
                        <div className="md:col-span-2">
                            {/* bookName */}
                            <div className="md:col-span-2">
                                <label htmlFor="bookName" className="block text-sm font-medium text-gray-900">Book Name</label>
                                <input
                                    type='text'
                                    id="bookName"
                                    name="bookName"
                                    autoComplete="on"
                                    className="mt-1 block w-full border-b-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={formData.bookName}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* standard */}
                            <div className="md:col-span-2 mt-3">
                                <label htmlFor="standard" className="block text-sm font-medium text-gray-900">Standard</label>
                                <input
                                    id="standard"
                                    name="standard"
                                    autoComplete="on"
                                    className="mt-1 block w-full border-b-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={formData.standard}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* edition */}
                            <div className="md:col-span-6 mt-3">
                                <label htmlFor="edition" className="block text-sm font-medium text-gray-900">Edition</label>
                                <input
                                    type="text"
                                    name="edition"
                                    id="edition"
                                    autoComplete="on"
                                    className="mt-1 block max-w-72 w-full border-b-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={formData.edition}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* authorName */}
                            <div className="md:col-span-6 mt-3">
                                <label htmlFor="authorName" className="block text-sm font-medium text-gray-900">Author Name</label>
                                <input
                                    type="text"
                                    name="authorName"
                                    id="authorName"
                                    autoComplete="on"
                                    className="mt-1 block max-w-72 w-full border-b-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={formData.authorName}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* price */}
                            <div className="md:col-span-6 mt-3">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-900">Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    id="price"
                                    autoComplete="on"
                                    className="mt-1 block max-w-72 w-full border-b-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>


                        </div>
                        {/* product pic */}
                        <div className="flex justify-center flex-col items-center md:col-span-3">
                            <ShowPic />
                            {/* book pic button */}
                            <div className="flex items-center justify-center md:col-span-3 mt-4">
                                <label className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Upload Pic
                                    <input
                                        type="file"
                                        id="photo"
                                        name="bookPic"
                                        className="sr-only"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Buttons */}
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="rounded-md text-sm font-semibold leading-6 text-gray-900 hover:bg-red-600">
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={doPublish}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {btn}
                </button>
            </div>
        </form>
    );
}

export default AddBook;
