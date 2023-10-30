
import { MassageParkedVehicleResponse } from '@/interfaces'
import React from 'react'


type CardVehicleInfoProps ={
    vehicleInfo:MassageParkedVehicleResponse | null
}

const CardVehicleInfo = ({vehicleInfo}:CardVehicleInfoProps) => {
  return (
    <>
      {vehicleInfo && vehicleInfo.success && <ul role="list" className="flex justify-center mt-10">
        <li key={vehicleInfo.data.parkingLotId} className="overflow-hidden rounded-xl border border-gray-200">
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-400">license Plate Id</dt>
              <dd className="font-medium text-gray-100">
                 { vehicleInfo.data.licensePlateId }
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-300">vehicle Type</dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-100">{vehicleInfo.data.vehicleType}</div>
                
              </dd>
            </div>
          </dl>
        </li>
    </ul>}
    {
      vehicleInfo && !vehicleInfo.success && 
      <div className='flex justify-center mt-10'>
        <h1 className="text-gray-300">we are not found such plate id</h1>
      </div>

    }
    </>
  )
}

export default CardVehicleInfo