
import { ParkedVehicle } from '@/interfaces'
import React from 'react'


type GroupParkedTableProps ={
    groupParkedVehicles:ParkedVehicle[] | null
    groupToShow: string
}

const GroupParkedTable = ({groupParkedVehicles,groupToShow}:GroupParkedTableProps) => {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                          licensePlateId
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                           vehicleType
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                           Lot Id
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                           ticketType
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                           name
                        </th>
                      </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-gray-800">
                      {groupParkedVehicles && groupParkedVehicles.length > 0 ? groupParkedVehicles.map((groupParkedVehicle) => (
                        <tr key={groupParkedVehicle.licensePlateId}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                            {groupParkedVehicle.licensePlateId}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{groupParkedVehicle.vehicleType}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{groupParkedVehicle.parkingLotId}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{groupParkedVehicle.vehicleType}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{groupParkedVehicle.name}</td>
                        </tr>
                      )) : 
                      <tr>
                       <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{groupToShow.length === 0 ? 'plese enter group' : 'no match results'}</td>
                       </tr>
                      }
                    </tbody> 
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupParkedTable