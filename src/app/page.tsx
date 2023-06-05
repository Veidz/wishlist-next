'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './page.css'

export default function Home() {
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [productUrl, setProductUrl] = useState('')

    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        if (name && productUrl) {
            setButtonDisabled(false)
        }
    }, [name, productUrl])

    const handleNameChange = (e: any) => {
        setName(e.target.value)
    }

    const handleImageUrlChange = (e: any) => {
        setImageUrl(e.target.value)
    }

    const handleProductUrlChange = (e: any) => {
        setProductUrl(e.target.value)
    }

    const addItem = (e: any) => {
        e.preventDefault()
        const inputData = {
            name: name,
            imageUrl: imageUrl,
            productUrl: productUrl
        }

        axios({
            method: 'post',
            url: `http://localhost:${process.env.DB_NODE_PORT}/products`,
            data: inputData
        })
        .then((response) => {
            toast.success('Item successfully added.', {
                position: toast.POSITION.TOP_RIGHT
            })
        })
        .catch((error) => {
            if (error.response.status == 400) {
                toast.error('Invalid data provided.', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            else {
                toast.error('Internal server error', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        })

        setName('')
        setImageUrl('')
        setProductUrl('')
        setButtonDisabled(true)
    }

    return (
        <main className='flex min-h-screen flex-col items-center p-24'>
            <h1 className='text-8xl font-bold mb-10 tracking-wide'>WishList</h1>
            <form className='form-container'>
                <input onChange={ (e) => handleNameChange(e) } className='p-4 m-4 outline-blue-500' type='text' placeholder='Product name' required value={ name } />
                <input onChange={ (e) => handleImageUrlChange(e) } className='p-4 m-4 outline-blue-500' type='url' placeholder='Image url' value={ imageUrl } />
                <input onChange={ (e) => handleProductUrlChange(e) } className='p-4 m-4 outline-blue-500' type='url' placeholder='Product url' required value={ productUrl } />
                <button className='bg-blue-500 hover:enabled:bg-blue-700 text-white font-bold p-4 m-4 rounded w-40 disabled:cursor-not-allowed disabled:opacity-50' onClick={ (e) => addItem(e) } type='submit' disabled={ buttonDisabled }>Add</button>
                
                <ToastContainer />
            </form>
        </main>
    )
}
