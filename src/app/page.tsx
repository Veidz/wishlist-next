'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [itemUrl, setItemUrl] = useState('')

    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        if (name && itemUrl) {
            setButtonDisabled(false)
        }
    }, [name, itemUrl])

    const handleNameChange = (e: any) => {
        setName(e.target.value)
    }

    const handleImageUrlChange = (e: any) => {
        setImageUrl(e.target.value)
    }

    const handleItemUrlChange = (e: any) => {
        setItemUrl(e.target.value)
    }

    const addItem = (e: any) => {
        e.preventDefault()
        const inputData = {
            name: name,
            imageUrl: imageUrl,
            itemUrl: itemUrl
        }

        axios({
            method: 'post',
            url: 'http://localhost:5050/products',
            data: inputData
        })
        .then((response) => {
            if (response.status == 201) {
                response.data.data
            }
            else if (response.status == 400) {
                response.data.error
            }
        })
        .catch((error) => console.error(error))

        setName('')
        setImageUrl('')
        setItemUrl('')
    }

    return (
        <main className='flex min-h-screen flex-col items-center p-24'>
            <h1 className='text-8xl font-bold mb-10 tracking-wide'>WishList</h1>
            <form>
                <input onChange={ (e) => handleNameChange(e) } className='p-4 m-4 outline-blue-500' type='text' placeholder='Item name' required />
                <input onChange={ (e) => handleImageUrlChange(e) } className='p-4 m-4' type='url' placeholder='Image url' />
                <input onChange={ (e) => handleItemUrlChange(e) } className='p-4 m-4' type='url' placeholder='Item url' required />
                <button className='bg-blue-500 hover:enabled:bg-blue-700 text-white font-bold p-4 m-4 rounded w-40 disabled:cursor-not-allowed disabled:opacity-50' onClick={ (e) => addItem(e) } type='submit' disabled={ buttonDisabled }>Add</button>
            </form>
        </main>
    )
}
