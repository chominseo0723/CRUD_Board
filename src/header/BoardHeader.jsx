import React, { useEffect, useState } from 'react'
import headerlogo from '../assets/HeaderLogo.png'
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';
import useAuth from '../contexts/useAuth';
import UserApi from '../apis/UserApi';

const BoardHeader = () => {

  const { accessToken } = useAuth()
  const isLoggedIn = !!accessToken

  const [nickname, setNickname] = useState(null)

  // 닉네임 조회 
   useEffect(() => {
    if (!accessToken) return;

    const fetchNickname = async () => {
      try {
        const data = await UserApi(accessToken);
        setNickname(data.nickname);
      } catch (error) {
        console.error('닉네임 조회 실패', error);
      }
    };

    fetchNickname();
  }, [accessToken]);

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

        {/* 우측 영역 */}
      <div className="ml-auto mr-20">
        {!isLoggedIn ? (
          /* 로그인 X */
          <Link
            className='text-xl font-semibold text-[#A3A3A3]'
            to="/signin"
          >
            로그인
          </Link>
        ) : (
          /* 로그인 O */
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm">
               {/* 사용자 프로필 API 연동전 기본이미지  */}
            </div>
            <span className="text-lg text-gray-500">
              { nickname ? nickname : '닉네임' }
            </span>
          </div>
        )}
      </div>
       
    </div>
    </>
  )
}

export default BoardHeader