'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // Log the incoming form data
  const formDataObject = {
    email: formData.get('email'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    password: formData.get('password'),
  }
  console.log('Signup attempt with data:', {
    ...formDataObject,
    password: '[REDACTED]' // Don't log the actual password
  })

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        first_name: formData.get('firstName') as string,
        last_name: formData.get('lastName') as string,
      }
    }
  }

  try {
    const { data: signupData, error } = await supabase.auth.signUp(data)
    
    if (error) {
      console.error('Supabase signup error:', {
        code: error.code,
        message: error.message,
        details: error.detail
      })
      redirect('/error')
    }

    console.log('Signup successful:', {
      userId: signupData?.user?.id,
      email: signupData?.user?.email
    })

    revalidatePath('/', 'layout')
    redirect('/account')
  } catch (e) {
    console.error('Unexpected error during signup:', e)
    redirect('/error')
  }
}

export async function signout() {
  const supabase = await createClient()

  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/login')
}