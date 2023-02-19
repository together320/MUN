
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavTextActive, NavText, ColorButton, BorderButton } from "../../Components";

function NavItem({active, title, url}) {
    const navigate = useNavigate();
    const className = "ml-[60px] cursor-pointer";
    return active === true ?
        <NavTextActive className={className} onClick={() => navigate(url)}>{title}</NavTextActive>
    :
        <NavText className={className} onClick={() => navigate(url)}>{title}</NavText>
}

const routes = [
    {title: "Home", url: "/home"},
    {title: "My Profile", url: "/my-profile"},
    {title: "Lend", url: "/lend"},
    {title: "Borrow", url: "/borrow"},
]

export default function Header() {
    const hash = window.location.hash;
    const navigate = useNavigate();

    return <Box className="px-[60px] py-[24px] flex">
        <img src="/logo.png" alt="Logo" />
        {
            routes.map((item, i) => {
                return <NavItem key={i} active={hash === `#${item.url}`} title={item.title} url={item.url} />
            })
        }
        <span className="mr-auto" />
        <ColorButton className="my-auto" onClick={() => navigate("/mint")}>Get Our NFT</ColorButton>
        <BorderButton className="my-auto ml-[10px]">Connect Wallet</BorderButton>
    </Box>;
}