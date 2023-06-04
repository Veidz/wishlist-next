'use client'

import { useState } from 'react'

export default function Home() {
    const [name, setName] = useState()
    const [imageUrl, setImageUrl] = useState()
    const [itemUrl, setItemUrl] = useState()

    const handleNameChange = (e: any) => {
        setName(e.target.value)
    }

    const handleImageUrlChange = (e: any) => {
        setImageUrl(e.target.value)
    }

    const handleItemUrlChange = (e: any) => {
        setItemUrl(e.target.value)
    }

    return (
        <main className='flex min-h-screen flex-col items-center p-24'>
            <h1 className='text-8xl font-bold mb-10'>WishList</h1>
            <form>
                <input onChange={(e) => handleNameChange(e)} className='p-4 m-4' type='text' placeholder='Item name' />
                <input onChange={(e) => handleImageUrlChange(e)} className='p-4 m-4' type='url' placeholder='Image url' />
                <input onChange={(e) => handleItemUrlChange(e)} className='p-4 m-4' type='url' placeholder='Item url' />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 m-4 rounded w-40'>Add</button>
            </form>
        </main>
    )
}
