export type EmployeeLifecycleStatus = 'REGISTERED' | 'DOCUMENT_REVIEW' | 'MOLS_PENDING' | 'INTERVIEW_UPLOADED' | 'TRAVEL_READY' | 'DEPLOYED' | 'ARCHIVED';

export type EmployeeProfile = {
  id: string;
  agencyId: string;
  name: string;
  role?: string | null;
  destination?: string | null;
  docPath?: string | null;
  tgVideoId?: string | null;
  status: EmployeeLifecycleStatus;
};
