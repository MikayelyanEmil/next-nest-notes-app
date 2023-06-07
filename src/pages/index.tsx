import { AppButton } from '@/components/AppButton/AppButton'
import { useRouter } from 'next/router'
import React from 'react'


export default function index() {
    const router = useRouter();
    return (
        <>
            <h1>Create and Store your Notes !</h1>
            <AppButton text={'Sign Up'} variant={'primary'} onClick={() => router.push('/signup')}/>
        </>
    )
}
