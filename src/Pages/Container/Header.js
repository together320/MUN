
import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavTextActive, NavText, ColorButton, MobileNavText } from "../../Components";

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import "./WalletMultiButton.css";

function NavItem({active, title, url}) {
    const navigate = useNavigate();
    const className = "ml-[40px] 2xl:ml-[60px] cursor-pointer";
    return active === true ?
        <Box className="flex flex-col justify-center items-center">
            <NavTextActive className={className} onClick={() => navigate(url)}>{title}</NavTextActive>
            <Box className="ml-[40px] 2xl:ml-[60px] mt-[7px] h-[7px] w-[7px] rounded-[7px] bg-[#5C84FF]"></Box>
        </Box>
    :
        <Box className="flex flex-col justify-center">
            <NavText className={className} onClick={() => navigate(url)}>{title}</NavText>
            <Box className="ml-[40px] 2xl:ml-[60px] mt-[7px] h-[7px] w-[7px] rounded-[7px] bg-[#5C84FF]" style={{opacity : 0}}></Box>
        </Box>
}

function MobileNavItem({active, title, url}) {
    const navigate = useNavigate();
    return active === true ?
        <MobileNavText className="cursor-pointer bg-[#222548]" onClick={() => navigate(url)}>{title}</MobileNavText>
    :
        <MobileNavText className="cursor-pointer" onClick={() => navigate(url)}>{title}</MobileNavText>
}

const routes = [
    {title: "Home", url: "/home"},
    {title: "Dashboard", url: "/my-profile"},
    {title: "Lend", url: "/lend"},
    {title: "Borrow", url: "/borrow"},
]

export default function Header() {
    const isDesktop = useMediaQuery('(min-width:1024px)');
    const hash = window.location.hash;
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    if (isDesktop) {
        return <Box className="px-[60px] py-[24px] flex items-center">
            <img src="/logo.png" alt="Logo" />
            {
                routes.map((item, i) => {
                    return <NavItem key={i} active={hash === `#${item.url}`} title={item.title} url={item.url} />
                })
            }
            <span className="mr-auto" />
            <img className="cursor-pointer my-auto mr-[10px]" src="/images/mint/muncat.png" alt="Mun cat" style={{width : '40px', height : '40px'}}/>
            <ColorButton className="my-auto mr-[10px] h-[48px] flex flex-col justify-center" onClick={() => navigate("/mint")}>Get Our NFT</ColorButton>
            <WalletMultiButton />
        </Box>;
    }
    else {
        return <>
            <Box className="py-[12px] px-[24px] flex">
                <img className="w-[64px]" src="/logo.png" alt="Logo" />
                <span className="mr-auto" />
                <img className="my-auto h-fit cursor-pointer" src="/icons/menu.svg" alt="Menu" onClick={() => setOpen(!open)} />
            </Box>
            {open && <Box className="bg-[#1B1E3D] absolute w-full top-[79px]">
            {
                routes.map((item, i) => {
                    return <MobileNavItem key={i} active={hash === `#${item.url}`} title={item.title} url={item.url} />
                })
            }
            <Box className="h-[60px] flex justify-center">
                <WalletMultiButton />
            </Box>
            <Box className="h-[60px] flex justify-center">
                <ColorButton className="items-center w-fit my-auto" onClick={() => navigate("/mint")}>Get Our NFT</ColorButton>
            </Box>
            </Box>}
        </>
    }
}