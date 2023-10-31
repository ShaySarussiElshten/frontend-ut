
import { ParkedVehicle } from '@/interfaces'
import React from 'react'

type ParkingStatusTableProps ={
    parkedVehicles: ParkedVehicle[] | null
}


const renderRows = (parkedVehicles:ParkedVehicle[]) => {
    return parkedVehicles.map((item) => {
        const isOccupied = item.parkingLot.isOccupied
        return (
        <tr key={item.parkingLot.id}>
          <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
            <div className="flex items-center gap-x-4">
              <div className="truncate text-sm font-medium leading-6 text-white">{isOccupied ? item.licensePlateId : '---'}</div>
            </div>
          </td>
          <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
            <div className="flex gap-x-3">
              <div className="font-mono text-sm leading-6 text-gray-400">{isOccupied ?item.name : '---'}</div>
            </div>
          </td>
          <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
            <div className="flex items-center justify-end gap-x-2 sm:justify-start">
            <div className={`flex-none rounded-full ${isOccupied ? 'bg-rose-500/20' : 'bg-emerald-500/20'} p-1`}>
              <div className={`h-1.5 w-1.5 rounded-full ${isOccupied ? 'bg-rose-500' : 'bg-emerald-500'}`} />
            </div>
              <div className={'flex-none rounded-full p-1'}>
                <div className="h-1.5 w-1.5 rounded-full bg-current" />
              </div>
            </div>
          </td>
          <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
              {isOccupied ? item.parkingLotId : item.parkingLot.id}
           </td>
          <td className="hidden py-4 pr-2 text-sm leading-6 text-gray-400 md:table-cell ">
            {item.ticketType}
          </td>
        </tr>
)})}




const ParkingStatusTable = ({parkedVehicles}:ParkingStatusTableProps) => {
  return (
    <table className="mt-6 w-full whitespace-nowrap text-left">
          <colgroup>
            <col className="w-full sm:w-4/12" />
            <col className="lg:w-4/12" />
            <col className="lg:w-2/12" />
            <col className="lg:w-1/12" />
            <col className="lg:w-1/12" />
          </colgroup>
          <thead className="border-b border-white/10 text-sm leading-6 text-white">
            <tr>
              <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                Plate Id
              </th>
              <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
                Name
              </th>
              <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
                Status
              </th>
              <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
                parking spot
              </th>
              <th scope="col" className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">
                ticket type
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {parkedVehicles && renderRows(parkedVehicles)}
          </tbody>
        </table>
  )
}

export default ParkingStatusTable