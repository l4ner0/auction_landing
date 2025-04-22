import type { IEventLItem } from './Event'
import type { Organization } from '~/models/organizations'
import type { BidDto } from './Bids'
export interface OfferListItem {
  id: string;
  title: string;
  carModel: Model;
  year: number;
  initialValue: number;
  description: string;
  address: Address;
  appraisal: number;
  annexesFiles: AnnexesFile[];
  attachedFiles: AttachedFile[];
  status: OfferStatus;
  endTime?: string
  createdAt: string;
  updatedAt: string;
}
export interface OfferDto {
  id: string
  title: string
  carModel: Model
  carBrand: Brand
  year: number
  initialValue: number
  description: string
  address: Address
  appraisal: number
  counterProposalAmount?: any
  annexesFiles: AnnexesFile[]
  attachedFiles: AttachedFile[]
  status: OfferStatus
  endTime?: string
  createdAt: string
  updatedAt: string
  event?: IEventLItem
  organization: Organization
  bids: BidDto[]
  organizationId: string
  eventId?: string
}
export interface OfferItem {
  id: string;
  title: string;
  carModel: Model;
  year: number;
  initialValue: number;
  description: string;
  address: Address;
  appraisal: number;
  annexesFiles: AnnexesFile[];
  attachedFiles: AttachedFile[];
  status: OfferStatus;
  createdAt: string;
  updatedAt: string;
}

export enum OfferStatus {
  Retired = "RETIRED", // Retirado
  Confirmed = "CONFIRMED", // Confirmado
  New = "NEW", // Nuevo
  Debated = "DEBATED", // Debadito
  Cancelled = "CANCELLED", // Cancelado
  Rejected = "REJECTED", // Rechazado
}
export interface Model {
  id: string;
  name: string;
  brand: Brand;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Address {
  addressLine1: string;
  district: District;
  latitude: number;
  longitude: number;
}

export interface District {
  id: string;
  name: string;
  city: City;
}

export interface City {
  id: string;
  name: string;
  state: State;
}

export interface State {
  id: string;
  name: string;
}

export interface AnnexesFile {
  id: string;
  name: string;
  path: string;
}

export interface AttachedFile {
  id: string;
  name: string;
  path: string;
}

export interface IDebateForm {
  id: string;
  name: string;
  appraisal: number;
}

export interface IAmountHistoryModal {
  offerId: string;
}
export interface IChangeAppraisalForm {
  offerId: string;
  offerName: string;
  oldAppraisal: number;
  newAppraisal: number;
}
