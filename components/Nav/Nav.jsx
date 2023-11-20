'use client';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setProvider();
  }, []);

  const changeDropDown = () => {
    setToggleDropDown(prevState => !prevState);
  }

  const handleClickButton = () => {
    setToggleDropDown(false);
    signOut()
  }

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src='/assets/images/logo.svg' alt='logo' width={30} height={30} className='object-contain' />
        <p className='logo_text'>Promptopia</p>
      </Link>
      <div className='sm:flex hidden'>
        {
          isUserLoggedIn ? (
            <div className='flex gap-3 md:gap-5'>
              <Link href='/create-prompt' className='black_btn'>Create Post</Link>
              <button type='button' onClick={() => signOut()} className='outline_btn'>Sign Out</button>
              <Link href='/profile'>
                <Image src='/assets/images/logo.svg' width={37} height={37} alt='profile image' />
              </Link>
            </div> 
          ) : (
            <>
              {
                providers && Object.values(providers).map(provider => (
                  <button className='black_btn' type='button' key={provider.name} onClick={() => signIn(provider.id)} >
                    Sign In
                  </button>
                ))
              }
            </>
          )
        }
      </div>

      <div className='sm:hidden flex relative'>
        {
          isUserLoggedIn ? (
            <div className='flex'>
                <Image src='/assets/images/logo.svg' width={37} height={37} alt='profile image' onClick={changeDropDown} />
                {toggleDropDown && (<div className='dropdown'>
                  <Link href='/profile' className='dropdown_link' onClick={changeDropDown}>
                    My Profile
                  </Link>
                  <Link href='/create-prompt' className='dropdown_link' onClick={changeDropDown}>
                    Create Prompt
                  </Link>
                  <button type='button' className='mt-5 w-full black_btn' onClick={handleClickButton}>
                    Sign Out
                  </button>
                </div>)}
            </div>
          ) : (
            <>
              {
                providers && Object.values(providers).map(provider => (
                  <button className='black_btn' type='button' key={provider.name} onClick={() => signIn(provider.id)} >
                    Sign In
                  </button>
                ))
              }
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav
