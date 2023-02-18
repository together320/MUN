
import { Box } from "@mui/material";
import { FooterCaption, FooterTitle } from "../../Components";

export default function Footer() {
    return <Box className="px-[40px] pt-[120px] pb-[40px]">
        <Box className="mb-[140px] flex">
            <img src="/logo.svg" alt="Logo" />
            <Box className="grid grid-cols-2 mt-[106px] w-[50%]">
                <Box className="pl-[50%]">
                    <FooterTitle>Navigate</FooterTitle>
                    <Box className="mt-[35px] grid grid-cols-2">
                        <FooterCaption>Home</FooterCaption>
                        <FooterCaption>Lend</FooterCaption>
                        <FooterCaption>Profile</FooterCaption>
                        <FooterCaption>Borrow</FooterCaption>
                    </Box>
                </Box>
                <Box className="pl-[50%]">
                    <FooterTitle>Social</FooterTitle>
                    <Box className="mt-[35px]">
                        <FooterCaption className="flex">
                            <img className="h-fit my-auto mr-[18px]" src="/icons/telegram-filled.png" alt="Telegram" />Telegram
                        </FooterCaption>
                        <FooterCaption className="flex mt-[12px]">
                            <img className="h-fit my-auto mr-[18px]" src="/icons/twitter-filled.png" alt="Telegram" />Twitter
                        </FooterCaption>
                        <FooterCaption className="flex mt-[12px]">
                            <img className="h-fit my-auto mr-[18px]" src="/icons/discord-filled.png" alt="Telegram" />Discord
                        </FooterCaption>
                    </Box>
                </Box>
            </Box>
        </Box>
        <Box className="flex">
            <FooterCaption className="ml-[38px]">© 2021 O9D, All rights reserved</FooterCaption>
            <FooterCaption className="ml-auto">Privacy Policy • Terms & Conditions</FooterCaption>
        </Box>
    </Box>;
}
