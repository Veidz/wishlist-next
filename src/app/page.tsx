'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './page.css'
import Image from 'next/image'

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

        // axios({
        //     method: 'post',
        //     url: `http://localhost:${process.env.DB_NODE_PORT}/products`,
        //     data: inputData
        // })
        // .then((response) => {
        //     toast.success('Item successfully added.', {
        //         position: toast.POSITION.TOP_RIGHT
        //     })
        // })
        // .catch((error) => {
        //     if (error.response.status == 400) {
        //         toast.error('Invalid data provided.', {
        //             position: toast.POSITION.TOP_RIGHT
        //         })
        //     }
        //     else {
        //         toast.error('Internal server error', {
        //             position: toast.POSITION.TOP_RIGHT
        //         })
        //     }
        // })

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

            <div className=''>
                {
                    products.map((product: any) => {
                        return (
                            <div key={ product }>
                                <h1 className='text-2xl'>{ product.name }</h1>
                                <Image src={ product.imageUrl } alt={`${product.name} photo`} />
                                <a href={ product.productUrl } target="_blank">Go to Product</a>
                            </div>
                        )
                    })
                }
            </div>
            
        </main>
    )
}
