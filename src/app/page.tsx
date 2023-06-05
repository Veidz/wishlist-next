/* eslint-disable @next/next/no-img-element */
'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './page.css'
import defaultImage from './images/default.png'

export default function Home() {
    const [products, setProducts] = useState([])

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

    const addProduct = (e: any) => {
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

        getProducts()
    }

    const getProducts = () => {
        axios({
            method: 'get',
            url: `http://localhost:${process.env.DB_ASPNET_PORT}/products`
        })
        .then((response) => {
            setProducts(response.data.data)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    return (
        <main className='flex min-h-screen flex-col items-center p-24'>
            <ToastContainer />

            <h1 className='text-8xl font-bold mb-10 tracking-wide'>WishList</h1>
            <form className='form-container'>
                <input onChange={ (e) => handleNameChange(e) } className='p-4 m-4 outline-blue-500' type='text' placeholder='Product name' required value={ name } />
                <input onChange={ (e) => handleImageUrlChange(e) } className='p-4 m-4 outline-blue-500' type='url' placeholder='Image url' value={ imageUrl } />
                <input onChange={ (e) => handleProductUrlChange(e) } className='p-4 m-4 outline-blue-500' type='url' placeholder='Product url' required value={ productUrl } />
                <button className='bg-blue-500 hover:enabled:bg-blue-700 text-white font-bold p-4 m-4 rounded w-40 disabled:cursor-not-allowed disabled:opacity-50' onClick={ (e) => addProduct(e) } type='submit' disabled={ buttonDisabled }>Add</button>
            </form>

            <div className='grid grid-cols-4 gap-4'>
                {
                    products.map((product: any) => {
                        return (
                            <div key={ product.name } className="flex-col mt-10 p-6 bg-white border border-gray-200 rounded-lg flex items-center justify-between">
                                <img src={ product.imageUrl ? product.imageUrl : defaultImage } alt={ `${product.name} photo` } width={ 64 } height={ 64 } />
                                
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                    { product.name }
                                </h5>

                                <a href={ product.productUrl } target='_blank' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Go to product

                                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd">
                                        </path>
                                    </svg>
                                </a>
                            </div>
                        )
                    })
                }
            </div>
            
        </main>
    )
}
