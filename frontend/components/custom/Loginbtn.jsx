import { useSession, signIn, signOut } from 'next-auth/react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { lightBlue } from '@mui/material/colors'

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: lightBlue[200],
  borderColor: '#ffffff',
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: lightBlue[500],
  },
}))

export default function LoginBtn() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="flex flex-row justify-center m-0">
        <ColorButton variant="contained" onClick={() => signOut()}>
          Sign out
        </ColorButton>
        {/* <p className="text-xs">Signed in as {session.user.email} </p> */}
      </div>
    )
  }
  return (
    <div className="flex flex-row justify-center m-0">
      <ColorButton variant="contained" onClick={() => signIn()}>
        Sign in
      </ColorButton>
      {/* <p className="text-xs">Not signed in</p> */}
    </div>
  )
}
