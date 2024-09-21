import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setAuthor(res.data.data.author);
        setPublishedYear(res.data.data.publishedYear)
        setTitle(res.data.data.title)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }, [])

  const handleEditBook = () => {
    const data = {
      title, author, publishedYear
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert("error occured. check console");
        console.error(error);
      })
  }
  


  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4 '>Edit Book</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-sky-400 w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className="text-xl mr-4 text-gray-500">title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className="text-xl mr-4 text-gray-500">author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className="text-xl mr-4 text-gray-500">publishedYear</label>
          <input type="text" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>

      </div>
      
    </div>
  )
}

export default EditBook
