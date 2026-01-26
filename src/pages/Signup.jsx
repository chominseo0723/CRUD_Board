import React from 'react'

const Signup = () => {
  return (
    <>
    <div className='flex flex-col justify-center items-center font-pretendard min-h-screen'>
        <span className='text-3xl font-semibold mb-5'>회원가입</span>

        <span className='ml-65 text-sm text-[#A3A3A3]'> * 입력칸은 필수 입력입니다.</span>
    
        {/* 아이디 설정 */}
        <div className='flex flex-col gap-2 mt-10'>
            <div className='flex font flex-row gap-1'>
                <span className='font-semibold'>아이디</span>
                <span className='text-[#87C1FF]'>*</span>
            </div>
            <div className='flex flex-row gap-3'>
                <input className='w-80 border py-3 rounded-[10px] pl-3 border-[#A3A3A3] focus:outline-none focus:ring-0 focus:shadow-none' placeholder='사용하실 아이디를 입력해주세요'/>
                <button className='border rounded-[10px] px-5 text-white bg-black' type='button'>중복확인</button>
            </div>
        </div>

          {/* 닉네임 설정 */}
          <div className='flex flex-col gap-2 mt-5'>
            <div className='flex font flex-row gap-1'>
                <span className='font-semibold'>닉네임</span>
                <span className='text-[#87C1FF]' >*</span>
            </div>
            <div className='flex flex-row gap-3'>
                <input className='w-80 border py-3 rounded-[10px] pl-3 border-[#A3A3A3] focus:outline-none focus:ring-0 focus:shadow-none'  placeholder='사용하실 닉네임을 입력해주세요'/>
                <button className='border rounded-[10px] px-5 text-white bg-black' type='button'>중복확인</button>
            </div>
        </div>


        {/* 비밀번호 설정 */}
          <div className='flex flex-col gap-2 mt-5'>
            <div className='flex font flex-row gap-1'>
                <span className='font-semibold'>비밀번호</span>
                <span className='text-[#87C1FF]'>*</span>
            </div>
            <div className='flex flex-row gap-3'>
                <input className='w-108 border py-3 rounded-[10px] pl-3 border-[#A3A3A3] focus:outline-none focus:ring-0 focus:shadow-none'  placeholder='사용하실 비밀번호를 입력해주세요'/>

            </div>
        </div>

         {/* 회원가입 */}
         <button className='border w-108 mt-5 rounded-[10px] py-3 bg-[#87C1FF] text-white' type='button'>회원가입</button>

    </div>
    </>
  )
}

export default Signup