import React from 'react'


const Signin = () => {
  return (
    <>
    <div className='flex flex-col min-h-screen font-pretendard items-center justify-center gap-10'>
        <span className='text-3xl font-semibold'>로그인</span>

        <form className='flex flex-col gap-5'>
            <div className='flex flex-col gap-3'>
                <span className='text-xl font-semibold'>아이디</span>
                <input className='border rounded-[10px] pl-3 py-2 w-90 border-[#A3A3A3]' placeholder ="아이디를 입력하세요"/>
            </div>

            <div className='flex flex-col gap-3'>
                <span className='text-xl font-semibold'>비밀번호</span>
                <input className='border rounded-[10px] pl-3 py-2 w-90 border-[#A3A3A3]' placeholder="비밀번호를 입력하세요" type="password"/>
            </div>

            <button className='border border-[#87C1FF] 
            bg-[#87C1FF] py-2 rounded-[10px] text-white
            ' type="submit">로그인</button>
        </form>
    </div>

    </>
  )
}

export default Signin