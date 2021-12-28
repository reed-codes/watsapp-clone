import React from 'react'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithGoogle } from "../lib/sign-in-with-google";

const SignIn = () => {
    return (
        <Box className="fixed bottom-0 flex justify-center items-center flex-col w-full h-full overflow-hidden bg-[#0c1118]" >
            <img src="/telegram-logo.png"
                className="w-[50px] h-[50px] object-contain mb-20 rounded-full animate-bounce pointer-events-none bg-[#000]"
            />

            <Button
                variant="contained"
                className="p-0 justify-center items-center overflow-hidden rounded rounded"
                sx={{ padding: 0 }}
                onClick={signInWithGoogle}
            >
                <Box component="span" className="bg-white p-4 h-full min-w-[80px] flex items-center justify-center">
                    <GoogleIcon className="text-[red] text-[13px]" />
                </Box>

                <Box component="span"
                    className="font-bold p-2 h-full w-full flex items-center justify-center text-white text-[13px] bg-[#049ae3]"
                >
                    Sign in with google
                </Box>
            </Button>


        </Box>
    )
}

export default SignIn
