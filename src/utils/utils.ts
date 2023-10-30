import { VehicleCheckIn } from "@/interfaces";

export const isValid = (errors:Partial<VehicleCheckIn>) => Object.values(errors).every(x => x === "");