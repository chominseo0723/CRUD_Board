import React, { useState } from 'react'
import headerlogo from '../assets/HeaderLogo.png'
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';

const BoardHeader = () => {
  return (
    <>
    <div className='flex flex-row bg-[#CBE4FF] items-center font-pretendard'>
        <div className='flex items-center w-1/3'>
        <img className="w-10 h-10 my-3 ml-10" src={headerlogo} alt="Header Logo"/>
        </div>
        {/* 검색 박스 */}
        <div className='flex justify-between w-1/3 border rounded-[10px] py-2 border-[#A3A3A3] bg-white'>
            <input type='text'className='focus:outline-none focus:ring-0 focus:shadow-none pl-10 w-100'
            placeholder='게시글을 검색해보세요'/>
            <button type='button' className='pr-4'><CiSearch className='text-[#A3A3A3]' size={25}/></button>
        </div>

        {/* 로그인 X -> 로그인 link */}
        <Link className='ml-auto mr-10 text-xl font-semibold text-[#A3A3A3]' to="/signin">로그인</Link>
    </div>
    </>
  )
}

export default BoardHeader