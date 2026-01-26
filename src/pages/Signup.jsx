import React, { useState } from 'react';
import CheckUsernameApi from '../apis/CheckUsernameApi';
import CheckNicknameApi from '../apis/CheckNicknameApi';
import api from '../apis/api';



const Signup = () => {

  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

const [usernameMessage, setUsernameMessage] = useState('');
const [nicknameMessage, setNicknameMessage] = useState('');

const [isUsernameValid, setIsUsernameValid] = useState(null); 
const [isNicknameValid, setIsNicknameValid] = useState(null);


  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const usernameRegex = /^[a-z0-9]{4,20}$/;
  
  // 아이디 중복확인 
  const handleCheckUsername = async () => {
  const usernameRegex = /^[a-z0-9]{4,20}$/;

  if (!username) {
    setUsernameMessage('아이디를 입력해주세요');
    setIsUsernameValid(false);
    return;
  }

  if (!usernameRegex.test(username)) {
    setUsernameMessage('영문 소문자와 숫자 4~20자만 가능합니다');
    setIsUsernameValid(false);
    return;
  }

  try {
    const result = await CheckUsernameApi(username);

    if (result.available) {
      setUsernameMessage('사용 가능한 아이디입니다');
      setIsUsernameValid(true);
      setIsUsernameChecked(true);
    } else {
      setUsernameMessage('이미 사용 중인 아이디입니다');
      setIsUsernameValid(false);
      setIsUsernameChecked(false);
    }
  } catch (err) {
    setUsernameMessage('아이디 확인 중 오류가 발생했습니다');
    setIsUsernameValid(false);
  }
};


// 닉네임 중복확인
const handleCheckNickname = async () => {
  if (!nickname) {
    setNicknameMessage('닉네임을 입력해주세요');
    setIsNicknameValid(false);
    return;
  }

  try {
    const result = await CheckNicknameApi(nickname);

    if (result.available) {
      setNicknameMessage('사용 가능한 닉네임입니다');
      setIsNicknameValid(true);
      setIsNicknameChecked(true);
    } else {
      setNicknameMessage('이미 사용 중인 닉네임입니다');
      setIsNicknameValid(false);
      setIsNicknameChecked(false);
    }
  } catch (err) {
    setNicknameMessage('닉네임 확인 중 오류가 발생했습니다');
    setIsNicknameValid(false);
  }
};


// 회원가입
const handleSignup = async () => {
  if (!isUsernameChecked || !isNicknameChecked) {
    alert('아이디와 닉네임 중복확인을 해주세요');
    return;
  }

  if (!password) {
    alert('비밀번호를 입력해주세요');
    return;
  }

  try {
    const res = await api.post('/auth/register', {
      username,
      nickname,
      password,
    });

    alert('회원가입 성공');
    console.log(res.data);
  } catch (err) {
    alert('회원가입 실패');
    console.error(err);
  }
};



  return (
    <>
    <div className='flex flex-col justify-center items-center font-pretendard min-h-screen'>
        <span className='text-3xl font-semibold mb-5'>회원가입</span>

        <span className='ml-65 text-sm text-[#A3A3A3]'> * 입력칸은 필수 입력입니다.</span>
    
    {/* 아이디 설정 */}
       <div className="flex flex-col gap-2 mt-10">
  <div className="flex flex-row gap-1">
    <span className="font-semibold">아이디</span>
    <span className="text-[#87C1FF]">*</span>
  </div>

  <div className="flex flex-row gap-3 items-start">
    <div className="flex flex-col">
      <input
  className="w-80 border py-3 rounded-[10px] pl-3 border-[#A3A3A3]"
  placeholder="사용하실 아이디를 입력해주세요"
  value={username}
  onChange={(e) => {
    const value = e.target.value;
    setUsername(value);
    setIsUsernameChecked(false);

    if (!value) {
      setUsernameMessage('');
      setIsUsernameValid(null);
      return;
    }

    if (!usernameRegex.test(value)) {
      setUsernameMessage('영문 소문자와 숫자 4~20자만 가능합니다');
      setIsUsernameValid(false);
    } else {
      setUsernameMessage('형식이 올바릅니다. 중복확인을 해주세요');
      setIsUsernameValid(true);
    }
  }}
/>

      {usernameMessage && (
        <p
          className={`text-sm mt-1 ${
            isUsernameValid ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {usernameMessage}
        </p>
      )}
    </div>

    <button
      className="border rounded-[10px] px-5 h-12 text-white bg-black"
      type="button"
      onClick={handleCheckUsername}
    >
      중복확인
    </button>
  </div>
</div>

{/* 닉네임 설정 */}
<div className="flex flex-col gap-2 mt-5">
  <div className="flex flex-row gap-1">
    <span className="font-semibold">닉네임</span>
    <span className="text-[#87C1FF]">*</span>
  </div>


  <div className="flex flex-row gap-3 items-start">

    <div className="flex flex-col">
      <input
        className="w-80 border py-3 rounded-[10px] pl-3 border-[#A3A3A3] focus:outline-none focus:ring-0 focus:shadow-none"
        placeholder="사용하실 닉네임을 입력해주세요"
        value={nickname}
        onChange={(e) => {
          setNickname(e.target.value);
          setIsNicknameChecked(false);
          setNicknameMessage('');
          setIsNicknameValid(null);
        }}
      />

 
      {nicknameMessage && (
        <p
          className={`text-sm mt-1 ${
            isNicknameValid ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {nicknameMessage}
        </p>
      )}
    </div>

          <button
            className="border rounded-[10px] px-5 h-12 text-white bg-black"
            type="button"
            onClick={handleCheckNickname}
          >
            중복확인
          </button>
        </div>
      </div>

{/* 비밀번호 설정 */}
          <div className='flex flex-col gap-2 mt-5'>
            <div className='flex font flex-row gap-1'>
                <span className='font-semibold'>비밀번호</span>
                <span className='text-[#87C1FF]'>*</span>
            </div>
            <div className='flex flex-row gap-3'>
                <input className='w-108 border py-3 rounded-[10px] pl-3 border-[#A3A3A3] focus:outline-none focus:ring-0 focus:shadow-none'   placeholder='사용하실 비밀번호를 입력해주세요'
                value={password}
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                />

            </div>
        </div>

         {/* 회원가입 */}
         <button className='border w-108 mt-5 rounded-[10px] py-3 bg-[#87C1FF] text-white' type='button' onClick={handleSignup}>회원가입</button>

    </div>
    </>
  )
}

export default Signup