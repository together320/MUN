
import { useState, useEffect } from "react";

import { Box, useMediaQuery } from "@mui/material";

import styled from "styled-components";

import { LandingCaptionText, SolanaItem, MunF21W600, MunF16W600, MunF42W600, LandingHeaderText, ShareItemHeader, CollectionItemText, CollectionTitleText, CollectionNameText, CollectionButton, CollectionDurationText } from "../../Components";
import Container from "../Container";

const OverviewTab = styled(ShareItemHeader)`
    background: #1B1E3D;
    border-color: #5C84FF;
    border-radius: 50px 0px 0px 50px;
    padding: 16px 35px;
    cursor: pointer;

    @media (max-width: 1024px) {
        padding: 8px 15px;
        font-size: 14px;
        line-height: 22px;
    }
`

const OfferTab = styled(ShareItemHeader)`
    background: #1B1E3D;
    border-color: #5C84FF;
    border-radius: 0px 0px 0px 0px;
    padding: 16px 35px;
    cursor: pointer;

    @media (max-width: 1024px) {
        padding: 8px 15px;
        font-size: 14px;
        line-height: 22px;
    }
`

const LoanTab = styled(ShareItemHeader)`
    background: #1B1E3D;
    border-radius: 0px 50px 50px 0px;
    border-color: #5C84FF;
    padding: 16px 35px;
    cursor: pointer;

    @media (max-width: 1024px) {
        padding: 8px 15px;
        font-size: 14px;
        line-height: 22px;
    }
`

const WaitingBadge = styled('div')`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 8px;
    line-height: 14px;
    /* or 175% */

    text-align: center;

    color: #111430;

    background: #FFBE5C;
    border-radius: 40px;

    height: fit-content;
    margin-top: auto;
    margin-bottom: auto;
`

const LoanBadge = styled(WaitingBadge)`
    background: #38D39C;
`

const loanItems = [
    {img: "/images/mint/Token.png", name: "Essence", borrowed: 2.3, left: 76, duration: 96, repay: 2.3},
]

const offerItems = [
    {img: "/images/mint/Token.png", name: "Essence", offer: 1.1, interest: 0.05, APY: 260, loanToken: false},
    {img: "/images/mint/Token.png", name: "Essence", offer: 1.1, interest: 0.05, APY: 260, loanToken: true},
]

function LoanItem({item}) {
    const isDesktop = useMediaQuery('(min-width:1024px)');

    if (isDesktop) {
        return <Box className="mb-[16px]">
            <Box className={`px-[26px] py-[18px] bg-[#111430] rounded-[12px] grid gap-[20px] 2xl:gap-[60px]`} gridTemplateColumns={'auto 2fr 1fr 3fr 1fr auto'}>
                <Box className="w-[106px] h-[106px] bg-cover" style={{backgroundImage: `url(${item.img})`}} />
                <CollectionNameText className="my-auto break-all">{item.name}</CollectionNameText>
                <SolanaItem value={item.borrowed}/>
                <Box className="my-auto">
                    <CollectionDurationText className="text-center">3 Days and 4 Hours Left</CollectionDurationText>
                    <Box className="mt-[4px] h-[18px] rounded-[10px] bg-[#191E46]">
                        <Box className="rounded-[20px] w-[60%] h-full" sx={{background: "linear-gradient(0deg, #A8B5E0, #A8B5E0), linear-gradient(0deg, #A8B5E0, #A8B5E0), #A8B5E0;"}} />
                    </Box>
                </Box>
                <SolanaItem value={item.repay}/>
                <CollectionButton className="my-auto">Repay</CollectionButton>
            </Box>
        </Box>
    }
    else {
        return <Box className="mb-[12px]">
            <Box className={`px-[10px] pt-[10px] pb-[32px] bg-[#111430] rounded-[12px]`}>
                <Box className="flex mb-[30px]">
                    <Box className="w-[57px] h-[57px] bg-cover" style={{backgroundImage: `url(${item.img})`}} />
                    <CollectionNameText className="ml-[15px] my-auto break-all">{item.name}</CollectionNameText>
                    <CollectionButton className="ml-auto my-auto">Repay</CollectionButton>
                </Box>
                <Box className="px-[40px]">
                    <Box className="flex justify-center mb-[30px]">
                        <Box className="mr-[54px] flex flex-col items-center">
                            <CollectionTitleText className="mb-[4px]">Borrowed</CollectionTitleText>
                            <SolanaItem value={item.borrowed} className="flex mt-[7px]"/>
                        </Box>
                        <Box className=" flex flex-col items-center">
                            <CollectionTitleText className="mb-[4px]">Repay</CollectionTitleText>
                            <SolanaItem value={item.repay} className="flex mt-[7px]"/>
                        </Box>
                    </Box>
                    <CollectionDurationText className="text-center">3 Days and 4 Hours Left</CollectionDurationText>
                    <Box className="mt-[4px] h-[18px] rounded-[10px] bg-[#191E46]">
                        <Box className="rounded-[20px] w-[60%] h-full" sx={{background: "linear-gradient(0deg, #A8B5E0, #A8B5E0), linear-gradient(0deg, #A8B5E0, #A8B5E0), #A8B5E0;"}} />
                    </Box>
                </Box>
            </Box>
        </Box>
    }
}

function OfferItem({item}) {
    const isDesktop = useMediaQuery('(min-width:1024px)');

    if (isDesktop) {
        return <Box className="mb-[16px]">
            <Box className={`px-[26px] py-[18px] bg-[#111430] rounded-[12px] grid gap-[20px] 2xl:gap-[40px]`} gridTemplateColumns={'106px 2fr 1fr 1fr 1fr 1fr auto'}>
                <Box className="w-[106px] h-[106px] bg-cover" style={{backgroundImage: `url(${item.img})`}} />
                <CollectionNameText className="my-auto break-all">{item.name}</CollectionNameText>
                <SolanaItem value={item.offer}/>
                <SolanaItem value={item.interest}/>
                <CollectionItemText className="my-auto break-all !text-[#38D39C] text-center">{item.APY} %</CollectionItemText>
                {
                    item.loanToken ?
                    <LoanBadge className="p-[2px]">Loan Token</LoanBadge>
                    : <WaitingBadge className="p-[2px]">Waiting for borrowers</WaitingBadge>
                }
                {
                    item.loanToken ?
                    <Box className="my-auto w-[116px] 2xl:w-[174px]">
                        <CollectionDurationText className="text-center">3 Days and 4 Hours Left</CollectionDurationText>
                        <Box className="mt-[4px] h-[18px] rounded-[10px] bg-[#191E46]">
                            <Box className="rounded-[20px] w-[60%] h-full" sx={{background: "linear-gradient(0deg, #A8B5E0, #A8B5E0), linear-gradient(0deg, #A8B5E0, #A8B5E0), #A8B5E0;"}} />
                        </Box>
                    </Box>
                    : <CollectionButton className="my-auto">Revoke</CollectionButton>
                }
                
            </Box>
        </Box>
    }
    else {
        return <Box className="mb-[12px]">
            <Box className={`px-[10px] pt-[10px] pb-[32px] bg-[#111430] rounded-[12px]`}>
                <Box className="flex mb-[30px]">
                    <Box className="w-[57px] h-[57px] bg-cover" style={{backgroundImage: `url(${item.img})`}} />
                    <CollectionNameText className="ml-[15px] my-auto break-all mr-auto">{item.name}</CollectionNameText>
                    {
                        item.loanToken ? "" :
                        <CollectionButton className="my-auto">Revoke</CollectionButton>
                    }
                </Box>
                <Box className="grid grid-cols-3 gap-[4px] px-[15px]">
                    <CollectionTitleText className="text-center">Loan</CollectionTitleText>
                    <CollectionTitleText className="text-center">Interest</CollectionTitleText>
                    <CollectionTitleText className="text-center">APY</CollectionTitleText>
                    <SolanaItem value={item.offer} className="flex mt-[7px] justify-center"/>
                    <SolanaItem value={item.interest} className="flex mt-[7px] justify-center"/>
                    <CollectionItemText className="my-auto break-all !text-[#38D39C] mt-[7px] text-center">{item.APY} %</CollectionItemText>
                </Box>
                <CollectionTitleText className="mt-[30px] mb-[12px] text-center">Status</CollectionTitleText>
                <Box className="flex justify-center">
                    <Box className="w-[203px]">
                    {
                        item.loanToken ?
                        <Box>
                            <LoanBadge className="p-[8px]">Loan Token</LoanBadge>
                            <CollectionDurationText className="text-center mt-[20px]">3 Days and 4 Hours Left</CollectionDurationText>
                            <Box className="mt-[4px] h-[18px] rounded-[10px] bg-[#191E46]">
                                <Box className="rounded-[20px] w-[60%] h-full" sx={{background: "linear-gradient(0deg, #A8B5E0, #A8B5E0), linear-gradient(0deg, #A8B5E0, #A8B5E0), #A8B5E0;"}} />
                            </Box>
                        </Box>
                        : <WaitingBadge className="p-[8px]">Waiting for borrowers</WaitingBadge>
                    }
                    </Box>
                </Box>
            </Box>
        </Box>
    }
}

export default function Profile() {
    const [state, setState] = useState(1);
    const isDesktop = useMediaQuery('(min-width:1024px)');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const renderLoan = () => {
        return <>
            {
                isDesktop ?
                <Box className="hidden lg:grid px-[26px] gap-[20px] 2xl:gap-[60px]" gridTemplateColumns={'106px 2fr 1fr 3fr 1fr auto'}>
                    <CollectionItemText className="my-auto break-all text-center !text-[#9395AA]">Collection</CollectionItemText>
                    <Box />
                    <CollectionItemText className="my-auto break-all text-center !text-[#9395AA]">Borrowed</CollectionItemText>
                    <CollectionItemText className="my-auto break-all text-center !text-[#9395AA]">Duration</CollectionItemText>
                    <CollectionItemText className="my-auto break-all text-center !text-[#9395AA]">Repay</CollectionItemText>
                    <CollectionButton className="invisible">Repay</CollectionButton>
                </Box>
                :
                <ShareItemHeader>
                    Collections
                </ShareItemHeader>
            }
            <Box className="mb-[26px]" />
            {
                loanItems.map((item, i) => {
                    return <LoanItem item={item} key={i} />
                })
            }
        </>
    }

    const renderOffer = () => {
        return <>
            {
                isDesktop ?
                <Box className="hidden lg:grid px-[26px] gap-[20px] 2xl:gap-[40px]" gridTemplateColumns={'106px 2fr 1fr 1fr 1fr 1fr auto'}>
                    <CollectionItemText className="my-auto break-all !text-[#9395AA] text-center">Collection</CollectionItemText>
                    <Box />
                    <CollectionItemText className="my-auto break-all !text-[#9395AA] text-center" style={{whiteSpace : 'nowrap'}}>Loan amount</CollectionItemText>
                    <CollectionItemText className="my-auto break-all !text-[#9395AA] text-center">Interest</CollectionItemText>
                    <CollectionItemText className="my-auto break-all !text-[#9395AA] text-center">APY</CollectionItemText>
                    <CollectionItemText className="my-auto break-all !text-[#9395AA] text-center">Status</CollectionItemText>
                    <CollectionButton className="invisible">Revoke</CollectionButton>
                </Box>
                :
                <ShareItemHeader>
                    Collections
                </ShareItemHeader>
            }
            <Box className="mb-[26px]" />
            {
                offerItems.map((item, i) => {
                    return <OfferItem item={item} key={i} />
                })
            }
        </>
    }

    const renderOverview = () => {
        return <>
            <Box className="lg:grid gap-[20px] 2xl:gap-[25px] grid-cols-1 sm:grid-cols-3" gridTemplateColumns={'1fr 1fr 1fr'}>
                <Box className="flex flex-col bg-[#1B1E3D] rounded-[12px] p-[35px] justify-center mb-[10px]">
                    <Box className="flex justify-center mb-[35px]">
                        <MunF21W600 className="!text-[#D3D5E3]">My Pools</MunF21W600>
                    </Box>
                    <Box className="flex justify-around">
                        <MunF21W600 className="!text-[#D3D5E3]">130 SOL</MunF21W600>
                        <MunF21W600 className="!text-[#D3D5E3]">4 Pools</MunF21W600>
                    </Box>
                </Box>
                <Box className="flex flex-col mb-[10px]">
                    <Box className="flex justify-around  bg-[#1B1E3D] rounded-[12px] p-[35px] mb-[10px]">
                        <MunF16W600 className="!text-[#D3D5E3]">Loans Granted</MunF16W600>
                        <SolanaItem value={129.6}/>
                    </Box>
                    <Box className="flex justify-around  bg-[#1B1E3D] rounded-[12px] p-[35px]">
                        <MunF16W600 className="!text-[#D3D5E3]">Loans Taken</MunF16W600>
                        <SolanaItem value={61.7}/>
                    </Box>
                </Box>
                <Box className="flex flex-col bg-[#1B1E3D] rounded-[12px] p-[35px] justify-center mb-[10px]">
                    <Box className="flex justify-center mb-[35px]">
                        <MunF21W600 className="!text-[#D3D5E3]">Total Solana Earned</MunF21W600>
                    </Box>
                    <Box className="flex justify-center items-center">
                        <img className="my-auto h-[34px] mr-[10px]" src="/images/sol.png" alt="SolanaText"/>
                        <MunF42W600 className="!text-[#D3D5E3] !text-[36px] sm:text-[42px]">13.4</MunF42W600>
                    </Box>
                </Box>
                <Box className="flex flex-col bg-[#1B1E3D] rounded-[12px] p-[35px] justify-center mb-[10px]">
                    <Box className="flex justify-center mb-[35px]">
                        <MunF21W600 className="!text-[#D3D5E3]">Total Liquidity</MunF21W600>
                    </Box>
                    <Box className="flex justify-center items-center">
                        <img className="my-auto h-[24px] 2xl:h-[34px] mr-[10px]" src="/images/sol.png" alt="SolanaText"/>
                        <MunF42W600 className="!text-[#D3D5E3]">13,449</MunF42W600>
                    </Box>
                </Box>
                <Box className="flex flex-col bg-[#1B1E3D] rounded-[12px] p-[35px] justify-center mb-[10px]">
                    <Box className="flex justify-center mb-[35px]">
                        <MunF21W600 className="!text-[#D3D5E3]">Total Volume</MunF21W600>
                    </Box>
                    <Box className="flex justify-center items-center">
                        <img className="my-auto h-[24px] 2xl:h-[34px] mr-[10px]" src="/images/sol.png" alt="SolanaText"/>
                        <MunF42W600 className="!text-[#D3D5E3]">182,537</MunF42W600>
                    </Box>
                </Box>
                <Box className="flex flex-col bg-[#1B1E3D] rounded-[12px] p-[35px] justify-center mb-[10px]">
                    <Box className="flex justify-center mb-[35px]">
                        <MunF21W600 className="!text-[#D3D5E3]">Total Loans</MunF21W600>
                    </Box>
                    <Box className="flex justify-center items-center">
                        <img className="my-auto h-[24px] 2xl:h-[34px] mr-[10px]" src="/images/sol.png" alt="SolanaText"/>
                        <MunF42W600 className="!text-[#D3D5E3]">2466</MunF42W600>
                    </Box>
                </Box>
            </Box>
    </>
    }

    return <Container>
        <Box className="mt-[30px] mx-[20px] lg:mt-[120px] lg:mx-[120px] xl:mx-[240px] 2xl:mx-[360px]">
            <Box className="flex flex-row">
                <Box className="pt-[13px] sm:pt-[15px] 2xl:pt-[30px] " style={{width : '7px', height : 'auto', marginRight : '20px'}}>
                    <Box className="w-[7px] bg-[#5C84FF] rounded-[8px] h-[60px] lg:h-[100px]"/>
                </Box>
                <Box className="flex flex-col">
                    <LandingHeaderText className="mb-[10px]">
                        DASHBOARD
                    </LandingHeaderText>
                    <LandingCaptionText className="mb-[40px] sm:mb-[100px]" style={{color : '#9395AA'}}>
                        Your dashboard is where you can preview and manage your loans as well<br/>
                        as checking your account stats.
                    </LandingCaptionText>
                </Box>
            </Box>
            <Box className="flex mb-[32px]">
                <OverviewTab className={`${state == 0 ? "border-[1px]" : ""}`} onClick={() => setState(0)}>Overview</OverviewTab>
                <OfferTab className={`${state == 1 ? "border-[1px]" : ""}`} onClick={() => setState(1)}>Offers</OfferTab>
                <LoanTab className={`${state == 2 ? "border-[1px]" : ""}`} onClick={() => setState(2)}>Loans</LoanTab>
            </Box>
            {
                state == 1 ? renderOffer() : (state == 2 ? renderLoan() : renderOverview())
            }
        </Box>
    </Container>;
}