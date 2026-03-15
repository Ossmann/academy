'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { MdAddCircleOutline } from "react-icons/md";
import SendInviteButton from '@/app/components/ui/SendInviteButton';
import Navbar from '@/app/components/ui/Navbar';

interface StudentParent {
  studentName: string;
  parentName: string;
  parentEmail: string;
}

interface FormData {
  schoolName: string;
  teacherName: string;
  teacherEmail: string;
  password: string;
  checkinDate: string;
  checkoutDate: string;
  studentParents: StudentParent[];
}

export default function AddTeacherPage() {
  const [formData, setFormData] = useState<FormData>({
    schoolName: '',
    teacherName: '',
    teacherEmail: '',
    password: '',
    checkinDate: '',
    checkoutDate: '',
    studentParents: [
      { studentName: '', parentName: '', parentEmail: '' }
    ]
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleStudentParentChange = (index: number, field: keyof StudentParent, value: string) => {
    const updated = formData.studentParents.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setFormData({ ...formData, studentParents: updated });
  };

  const addStudentParentRow = () => {
    setFormData({
      ...formData,
      studentParents: [...formData.studentParents, { studentName: '', parentName: '', parentEmail: '' }]
    });
  };

  const removeStudentParentRow = (index: number) => {
    if (formData.studentParents.length > 1) {
      const updated = formData.studentParents.filter((_, i) => i !== index);
      setFormData({ ...formData, studentParents: updated });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/schools/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Parents registration link sent successfully!');
        setFormData({ 
          schoolName: '', 
          teacherName: '', 
          teacherEmail: '', 
          password: '',
          checkinDate: '',
          checkoutDate: '',
          studentParents: [{ studentName: '', parentName: '', parentEmail: '' }]
        });
      } else {
        setMessage(result.error || 'Something went wrong');
      }
    } catch (error) {
      setMessage('Error sending registration link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center'>
      <Navbar userType='Teacher' />
      <div className='w-120 bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-xl p-12 mt-10'>
        <h1 className="text-2xl font-bold mb-6">Add the Parents of your Students</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student-Parent Dynamic Fields */}
          <div className="space-y-4">
            {formData.studentParents.map((entry, index) => (
              <div key={index} className="flex gap-4 items-end bg-gray-50 p-4 rounded-lg">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={entry.studentName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleStudentParentChange(index, 'studentName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter student name"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Name
                  </label>
                  <input
                    type="text"
                    value={entry.parentName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleStudentParentChange(index, 'parentName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter parent name"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Email
                  </label>
                  <input
                    type="email"
                    value={entry.parentEmail}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleStudentParentChange(index, 'parentEmail', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="parent@example.com"
                    required
                  />
                </div>
                {formData.studentParents.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStudentParentRow(index)}
                    className="p-2 text-red-500 hover:text-red-700 -mt-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            
            {/* Add Button */}
            <button
              type="button"
              onClick={addStudentParentRow}
              className="flex items-center gap-2 text-gray-600 hover:gray-blue-800 font-medium p-2 rounded-lg hover:bg-blue-50 transition-colors w-fit"
            >
              <MdAddCircleOutline className="text-xl" />
              Add Another Student/Parent
            </button>
          </div>

          <SendInviteButton loading={loading} text="Send Parents Registration Link" />
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-lg ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
