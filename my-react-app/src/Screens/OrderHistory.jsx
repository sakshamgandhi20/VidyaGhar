import React, { useEffect, useState } from 'react'
import { doFetchOrdderHistory } from '../Service/history-controller'
import moment from 'moment-timezone' 

function OrderHistory() {
    const [historyData, setHistoryData] = useState([])

    async function fetchHistory() {
        var serverMsg = await doFetchOrdderHistory()
        if (serverMsg.data.status) {
            console.log(serverMsg.data.result)
            setHistoryData(serverMsg.data.result)
        }
    }
    useEffect(() => {
        fetchHistory();
    }, [])
    return (
        <>
            <div className="container mx-auto p-4 ">
                <div className='mb-4'>
                    <h1 className="text-2xl font-bold">Order History</h1>

                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
        {historyData.length === 0 ? (
          <p className="text-gray-700">Your History is Empty</p>
        ) : (
            <div>
                {historyData.map((itemsSet)=>(
                    <div className='mb-4'>
                    <h1 className="text-xl font-bold text-left">Date- {moment(itemsSet.date).tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm')}</h1>
                    <ul>
              {itemsSet.data.map((item, index) => (
                <li key={index} className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center">
                    <img
                      className="h-16 w-16 object-cover rounded"
                      src={`http://localhost:2005/uploadbook/${item.bookPath}`}
                      alt="product"
                    />
                    <div className="ml-4 text-left">
                      <h5 className="text-lg font-semibold">{item.bookName}</h5>
                      <div className='flex w-full flex-wrap'>
                      <p className="text-sm text-gray-700 w-1/2">Author: {item.authorName}</p>
                      <p className="text-sm text-gray-700 w-1/2">Category: {item.category}</p>
                      <p className="text-sm text-gray-700 w-1/2">Edition: {item.edition}</p>
                      <p className="text-sm text-gray-700 w-1/2">Seller Email: {item.sellerEmail}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ">
                    <p className="text-lg font-bold">{item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-4 border-b-2">
              <p className="text-lg font-semibold">Total Price: {itemsSet.totalPrice}</p>
            </div>
                    </div>
                ))}
                
            
            </div>
            
          
        )}
      </div>
        </>
    )
}

export default OrderHistory