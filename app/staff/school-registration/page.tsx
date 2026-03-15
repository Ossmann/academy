'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SendInviteButton from '@/app/components/ui/SendInviteButton';
import Navbar from '@/app/components/ui/Navbar';

export default function AddTeacherPage() {
  const [formData, setFormData] = useState({
    schoolName: '',
    teacherName: '',
    teacherEmail: '',
    password: '',
    checkinDate: '',
    checkoutDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
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
        setMessage('Teacher and school created successfully!');
        setFormData({ 
          schoolName: '', 
          teacherName: '', 
          teacherEmail: '', 
          password: '',
          checkinDate: '',
          checkoutDate: ''
        });
      } else {
        setMessage(result.error || 'Something went wrong');
      }
    } catch (error) {
      setMessage('Error creating teacher');
    } finally {
      setLoading(false);
    }
  };

  return (
    
   <div className='min-h-screen flex flex-col items-center'>
    <Navbar userType='Staff' />
    <div className='w-120 bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-xl p-12 mt-10'>
        <h1 className="text-2xl font-bold mb-6">Add a New School</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    School Name *
                </label>
                <input
                    type="text"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                    placeholder="Enter school name"
                    required
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teacher Name *
                </label>
                <input
                    type="text"
                    value={formData.teacherName}
                    onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                    placeholder="Enter teacher name"
                    required
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teacher Email *
                </label>
                <input
                    type="email"
                    value={formData.teacherEmail}
                    onChange={(e) => setFormData({ ...formData, teacherEmail: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                    placeholder="teacher@example.com"
                    required
                />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password *
                    </label>
                    <input
                        type="text"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                        placeholder="Enter password"
                        required
                    />
                    </div>


                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in Date
                </label>
                <input
                    type="date"
                    value={formData.checkinDate}
                    onChange={(e) => setFormData({ ...formData, checkinDate: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                    required
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out Date
                </label>
                <input
                    type="date"
                    value={formData.checkoutDate}
                    onChange={(e) => setFormData({ ...formData, checkoutDate: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                    required
                />
                </div>

                <SendInviteButton loading={loading} text="Send Invite to Teacher" />
            </form>

            {message && (
                <div className={`mt-4 p-3 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message}
                </div>
            )}
        </div>
    </div>

  );
}
