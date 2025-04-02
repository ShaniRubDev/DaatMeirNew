export interface AnnouncementsModel {
  title: string;
  content: string;
  startDate: Date,
  endDate: Date,
  isActive: boolean
}

export interface AnnouncementsModelFromService {
    id:number
    title: string;
    content: string;
    startDate: Date,
    endDate: Date,
    isActive: boolean
  }