import { NextRequest, NextResponse } from 'next/server';
import { searchStudentResult } from '@/lib/student-results-service';

export async function POST(request: NextRequest) {
  try {
    const { rollNo, dob } = await request.json();

    if (!rollNo) {
      return NextResponse.json(
        { error: 'Roll Number is required' },
        { status: 400 }
      );
    }

    const result = await searchStudentResult(rollNo, dob || undefined);
    
    if (!result) {
      return NextResponse.json(
        { error: 'Result not found (Roll No: ' + rollNo + '). Please check your details.' },
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
