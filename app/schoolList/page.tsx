'use client'

import { useEffect, useState } from 'react'
import { prisma } from '@/app/lib/prisma' 

// If you can’t run this in a server component, move the fetch to a route handler
// (example below that), then call it via fetch().

export default function SchoolList() {
  const [schools, setSchools] = useState<
    {
      id: string
      name: string
      createdAt: string
      teachers: {
        id: string
        name: string
        email: string
        createdAt: string
      }[]
    }[]
  >([])

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch('/api/schools')
        const data = await res.json()
        setSchools(data)
      } catch (err) {
        console.error('Failed to fetch schools:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSchools()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!schools.length) {
    return <p>No schools found.</p>
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Schools and Teachers</h1>
      {schools.map((school) => (
        <div key={school.id} className="border rounded p-4 mb-4">
          <h2 className="text-xl font-semibold">{school.name}</h2>
          <p className="text-sm text-gray-600">
            Created: {new Date(school.createdAt).toLocaleString()}
          </p>

          <h3 className="mt-4 text-lg font-medium">Teachers</h3>
          {school.teachers.length === 0 ? (
            <p className="text-gray-500">No teachers assigned.</p>
          ) : (
            <ul className="space-y-2 mt-2">
              {school.teachers.map((teacher) => (
                <li key={teacher.id} className="border-l-4 border-blue-500 pl-3 py-1">
                  <div className="font-medium">{teacher.name}</div>
                  <div className="text-sm text-gray-700">{teacher.email}</div>
                  <div className="text-xs text-gray-500">
                    Joined: {new Date(teacher.createdAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </main>
  )
}
