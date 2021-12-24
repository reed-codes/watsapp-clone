import React from 'react'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithGoogle } from "../lib";

const SignIn = () => {
    return (
        <Box
            className="fixed bottom-0 flex justify-center items-center flex-col w-full h-full overflow-hidden bg-[#001b3c]"
        >
            <img src="/login-artwork.png" 
                 className="w-[300px] h-[300px] object-cover mb-10 rounded-full pointer-events-none"
                 />


            <Button
                variant="contained"
                className="p-0 justify-center items-center overflow-hidden w-[290px] bg-black rounded-lg"
                sx = {{boxShadow:20}}
                onClick={signInWithGoogle}
            >
                <Box component="span" className="bg-white p-4 h-full min-w-[80px] flex items-center justify-center">
                <GoogleIcon className="text-[red]" />
                </Box>
                <Box component="span" className="font-bold p-4 h-full w-full bg-[#049be4] flex items-center justify-center text-white">
                    Sign in with google
                </Box>
            </Button>

            <img src="/telegram-logo.png" 
                 className="w-[60px] h-[60px] object-contain mb-4 rounded-lg animate-bounce absolute bottom-5 w-full left-0 right-0 m-auto pointer-events-none"
                 />
        </Box>
    )
}

export default SignIn
