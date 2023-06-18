// import { AppInput } from '@/components/AppInput/AppInput';
import { AppButton } from '@/components/AppButton/AppButton'
import { useRouter } from 'next/router'
import React from 'react'


export default function index() {
    const router = useRouter();
    return (
        <>
            <h1>Create and Store your Notes !</h1>
            <AppButton color='navy' text={'Sign Up'} variant={'primary'} onClick={() => router.push('/signup')}/>
        </>
        // <>
        //     <form onSubmit={(e) => submit(e)} className={styles.form} method='Post'>
        //         <AppInput text={'Name'} type={'text'} name={'name'} />
        //         <AppInput text={'Email'} type={'email'} name={'email'} />
        //         <AppInput text={'Password'} type={'password'} name={'password'} />
        //         <center><AppButton type='submit' text='Sign Up' variant='secondary' color='#4CAF50' /></center>
        //     </form>

        //     <form onSubmit={(e) => submit(e)} method='Post' className={styles.form}>
        //         <AppInput text={'Email'} type={'email'} name={'email'} />
        //         <br />
        //         <AppInput text={'Password'} type={'password'} name={'password'} />
        //         <center><AppButton type='submit' text='Log in' variant='secondary' color='#1c0e7b;' /></center>
        //     </form>
        // </>
    )
}
