

import { useEffect } from "react";

import { Box, IconButton, useMediaQuery, Switch } from "@mui/material";

import { MintPriceValue, ButtonText } from "../../Components";
import Container from "../Container";

import TextField from '@mui/material/TextField';

import DeleteIcon from '@mui/icons-material/Delete';

const searchItems = [
    {img: "/images/mint/Token.png", name: "bonkz"},
    {img: "/images/mint/Token.png", name: "bonkz"},
    {img: "/images/mint/Token.png", name: "bonkz"},
    {img: "/images/mint/Token.png", name: "bonkz"},
    {img: "/images/mint/Token.png", name: "bonkz"},
    {img: "/images/mint/Token.png", name: "bonkz"},
    {img: "/images/mint/Token.png", name: "bonkz"},
]

const listedItems = [
    {img: "/images/mint/Token.png", name: "bonkz"},
    {img: "/images/mint/Token.png", name: "bonkz"},
    {img: "/images/mint/Token.png", name: "bonkz"},
    {img: "/images/mint/Token.png", name: "bonkz"},
    {img: "/images/mint/Token.png", name: "bonkz"},
    {img: "/images/mint/Token.png", name: "bonkz"},
]

const SearchItem = ({item}) => {
    return <Box className="bg-[#292C4E] rounded-[6px] p-[10px] flex">
        <img className="mr-[15px] my-auto !h-[60px] !w-[60px] rounded-[10px]" src={item.img} alt={item.name} />
        <ButtonText className="!text-[#6B6B6B] my-auto mr-auto">{item.name}</ButtonText>
    </Box>
}

const ListedItem = ({item}) => {
    return <Box className="bg-[#292C4E] rounded-[6px] p-[10px] flex">
        <img className="mr-[15px] my-auto !h-[60px] !w-[60px] rounded-[10px]" src={item.img} alt={item.name} />
        <ButtonText className="!text-[#6B6B6B] my-auto mr-auto">{item.name}</ButtonText>
        <IconButton className="!my-auto !text-[#EB5757]">
            <DeleteIcon/>
        </IconButton>
    </Box>
}

export default function Admin() {
    const isDesktop = useMediaQuery('(min-width:1024px)');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <Container>
        <Box className="mt-[30px] mx-[20px] lg:mt-[60px] lg:mx-[120px] xl:mx-[240px] 2xl:mx-[360px]">
            <Box className="grid grid-cols-2 gap-x-[40px] gap-y-[30px]">
                <MintPriceValue className="text-center">Add collection</MintPriceValue>
                <MintPriceValue className="text-center">Collections listed</MintPriceValue>
                <Box className="bg-[#1B1E3D] rounded-[10px] h-[420px] grid">
                    <TextField 
                        fullWidth
                        placeholder="Search ..."
                        sx={{
                            "& .MuiInputBase-root": {
                                borderRadius: "10px",
                                border: "1px solid #454545",
                                outline: 0,
                                color: "#888888"
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "0px !important"
                            }
                        }} />
                    <Box className="px-[40px] py-[20px] flex flex-col gap-[15px] h-full overflow-y-auto">
                        {searchItems.map((item, i) => {
                            return <SearchItem item={item} key={i} />
                        })}
                    </Box>
                </Box>
                <Box className="bg-[#1B1E3D] rounded-[10px] h-[420px] px-[40px] py-[15px] flex flex-col gap-[15px] overflow-y-auto">
                    {listedItems.map((item, i) => {
                        return <ListedItem item={item} key={i} />
                    })}
                </Box>
            </Box>
            <Box className="p-[90px]">
                <Box className="grid grid-cols-3 gap-[40px]">
                    <MintPriceValue className="text-center">set low daily interest</MintPriceValue>
                    <MintPriceValue className="text-center">set medium daily interest</MintPriceValue>
                    <MintPriceValue className="text-center">set high daily interest</MintPriceValue>
                    <MintPriceValue className="bg-[#1B1E3D] rounded-[10px] p-[24px] text-center">
                        0.3%
                    </MintPriceValue>
                    <MintPriceValue className="bg-[#1B1E3D] rounded-[10px] p-[24px] text-center">
                        0.5%
                    </MintPriceValue>
                    <MintPriceValue className="bg-[#1B1E3D] rounded-[10px] p-[24px] text-center">
                        0.7%
                    </MintPriceValue>
                </Box>
                <Box className="pt-[80px] flex gap-[30px]">
                    <MintPriceValue className="my-auto w-[260px] text-center">change mint price</MintPriceValue>
                    <MintPriceValue className="bg-[#1B1E3D] rounded-[10px] p-[24px] w-[260px] text-center">
                        1
                    </MintPriceValue>
                    <MintPriceValue className="my-auto">SOL</MintPriceValue>
                </Box>
                <Box className="pt-[80px] flex gap-[30px]">
                    <MintPriceValue className="my-auto w-[260px] text-center">mint off/on</MintPriceValue>
                    <Switch sx={{
                        "&.MuiSwitch-root": {
                            height: "32px",
                            padding: 0,
                            borderRadius: "16px"
                        },
                        "& .MuiButtonBase-root": {
                            height: "32px"
                        },
                        "& .MuiSwitch-thumb": {
                            color: "white"
                        },
                        "& .MuiSwitch-track": {
                            backgroundColor: "#1380e0 !important",
                            opacity: "1 !important"
                        },
                        "& .Mui-checked": {
                            "& .MuiSwitch-thumb": {
                                color: "#0c0f2a"
                            },
                        }
                    }}/>
                </Box>
                <Box className="pt-[80px] flex gap-[30px]">
                    <MintPriceValue className="my-auto w-[260px] text-center">mint limit (incase i want to limit the mint only for 2k sales)</MintPriceValue>
                    <MintPriceValue className="bg-[#1B1E3D] rounded-[10px] p-[24px] w-[260px] text-center h-fit my-auto">
                        16,222
                    </MintPriceValue>
                    <MintPriceValue className="my-auto"> / 22,222</MintPriceValue>
                </Box>
            </Box>
        </Box>
    </Container>;
}