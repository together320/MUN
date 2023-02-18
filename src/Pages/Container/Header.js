
import { Box } from "@mui/material";
import { NavTextActive, NavText, ColorButton, BorderButton } from "../../Components";

function NavItem({active, title, url}) {
    const className = "ml-[60px] cursor-pointer";
    return active === true ?
        <NavTextActive className={className}>{title}</NavTextActive>
    :
        <NavText className={className}>{title}</NavText>
}

export default function Header() {
    return <Box className="px-[60px] py-[24px] flex">
        <img src="/logo.png" alt="Logo" />
        <NavItem active={true} title={"Home"} url={"/home"} />
        <NavItem active={false} title={"My Profile"} url={"/my-profile"} />
        <NavItem active={false} title={"Lend"} url={"/lend"} />
        <NavItem active={false} title={"Borrow"} url={"/borrow"} />
        <span className="mr-auto" />
        <ColorButton className="my-auto">Get Our NFT</ColorButton>
        <BorderButton className="my-auto ml-[10px]">Connect Wallet</BorderButton>
    </Box>;
}