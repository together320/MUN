
import { useState, useEffect } from "react";

import { pink } from '@mui/material/colors';
import { Box, useMediaQuery, Checkbox } from "@mui/material";
import Stack from '@mui/material/Stack';
import { MintPriceValue, MintPriceText, SolanaItem, CollectionDurationText, MunF21W600, CollectionItemText, CollectionNameText, LandingCaptionText, LandingHeaderText, ShareItemHeader, CollectionButton, CollectionColorButton, CollectionCashText, MUNFixedInput, AmountButton, CollectionTitleText, BorderButton } from "../../Components";
import { InterestButton } from "../../Components";
import Container from "../Container";
import { AmountInput } from "../../Components";
import { GetCollectionList } from "../../Api/magicEden";

const items = [
    {img: "/images/mint/Bonkz.png", name: "bonkz"},
    {img: "/images/mint/Bonkz.png", name: "bonkz"},
    {img: "/images/mint/Bonkz.png", name: "bonkz"},
    {img: "/images/mint/Bonkz.png", name: "bonkz"},
    {img: "/images/mint/Bonkz.png", name: "bonkz"},
    {img: "/images/mint/Bonkz.png", name: "bonkz"},
    {img: "/images/mint/Bonkz.png", name: "bonkz"},
    {img: "/images/mint/Bonkz.png", name: "bonkz"},
    {img: "/images/mint/Bonkz.png", name: "bonkz"},
    {img: "/images/mint/Bonkz.png", name: "bonkz"},
    {img: "/images/mint/Bonkz.png", name: "bonkz"},
]

function DesktopCollectionItem({item}){
    return <Box className="flex py-[9px] px-[13px] items-center bg-[#1B1E3D] rounded-[6px] mr-[20px]">
        <img src={item.img} alt="collection" style={{width: '65px', height: '65px', maxWidth : '65px'}} />
        <MintPriceText className="flex ml-[14px] mr-[18px]" style={{color : '#6B6B6B'}}>{item.name}</MintPriceText>
    </Box>
}

function MobileCollectionItem({item}){
    return <Box className="flex py-[9px] px-[13px] mb-[10px] items-center bg-[#1B1E3D] rounded-[6px]">
        <img src={item.img} alt="collection" style={{width: '45px', height: '45px', maxWidth : '45px'}} />
        <MintPriceText className="flex ml-[14px] mr-[18px]" style={{color : '#6B6B6B'}}>{item.name}</MintPriceText>
    </Box>
}

export default function Lend() {
    const isDesktop = useMediaQuery('(min-width:1024px)');
    const [interest, setInterest] = useState(0);

    const [duration, setDuration] = useState([true, true, true, true]);

    useEffect(() => {
        /* GetCollectionList()
        .then((res) => {
            console.log(res);
        })
        .catch((e) => {
        }); */
    }, [])
    const renderLendingWithNoNFT = () => {
        return <Box className={`rounded-[12px] md:px-[42px] px-[10px] md:py-[36px] py-[10px] bg-[#111430] grid gap-[20px] 2xl:gap-[60px]`}>
        <Box className="flex flex-row">
            <MintPriceValue className="my-auto break-all font-semibold">Choose Collections</MintPriceValue>
            <Checkbox defaultChecked sx={{
                color: '#3E4162',
                '&.Mui-checked': {
                color: '#fff',
                },
            }}
            />
            <CollectionTitleText className="my-auto break-all">Choose all</CollectionTitleText>
        </Box>
        {
            isDesktop ? 
            <Box className="flex flex-row w-full overflow-auto">
                    {
                        items.map((item, index) => (
                            <DesktopCollectionItem key={index} item={item}/>
                        ))
                    }
            </Box> : <Box className="flex flex-col h-[300px] w-full overflow-auto">
                    {
                        items.map((item, index) => (
                            <MobileCollectionItem key={index} item={item}/>
                        ))
                    }
            </Box>
        }
        <Box className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] pt-[10px]">
            <Box className=""></Box>
            <Box className="text-center text-[14px] md:text-[21px] text-white"><MintPriceValue>Potential Earnings</MintPriceValue></Box>
            <Box className="bg-[#1B1E3D] rounded-[6px] px-[10px] py-[10px] sm:px-[15px] sm:py-[15px] lg:px-[30px] lg:py-[20px] flex flex-row justify-center items-center">
                <AmountInput placeholder="Enter deposit amount..." className="flex-1 w-full"/>
                <img className="w-[1em] ml-auto my-auto h-[1em] flex" src="/images/cash.png" alt="Cash" />
            </Box>
            <Box className="bg-[#1B1E3D] rounded-[6px] px-[10px] py-[10px] sm:px-[15px] sm:py-[25px] lg:px-[30px] lg:py-[40px] grid grid-cols-3 gap-[10px] sm:gap-[40px]">
                <Box className="flex flex-col items-center">
                    <MintPriceText>1 week</MintPriceText>
                    <CollectionCashText className="mt-[8px]">+1.2 SOL</CollectionCashText>
                </Box>
                <Box className="flex flex-col items-center">
                    <MintPriceText>1 month</MintPriceText>
                    <CollectionCashText className="mt-[8px]">+4.5 SOL</CollectionCashText>
                </Box>
                <Box className="flex flex-col items-center">
                    <MintPriceText>1 year</MintPriceText>
                    <CollectionCashText className="mt-[8px]">+130 SOL</CollectionCashText>
                </Box>
            </Box>
        </Box>
        <Box className="flex justify-center sm:justify-end">
            <CollectionColorButton style={{fontFamily : 'Good Times'}}>START LENDING</CollectionColorButton>
        </Box>
    </Box>
    }

    const renderLendingWithNFT = () => {
        return <Box className={`rounded-[12px] md:px-[42px] px-[10px] md:py-[36px] py-[10px] bg-[#111430] grid gap-[20px] 2xl:gap-[60px]`}>
        <Box className="flex flex-row">
            <MintPriceValue className="my-auto break-all font-semibold">Choose Collections</MintPriceValue>
            <Checkbox defaultChecked sx={{
                color: '#3E4162',
                '&.Mui-checked': {
                color: '#fff',
                },
            }}
            />
            <CollectionTitleText className="my-auto break-all">Choose all</CollectionTitleText>
        </Box>
        {
            isDesktop ? 
            <Box className="flex flex-row w-full overflow-auto h-scroll pb-[10px]">
                    {
                        items.map((item, index) => (
                            <DesktopCollectionItem key={index} item={item}/>
                        ))
                    }
            </Box> : <Box className="flex flex-col h-[300px] w-full overflow-auto">
                    {
                        items.map((item, index) => (
                            <MobileCollectionItem key={index} item={item}/>
                        ))
                    }
            </Box>
        }
        <Box className="grid grid-cols-1 sm:grid-cols-2 gap-[30px] pt-[10px]">
            <Box className="bg-[#1B1E3D] rounded-[6px] px-[5px] sm:px-[15px] sm:py-[25px] lg:px-[30px] flex flex-col justify-between">
                <Box className="text-[14px] md:text-[21px] text-white"><MintPriceValue>Interest</MintPriceValue></Box>
                <Box className="pt-[16px] flex">
                    <BorderButton className="w-[100px] text-center mr-[6px] sm:mr-[12px]" style={{borderColor : `${interest == 0 ? '#38D39C' : '#727272'}`, color : `${interest == 0 ? '#38D39C' : '#727272'}`}} onClick={() => setInterest(0)}>Low</BorderButton>
                    <BorderButton className="w-[100px] text-center mr-[6px] sm:mr-[12px]" style={{borderColor : `${interest == 1 ? '#38D39C' : '#727272'}`, color : `${interest == 1 ? '#38D39C' : '#727272'}`}} onClick={() => setInterest(1)}>Medium</BorderButton>
                    <BorderButton className="w-[100px] text-center mr-[6px] sm:mr-[12px]" style={{borderColor : `${interest == 2 ? '#38D39C' : '#727272'}`, color : `${interest == 2 ? '#38D39C' : '#727272'}`}} onClick={() => setInterest(2)}>High</BorderButton>
                </Box>
                <Box className="text-[14px] md:text-[21px] text-white mt-[24px]"><MintPriceValue>Loans Duration</MintPriceValue></Box>
                <Box className="my-[16px] flex  overflow-auto noscroll">
                    <BorderButton className="w-[100px] text-center mr-[2px] sm:mr-[12px]" style={{borderColor : `${duration[0] == true ? '#5C84FF' : '#727272'}`, color : `${duration[0] == true ? '#5C84FF' : '#727272'}`, width : '100px'}} onClick={() => setDuration([!duration[0], duration[1], duration[2], duration[3]])}>1 day</BorderButton>
                    <BorderButton className="w-[100px] text-center mr-[2px] sm:mr-[12px]" style={{borderColor : `${duration[1] == true ? '#5C84FF' : '#727272'}`, color : `${duration[1] == true ? '#5C84FF' : '#727272'}`}} onClick={() => setDuration([duration[0], !duration[1], duration[2], duration[3]])}>7 days</BorderButton>
                    <BorderButton className="w-[100px] text-center mr-[2px] sm:mr-[12px]" style={{borderColor : `${duration[2] == true ? '#5C84FF' : '#727272'}`, color : `${duration[2] == true ? '#5C84FF' : '#727272'}`}} onClick={() => setDuration([duration[0], duration[1], !duration[2], duration[3]])}>14 days</BorderButton>
                    <BorderButton className="w-[100px] text-center mr-[2px] sm:mr-[12px]" style={{borderColor : `${duration[3] == true ? '#5C84FF' : '#727272'}`, color : `${duration[3] == true ? '#5C84FF' : '#727272'}`}} onClick={() => setDuration([duration[0], duration[1], duration[2], !duration[3]])}>30 days</BorderButton>
                </Box>
            </Box>
            <Box className="flex flex-col">
                <Box className="bg-[#1B1E3D] rounded-[6px] px-[10px] py-[10px] sm:px-[15px] sm:py-[15px] lg:px-[30px] lg:py-[30px] flex flex-row justify-center items-center">
                    <AmountInput placeholder="Enter deposit amount..." className="flex-1 w-full pr-[10px]"/>
                    <img className="w-[1em] ml-auto my-auto h-[1em] flex" src="/images/cash.png" alt="Cash" />
                </Box>
                <Box className="text-center text-[14px] md:text-[21px] text-white my-[15px]"><MintPriceValue>Potential Earnings</MintPriceValue></Box>
                <Box className="bg-[#1B1E3D] rounded-[6px] px-[10px] py-[10px] sm:px-[15px] sm:py-[25px] lg:px-[30px] lg:py-[40px] grid grid-cols-3 gap-[10px] sm:gap-[40px]">
                    <Box className="flex flex-col items-center">
                        <MintPriceText>1 week</MintPriceText>
                        <CollectionCashText className="mt-[8px]">+1.2 SOL</CollectionCashText>
                    </Box>
                    <Box className="flex flex-col items-center">
                        <MintPriceText>1 month</MintPriceText>
                        <CollectionCashText className="mt-[8px]">+4.5 SOL</CollectionCashText>
                    </Box>
                    <Box className="flex flex-col items-center">
                        <MintPriceText>1 year</MintPriceText>
                        <CollectionCashText className="mt-[8px]">+130 SOL</CollectionCashText>
                    </Box>
                </Box>
            </Box>
            <Box className="flex flex-row flex-wrap items-center">
                <Box className="bg-[#1B1E3D] rounded-[6px] px-[10px] py-[10px] sm:px-[15px] sm:py-[15px] lg:px-[30px] lg:py-[30px] flex flex-row flex-wrap items-center">
                    <AmountInput placeholder="Your offer..." className="pr-[10px]"/>
                    <LandingCaptionText style={{fontSize : '16px', fontWeight : 600}}>% of floor price</LandingCaptionText>
                </Box>
                <Box className="flex flex-row items-center pt-[10px] sm:pt-[25px]">
                <Checkbox defaultChecked sx={{
                    color: '#3E4162',
                    '&.Mui-checked': {
                    color: '#fff',
                    },
                }}
                />
                <CollectionTitleText className="my-auto w-max" style={{whiteSpace : 'nowrap'}}>Use recommended</CollectionTitleText>
                </Box>
            </Box>
            <Box className="ml-auto mt-auto">
                <CollectionColorButton>START LENDING</CollectionColorButton>
            </Box>
        </Box>
    </Box>
    }

    return <Container>
        <Box className="mt-[30px] mx-[20px] lg:mt-[120px] lg:mx-[120px] xl:mx-[240px] 2xl:mx-[360px]">
            <Box className="flex flex-row">
                <Box className="pt-[13px] sm:pt-[15px] 2xl:pt-[30px] " style={{width : '7px', height : 'auto', marginRight : '20px'}}>
                    <Box className="w-[7px] bg-[#5C84FF] rounded-[8px] h-[60px] lg:h-[100px]"/>
                </Box>
                <Box className="flex flex-col">
                    <LandingHeaderText className="mb-[10px]">
                        Lend SOL
                    </LandingHeaderText>
                    <LandingCaptionText className="mb-[40px] sm:mb-[100px]" style={{color : '#9395AA'}}>
                        Make lend offers against NFT’s and get interest. <br/>
                        After making the lend offer, users will be able to loan SOL from <br/>
                        you against their NFT, if they fail to pay on time, you will receive <br/>
                        ownership of the NFT they put as collateral for the loan.
                    </LandingCaptionText>
                </Box>
            </Box>
            <Box className="mb-[26px]"/>
            {/* {renderLendingWithNoNFT()} */}
            {renderLendingWithNFT()}
            <Box className="mb-[40px] sm:mb-[140px]"/>
            {
                isDesktop ?
            <>
            <MunF21W600 className="mb-[10px] sm:mb-[20px] px-[26px]">My Pools</MunF21W600>
            <LandingCaptionText className="mb-[40px] sm:mb-[100px] px-[26px]" style={{color : '#9395AA'}}>
                Make lend offers against NFT’s and get interest. <br/>
                After making the lend offer, users will be able to loan SOL from <br/>
                you against their NFT, if they fail to pay on time, you will receive <br/>
                ownership of the NFT they put as collateral for the loan.
            </LandingCaptionText>
            <Box className="hidden lg:grid px-[26px] gap-[20px] 2xl:gap-[60px]" gridTemplateColumns={'106px 10fr 10fr 10fr 11fr 11fr auto'}>
                <CollectionTitleText style={{textAlign : 'center'}}>Collections</CollectionTitleText>
                <CollectionTitleText style={{textAlign : 'center'}}>Sol Earned</CollectionTitleText>
                <CollectionTitleText style={{textAlign : 'center'}}>Offer / Floor</CollectionTitleText>
                <CollectionTitleText style={{textAlign : 'center'}}>Interest</CollectionTitleText>
                <CollectionTitleText style={{textAlign : 'center'}}>Durations</CollectionTitleText>
            </Box>
            <Box className="mb-[26px]" />
            <Box className={`px-[26px] py-[18px] bg-[#111430] rounded-[12px] grid gap-[20px] 2xl:gap-[60px]`} gridTemplateColumns={'106px 10fr 10fr 10fr 11fr 11fr auto'}>
                <Box className="grid grid-cols-3 gap-[5px]">
                    <img className="my-auto w-[53px]" src="/images/mint/Token.png" alt="SolanaText" />
                    <img className="my-auto w-[53px]" src="/images/mint/Token.png" alt="SolanaText" />
                    <img className="my-auto w-[53px]" src="/images/mint/Token.png" alt="SolanaText" />
                    <img className="my-auto w-[53px]" src="/images/mint/Token.png" alt="SolanaText" />
                </Box>
                <SolanaItem value={2.3} className="flex flex-row items-center justify-center"/>
                <Box className="flex justify-center">
                    <CollectionItemText className="my-auto break-all">&nbsp;70%</CollectionItemText>
                </Box>
                <Box className="flex justify-center items-center">
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] text-center mr-[5px] !text-[#666880]">L</InterestButton>
                    <InterestButton className="bg-[#FFBE5C] w-[32px] h-[32px] text-center mr-[5px]">M</InterestButton>
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] text-center mr-[5px] !text-[#666880]">H</InterestButton>
                </Box>
                <Box className="flex justify-center items-center">
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] text-center mr-[5px] !text-[#5C84FF]">1</InterestButton>
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] text-center mr-[5px] !text-[#5C84FF]">7</InterestButton>
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] text-center mr-[5px] !text-[#666880]">14</InterestButton>
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] text-center mr-[5px] !text-[#666880]">30</InterestButton>
                </Box>
                <CollectionButton className="my-auto" style={{width : 'fit-content'}}>Close Pool / Withdraw</CollectionButton>
            </Box>
            </> : ""
            }
        </Box>
    </Container>;
}