import React, { useState } from 'react'
import headerlogo from '../assets/HeaderLogo.png'
import { CiSearch } from "react-icons/ci";

const BoardHeader = () => {
  return (
    <>
    <div className='flex flex-row bg-[#CBE4FF] items-center'>
        <div className='flex items-center w-1/3'>
        <img className="w-10 h-10 my-3 ml-10" src={headerlogo} alt="Header Logo"/>
        </div>
        {/* 검색 박스 */}
        <div className='flex justify-center w-1/3'>
            <input type='text'className='focus:outline-none focus:ring-0 focus:shadow-none' placeholder='게시글을 검색해보세요'/>
            <button type='button'><CiSearch /></button>
        </div>
    </div>
    </>
  )
}

export default BoardHeader