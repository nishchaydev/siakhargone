import { NextRequest, NextResponse } from 'next/server';
import { searchStudentResult } from '@/lib/student-results-service';

export async function POST(request: NextRequest) {
  try {
    const { admissionNo, dob } = await request.json();

    if (!admissionNo) {
      return NextResponse.json(
        { error: 'Admission number is required' },
        { status: 400 }
      );
    }

    const result = await searchStudentResult(admissionNo, dob || undefined);
    
    if (!result) {
      return NextResponse.json(
        { error: 'Result not found (Admission No: ' + admissionNo + '). Please check your details.' },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
