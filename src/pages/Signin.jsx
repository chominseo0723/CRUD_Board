import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import LoginApi from '../apis/LoginApi';


const Signin = () => {
    const navigate = useNavigate();
    const [id, setId] = useState(""); // 아이디를 저장하는 변수
    const [password, setPassword] = useState(""); // 비밀번호를 저장하는 변수

    const [idVaild, setIdVaild] = useState(false); // 아이디 유효성 검사
    const [passwordVaild, setPasswordVaild] = useState(false); // 비밀번호 유효성 검사
    const [allow, setAllow] = useState(false); // form 비활성화 여부 저장 변수
   const [hide, setHide] = useState(true); // 비밀번호 숨김 / 나타나게 -> true = 숨김

    const handleId = (e) => {
        setId(e.target.value);
       const regex = /^[a-z0-9]{4,20}$/;
        if (regex.test(e.target.value)) {
            setIdVaild(true);
        }else{
            setIdVaild(false);
        }
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$/; // 비밀번호 정규식
        if (regex.test(e.target.value)) {
            setPasswordVaild(true); // 유효성 검사 통과
        }else{
            setPasswordVaild(false); // 유효성 검사 실패
        }
    };

const onClickSubmit = async (e) => {
  e.preventDefault();

  if (!idVaild || !passwordVaild) {
    alert('아이디 또는 비밀번호 형식을 확인하세요');
    return;
  }

  try {
    const data = await LoginApi({
      username: id,
      password,
    });

    console.log(data);
    alert('로그인 성공');
    navigate('/');
  } catch (err) {
    alert(err.response?.data?.message || '로그인 실패');
  }
};


  useEffect(() => {
    if (idVaild && passwordVaild) {
        setAllow(true);
    } else {
        setAllow(false);
    }
}, [idVaild, passwordVaild]);


  return (
    <>
    <div className='flex flex-col min-h-screen font-pretendard items-center justify-center gap-10'>
        <span className='text-3xl font-semibold'>로그인</span>

        <form className='flex flex-col gap-5 ' onSubmit={onClickSubmit}>
            <div className='flex flex-col gap-3'>
                <span className='text-xl font-semibold'>아이디</span>
                <input
                className='border rounded-[10px] pl-3 py-3 w-90 border-[#A3A3A3] focus:outline-none focus:ring-0 focus:shadow-none'
                placeholder="아이디를 입력하세요"
                value={id}
                onChange={handleId}
                />
            </div>

            <div className='flex flex-col gap-3'>
                <span className='text-xl font-semibold'>비밀번호</span>
                  <div className="relative">
            <input
            className='border rounded-[10px] pl-3 pr-10 py-3 w-90 border-[#A3A3A3] focus:outline-none focus:ring-0 focus:shadow-none'
            placeholder="비밀번호를 입력하세요"
            type={hide ? "password" : "text"}
            value={password}
            onChange={handlePassword}
            />

            <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500"
            onClick={() => setHide(!hide)}
            >
            {hide ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
            </div>
            </div>
            <button className='border border-[#87C1FF] 
            bg-[#87C1FF] py-3 rounded-[10px] text-white 
            ' type="submit">로그인</button>
        </form>

        <Link className="text-[#D9D9D9] underline underline-offset-4" to="/signup">회원가입</Link>
    </div>

    </>
  )
}

export default Signin