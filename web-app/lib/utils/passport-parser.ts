// Passport OCR parsing utilities

export interface PassportData {
  surname?: string;
  givenNames?: string;
  nationality?: string;
  dateOfBirth?: string;
  sex?: string;
  passportNumber?: string;
  issuingCountry?: string;
  dateOfIssue?: string;
  dateOfExpiry?: string;
  placeOfBirth?: string;
  fatherName?: string;
  motherName?: string;
}

/**
 * Parse passport OCR text and extract relevant data
 */
export function parsePassportData(ocrText: string): PassportData {
  const lines = ocrText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  const data: PassportData = {};

  // Try to find surname (usually first all-caps section)
  const surnameMatch = ocrText.match(/(?:surname|SUR NAME|SURNAME)\s*[:\s]*([A-Z\s]+?)(?=\n|$)/i);
  if (surnameMatch) data.surname = surnameMatch[1].trim();

  // Try to find given names
  const givenMatch = ocrText.match(/(?:given names|GIVEN NAMES|PRENOM)\s*[:\s]*([A-Za-z\s]+?)(?=\n|$)/i);
  if (givenMatch) data.givenNames = givenMatch[1].trim();

  // Try to find nationality
  const nationalityMatch = ocrText.match(/(?:nationality|NATIONALITY)\s*[:\s]*([A-Z]+)/i);
  if (nationalityMatch) data.nationality = nationalityMatch[1].trim();

  // Try to find date of birth (various formats: DD/MM/YYYY, YYYY-MM-DD, etc.)
  const dobMatch = ocrText.match(/(?:date of birth|DOB|D\.O\.B)\s*[:\s]*(\d{1,4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,4})/i);
  if (dobMatch) data.dateOfBirth = formatDateToISO(dobMatch[1]);

  // Try to find sex/gender
  const sexMatch = ocrText.match(/(?:sex|SEX|GENDER)\s*[:\s]*([MF])/i);
  if (sexMatch) data.sex = sexMatch[1].toUpperCase() === 'M' ? 'Male' : 'Female';

  // Try to find passport number
  const passportMatch = ocrText.match(/(?:passport|PASSPORT|passport number|NO\.?)\s*[:\s]*([A-Z0-9]{6,9})/i);
  if (passportMatch) data.passportNumber = passportMatch[1].trim();

  // Try to find issuing country
  const issuingMatch = ocrText.match(/(?:issuing country|ISSUING|COUNTRY)\s*[:\s]*([A-Z]+)/i);
  if (issuingMatch) data.issuingCountry = issuingMatch[1].trim();

  // Try to find issue date
  const issueMatch = ocrText.match(/(?:date of issue|ISSUED|ISSUE DATE)\s*[:\s]*(\d{1,4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,4})/i);
  if (issueMatch) data.dateOfIssue = formatDateToISO(issueMatch[1]);

  // Try to find expiry date
  const expiryMatch = ocrText.match(/(?:date of expiry|EXPIRY|EXPIRE|VALID UNTIL)\s*[:\s]*(\d{1,4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,4})/i);
  if (expiryMatch) data.dateOfExpiry = formatDateToISO(expiryMatch[1]);

  // Try to find place of birth
  const placeMatch = ocrText.match(/(?:place of birth|BORN AT|BIRTH PLACE)\s*[:\s]*([A-Za-z\s]+?)(?=\n|$)/i);
  if (placeMatch) data.placeOfBirth = placeMatch[1].trim();

  // Try to find father's name
  const fatherMatch = ocrText.match(/(?:father|FATHER|père)\s*[:\s]*([A-Za-z\s]+?)(?=\n|$)/i);
  if (fatherMatch) data.fatherName = fatherMatch[1].trim();

  // Try to find mother's name
  const motherMatch = ocrText.match(/(?:mother|MOTHER|mère)\s*[:\s]*([A-Za-z\s]+?)(?=\n|$)/i);
  if (motherMatch) data.motherName = motherMatch[1].trim();

  return data;
}

/**
 * Format date to ISO format (YYYY-MM-DD)
 */
export function formatDateToISO(dateStr: string): string {
  // Remove common separators and normalize
  const normalized = dateStr.replace(/[\/\-\.]/g, '/');
  const parts = normalized.split('/');

  if (parts.length !== 3) return '';

  let year = parts[2];
  let month = parts[1];
  let day = parts[0];

  // Handle 2-digit years
  if (year.length === 2) {
    const yearNum = parseInt(year);
    year = (yearNum > 30 ? 1900 : 2000) + yearNum + '';
  }

  // Handle month/day swap (US format vs EU format)
  const dayNum = parseInt(day);
  const monthNum = parseInt(month);

  // If day > 12, it must be day (assume EU format)
  if (dayNum > 12) {
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  // If both could be valid, assume EU format (day/month/year)
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

/**
 * Map passport data to form field names
 */
export function mapPassportToFormFields(passportData: PassportData) {
  return {
    firstName: passportData.givenNames?.split(' ')[0] || '',
    lastName: passportData.surname || '',
    dateOfBirth: passportData.dateOfBirth || '',
    gender: passportData.sex || '',
    nationality: passportData.nationality || '',
    passportNumber: passportData.passportNumber || '',
    passportExpiryDate: passportData.dateOfExpiry || '',
    fatherName: passportData.fatherName || '',
    motherName: passportData.motherName || '',
  };
}

/**
 * Extract text regions from passport image (for manual parsing)
 */
export function extractPassportFields(image: HTMLImageElement) {
  // This is a placeholder for advanced image processing
  // In production, you'd use a library like OpenCV.js or TensorFlow.js
  return {
    mrzZone: '', // Machine Readable Zone
    photoZone: '', // Face detection would go here
  };
}
