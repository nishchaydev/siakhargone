import { getSheetDataAsObjects, SHEET_TAB_IDS } from './google-sheets';
import { StudentResult } from '@/types/results';

export async function searchStudentResult(rollNo: string, dob?: string): Promise<StudentResult | null> {
  try {
    const data = await getSheetDataAsObjects(SHEET_TAB_IDS.RESULTS);
    if (!data || data.length === 0) return null;

    // Search by Roll Number (AdmissionNo in sheet) and verify DOB if provided
    const result = data.find((row) => {
      const matchAdmission = row['AdmissionNo']?.toString().trim().toLowerCase() === rollNo.trim().toLowerCase();
      
      if (!matchAdmission) return false;
      if (!dob) return true; // Only roll number check if DOB not provided

      // Sheet stores DOB as DD-MM-YYYY (e.g. "01-01-2026")
      // HTML date input sends YYYY-MM-DD (e.g. "2026-01-01")
      // Normalize incoming dob to DD-MM-YYYY for comparison
      const normalizedDob = dob.includes('-') && dob.indexOf('-') === 4
        ? dob.split('-').reverse().join('-')  // YYYY-MM-DD → DD-MM-YYYY
        : dob;

      const sheetDob = row['DOB']?.toString().trim();
      return sheetDob === normalizedDob;
    });

    return (result as unknown as StudentResult) || null;
  } catch (error) {
    console.error('Error searching student result:', error);
    throw error;
  }
}
