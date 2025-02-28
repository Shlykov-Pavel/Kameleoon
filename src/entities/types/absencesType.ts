type EditingAbsenceType = {
  description: string;
  startDate: string;
  endDate: string;
  value: number;
}

export interface AbsenceUpdate {
  id:string;
  editingAbsence: EditingAbsenceType
}

export interface AbsenceChangeStatus {
  absenceId:string;
  approve: string
}

export interface IAbsence {
    description: string,
    startDate: string,
    endDate: string,
    value: number,
    absenceTypeId: string,
    userId: string
} 

