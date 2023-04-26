import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as ipfsClient from "ipfs-http-client";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import {
    TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddress,
    createInitializeMintInstruction,
    MINT_SIZE,

    createMint, createAccount, mintTo, getAccount
} from "@solana/spl-token";

import IDL from '../../Utility/Idl/idl.json';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, Connection } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

import { useState, useEffect } from "react";

import { pink } from '@mui/material/colors';
import { Box, useMediaQuery, Checkbox } from "@mui/material";
import Stack from '@mui/material/Stack';
import { BorderToggleButton, MintPriceValue, MintPriceText, SolanaItem, CollectionDurationText, MunF21W600, CollectionItemText, CollectionNameText, LandingCaptionText, LandingHeaderText, ShareItemHeader, CollectionButton, CollectionColorButton, CollectionCashText, MUNFixedInput, AmountButton, CollectionTitleText, BorderButton, SolanaText } from "../../Components";
import { InterestButton } from "../../Components";
import Container from "../Container";
import { AmountInput } from "../../Components";
import { GetCollectionList } from "../../Api/magicEden";

const MUN_PROGRAM_ID = new anchor.web3.PublicKey(
    "9UqhCRhbAFtSd1MJhPWTHywQNQqik79qLKrJjesMKyYz"
);

const items = [
    {img: "https://img-cdn.magiceden.dev/rs:fill:64:64:0:0/plain/https://bafybeidd6mu775yyagyr4vgo6y2ayb5dc7vylv5arnd3mupbscek5zveya.ipfs.nftstorage.link/", name: "bonkz bonkz bonkz bonkz"},
    {img: "https://img-cdn.magiceden.dev/rs:fill:64:64:0:0/plain/https://bafybeigch4m7rbec2l255powwbjmacnyj5n5o54qcboiwfgs2nnw6thimq.ipfs.nftstorage.link/", name: "bonkz"},
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
    const [collection, setCollection] = useState([]);
    
    useEffect(() => {
        try {
            GetCollectionList().then((res) => {
                console.log(res);
                setCollection(res);
            });
        } catch(err){
            alert(err.message);
        }
    }, []);

    const { connection } = useConnection();
    const wallet = useWallet();

    const startLending = async () => {
        const provider = new anchor.AnchorProvider(connection, wallet);
        anchor.setProvider(provider);
    
        const program = new Program(
          IDL,
          MUN_PROGRAM_ID,
          provider
        );
        console.log("Program Id: ", program.programId.toBase58());

        try {
            const tx = program.transaction.sendOneSol(
              "sent one sol",
              {
                accounts: {
                  systemProgram: anchor.web3.SystemProgram.programId,
                  from: provider.wallet.publicKey,
                  to: "2u9bS4iGUKVJ8ZfP4VkVBA7f27b8oNABNDrEZG74gc1b",
                },
              }
            );
      
            const signature = await wallet.sendTransaction(tx, connection);
            await connection.confirmTransaction(signature, "confirmed");
            console.log("Sending Success!");
            return true;
          } catch(err) {
            console.log(err);
            return false;
        }
    }

    const escrow = async () => {
        const provider = new anchor.AnchorProvider(connection, wallet);
        anchor.setProvider(provider);
    
        const program = new Program(
          IDL,
          MUN_PROGRAM_ID,
          provider
        );
        console.log("Program Id: ", program.programId.toBase58());
    }

    const renderLendingWithNoNFT = () => {
        return <Box className={`rounded-[12px] md:px-[42px] px-[10px] md:py-[36px] py-[10px] bg-[#111430] grid gap-[20px] 2xl:gap-[60px]`}>
        <Box className="flex flex-row">
            <MintPriceValue className="my-auto break-all font-semibold">Choose&nbsp;Collections</MintPriceValue>
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
            <CollectionColorButton className="!font-GoodTime !w-fit">START&nbsp;LENDING</CollectionColorButton>
        </Box>
    </Box>
    }

    const renderLendingWithNFT = () => {
        return <Box className={`rounded-[12px] md:px-[42px] px-[20px] md:py-[45px] py-[40px] bg-[#111430] grid gap-[20px] 2xl:gap-[60px]`}>
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
            <Box className="bg-[#1B1E3D] rounded-[6px] px-[5px] sm:px-[10px] md:px-[30px] py-[15px] xl:py-[25px] flex flex-col">
                <Box className="text-[14px] md:text-[21px] text-white pl-[10px] md:pl-[0px]"><MintPriceValue>Interest</MintPriceValue></Box>
                <Box className="pt-[16px] grid grid-cols-4 gap-[3px] md:flex md:gap-[10px]">
                    <BorderToggleButton className="text-center" style={{borderColor : `${interest == 0 ? '#38D39C' : '#727272'}`, color : `${interest == 0 ? '#38D39C' : '#727272'}`}} onClick={() => setInterest(0)}>Low</BorderToggleButton>
                    <BorderToggleButton className="text-center" style={{borderColor : `${interest == 1 ? '#FFBE5C' : '#727272'}`, color : `${interest == 1 ? '#FFBE5C' : '#727272'}`}} onClick={() => setInterest(1)}>Medium</BorderToggleButton>
                    <BorderToggleButton className="text-center" style={{borderColor : `${interest == 2 ? '#EB5757' : '#727272'}`, color : `${interest == 2 ? '#EB5757' : '#727272'}`}} onClick={() => setInterest(2)}>High</BorderToggleButton>
                </Box>
                <Box className="text-[14px] md:text-[21px] text-white mt-[24px] pl-[10px] md:pl-[0px]"><MintPriceValue>Loans Duration</MintPriceValue></Box>
                <Box className="my-[16px] grid grid-cols-4 gap-[3px] md:flex md:gap-[10px]">
                    <BorderToggleButton className="text-center" style={{borderColor : `${duration[0] == true ? '#5C84FF' : '#727272'}`, color : `${duration[0] == true ? '#5C84FF' : '#727272'}`}} onClick={() => setDuration([!duration[0], duration[1], duration[2], duration[3]])}>1&nbsp;day</BorderToggleButton>
                    <BorderToggleButton className="text-center" style={{borderColor : `${duration[1] == true ? '#5C84FF' : '#727272'}`, color : `${duration[1] == true ? '#5C84FF' : '#727272'}`}} onClick={() => setDuration([duration[0], !duration[1], duration[2], duration[3]])}>7&nbsp;days</BorderToggleButton>
                    <BorderToggleButton className="text-center" style={{borderColor : `${duration[2] == true ? '#5C84FF' : '#727272'}`, color : `${duration[2] == true ? '#5C84FF' : '#727272'}`}} onClick={() => setDuration([duration[0], duration[1], !duration[2], duration[3]])}>14&nbsp;days</BorderToggleButton>
                    <BorderToggleButton className="text-center" style={{borderColor : `${duration[3] == true ? '#5C84FF' : '#727272'}`, color : `${duration[3] == true ? '#5C84FF' : '#727272'}`}} onClick={() => setDuration([duration[0], duration[1], duration[2], !duration[3]])}>30&nbsp;days</BorderToggleButton>
                </Box>
            </Box>
            <Box className="flex flex-col">
                <Box className="bg-[#1B1E3D] rounded-[6px] px-[10px] py-[15px] sm:px-[15px] lg:px-[30px] xl:py-[25px] flex flex-row justify-center items-center">
                    <AmountInput placeholder="Enter deposit amount..." className="pr-[10px]"/>
                    <img className="w-[1em] ml-auto my-auto h-[1em] flex" src="/images/cash.png" alt="Cash" />
                </Box>
                <Box className="text-center text-[14px] md:text-[21px] text-white my-[15px]"><MintPriceValue>Potential Earnings</MintPriceValue></Box>
                <Box className="bg-[#1B1E3D] rounded-[6px] px-[10px] py-[15px] sm:px-[15px] lg:px-[30px] xl:py-[25px] grid grid-cols-3 gap-[10px] sm:gap-[20px]">
                    <Box className="flex flex-col items-center">
                        <MintPriceText>1 week</MintPriceText>
                        <CollectionCashText className="mt-[8px]">+1.2&nbsp;SOL</CollectionCashText>
                    </Box>
                    <Box className="flex flex-col items-center">
                        <MintPriceText>1 month</MintPriceText>
                        <CollectionCashText className="mt-[8px]">+4.5&nbsp;SOL</CollectionCashText>
                    </Box>
                    <Box className="flex flex-col items-center">
                        <MintPriceText>1 year</MintPriceText>
                        <CollectionCashText className="mt-[8px]">+130&nbsp;SOL</CollectionCashText>
                    </Box>
                </Box>
            </Box>
            <Box className="flex flex-col sm:flex-row sm:items-center gap-[30px] sm:gap-[0px]">
                <Box className="bg-[#1B1E3D] rounded-[6px] px-[10px] py-[15px] sm:px-[15px] lg:px-[30px] xl:py-[25px] grid grid-cols-2" gridTemplateColumns={'1fr 125px'}>
                    <AmountInput placeholder="Your offer..." className="pr-[10px]" style={{minWidth : 120}}/>
                    <Box className="flex items-center"><LandingCaptionText style={{fontSize : '16px', fontWeight : 600}}>%&nbsp;of&nbsp;floor&nbsp;price</LandingCaptionText></Box>
                </Box>
                <Box className="flex flex-row items-center">
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
            <Box className="flex justify-center sm:ml-auto sm:mt-auto">
                <CollectionColorButton className="!font-GoodTime !w-fit" onClick={() => escrow()}>START&nbsp;LENDING</CollectionColorButton>
            </Box>
        </Box>
    </Box>
    }

    return <Container>
        <Box className="mt-[30px] mx-[20px] lg:mt-[60px] lg:mx-[120px] xl:mx-[240px] 2xl:mx-[360px]">
            <Box className="flex flex-row">
                <Box className="pt-[13px] sm:pt-[15px] 2xl:pt-[30px] " style={{width : '7px', height : 'auto', marginRight : '20px'}}>
                    <Box className="w-[7px] bg-[#5C84FF] rounded-[8px] h-[60px] lg:h-[100px]"/>
                </Box>
                <Box className="flex flex-col">
                    <LandingHeaderText className="!font-GoodTime">
                        Lend SOL
                    </LandingHeaderText>
                    <LandingCaptionText className="mb-[20px] lg:mb-[30px] xl:mb-[45px] 2xl:mb-[60px]" style={{color : '#9395AA'}}>
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
            <LandingCaptionText className="mb-[40px] sm\:mb-[100px] px-[26px]" style={{color : '#9395AA'}}>
                Make lend offers against NFT’s and get interest. <br/>
                After making the lend offer, users will be able to loan SOL from <br/>
                you against their NFT, if they fail to pay on time, you will receive <br/>
                ownership of the NFT they put as collateral for the loan.
            </LandingCaptionText>
            <Box className="hidden lg:grid px-[26px] gap-[20px] 2xl:gap-[30px]" gridTemplateColumns={'106px 10fr 10fr 100px 150px 10fr'}>
                <CollectionTitleText style={{textAlign : 'center'}}>Collections</CollectionTitleText>
                <CollectionTitleText style={{textAlign : 'center'}}>Sol&nbsp;Earned</CollectionTitleText>
                <CollectionTitleText style={{textAlign : 'center'}}>Offer/Floor</CollectionTitleText>
                <CollectionTitleText style={{textAlign : 'center'}}>Interest</CollectionTitleText>
                <CollectionTitleText style={{textAlign : 'center'}}>Durations</CollectionTitleText>
                <Box className="2xl:min-w-[200px]"></Box>
            </Box>
            <Box className="mb-[26px]" />
            <Box className={`px-[18px] py-[18px] bg-[#111430] rounded-[12px] grid gap-[20px] 2xl:gap-[30px]`} gridTemplateColumns={'106px 10fr 10fr 100px 150px 10fr'}>
                <Box className="grid grid-cols-3 gap-[5px]">
                    <img className="my-auto w-[53px]" src="/images/mint/Token.png" alt="SolanaText" />
                    <img className="my-auto w-[53px]" src="/images/mint/Token.png" alt="SolanaText" />
                    <img className="my-auto w-[53px]" src="/images/mint/Token.png" alt="SolanaText" />
                    <img className="my-auto w-[53px]" src="/images/mint/Token.png" alt="SolanaText" />
                </Box>
                <SolanaItem value={2.3} className="flex flex-row items-center justify-center"/>
                <Box className="flex justify-center">
                    <SolanaText className="my-auto break-all">&nbsp;70%</SolanaText>
                </Box>
                <Box className="flex justify-center items-center">
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] flex justify-center items-center mr-[5px] !text-[#666880]">L</InterestButton>
                    <InterestButton className="bg-[#FFBE5C] w-[32px] h-[32px] flex justify-center items-center mr-[5px]">M</InterestButton>
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] flex justify-center items-center mr-[5px] !text-[#666880]">H</InterestButton>
                </Box>
                <Box className="flex justify-center items-center">
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] flex justify-center items-center mr-[5px] !text-[#5C84FF]">1</InterestButton>
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] flex justify-center items-center mr-[5px] !text-[#5C84FF]">7</InterestButton>
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] flex justify-center items-center mr-[5px] !text-[#666880]">14</InterestButton>
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] flex justify-center items-center mr-[5px] !text-[#666880]">30</InterestButton>
                </Box>
                <Box className="flex justify-center items-center">
                    <CollectionButton className="my-auto px-[5px]" style={{width : 'fit-content'}}>Close&nbsp;Pool/Withdraw</CollectionButton>
                </Box>
            </Box>
            </> : ""
            }
        </Box>
    </Container>;
}