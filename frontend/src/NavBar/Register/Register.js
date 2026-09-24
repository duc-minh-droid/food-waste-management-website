import React from 'react'
import { api, useUser } from '../../services'
import { useToast } from '../../components/Toast'

function Register() {
  const user = useUser()
  const toast = useToast()

  if (api.isDemo) {
    const reset = () => { api.reset(); toast('Demo data reset') }
    return <button onClick={reset} className='log reset'>Reset<span className='hide-sm'> demo</span></button>
  }

  if (user === undefined) return <div className='log log-ghost' />
  return !user
    ? <button onClick={() => api.signIn()} className='log login'>Log in</button>
    : <button onClick={() => api.signOut()} className='log logout'>Log out</button>
}

export default Register
