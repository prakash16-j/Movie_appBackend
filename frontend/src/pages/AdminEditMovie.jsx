import React from 'react'
import { useParams } from 'react-router-dom'

export default function AdminEditMovie() {
    const { id } = useParams()
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Admin - Edit Movie</h1>
            <p className="text-gray-600">Editing movie id: {id}</p>
        </div>
    )
}
