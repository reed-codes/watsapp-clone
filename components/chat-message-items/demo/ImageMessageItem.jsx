import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import MessageWrapper from "./common/MessageWrapper";


const ImageMessageItem = () => {
  return (
    <MessageWrapper>
        <Box>
          <img
            src="https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_ds_22/SI_NDS_NewSuperMarioBrosDS_image1600w.jpg"
            className="w-full pointer-events-none"
          />
          <Typography className = "pt-4">
            It’s glitter and it’s supposed to be a crown 🙄 But she took forever
            - slowly starting to give up on my love for nails honestly
          </Typography>
        </Box>
</MessageWrapper>
  );
};

export default ImageMessageItem;
