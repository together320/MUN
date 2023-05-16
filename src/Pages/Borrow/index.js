
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import {
    TOKEN_PROGRAM_ID,
    NATIVE_MINT,
} from "@solana/spl-token";


import IDL from '../../Utility/Idl/idl.json';
import { Metaplex, keypairIdentity, walletAdapterIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";

import { useState, useEffect } from "react";

import { Box, useMediaQuery } from "@mui/material";
import { Popover } from 'react-tiny-popover'

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { CollectionNameText, SolanaItem, SolanaText, InterestMobileText, InterestButton, InterestText, CollectionItemText, LandingCaptionText, LandingHeaderText, ShareItemHeader, CollectionButton, CollectionColorButton, CollectionCashText, MintPriceValue, CollectionTitleText } from "../../Components";
import Container from "../Container";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = ['Highest Offer', 'Longest duration', 'Shortest duration', 'Lowest interest'];

const items = [
    {img: "/images/mint/Token.png", name: "Essence", floorPrice: 2.3, bestOffer: 1.1, interest: 0.09, Duration: 21},
    {img: "/images/mint/Token.png", name: "Essence", floorPrice: 2.3, bestOffer: 1.1, interest: 0.09, Duration: 21}
]

const InfoNotify = ({content}) => {
    const [isPopover, setPopover] = useState(false);

    return <Popover
    isOpen={isPopover}
    positions={['bottom', 'left']} // if you'd like, you can limit the positions
    padding={10} // adjust padding here!
    reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
    onClickOutside={() => setPopover(false)} // handle click events outside of the popover/target here!
    content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
        <Box className="bg-[#24284A] py-[7px] px-[15px] text-[13px] text-[#BFC4F2] border border-[#51578C] rounded-[4px]">
            {content}
        </Box>
    )}
    >
    <ErrorOutlineIcon fontSize="small" onClick={() => setPopover(true)}/>
</Popover>
}

function BorrowItem({item}) {
    const isDesktop = useMediaQuery('(min-width:1024px)');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(options[0]);
    const [isDropdown, setDropDown] = useState(false);

    const classes = open ? "rounded-t-[12px]" : "rounded-[12px]";

    const { connection } = useConnection();
    const wallet = useWallet();

    const startBorrow = async () => {
        const keypair = Keypair.generate();
        const metaplex = new Metaplex(connection);
        metaplex.use(keypairIdentity(keypair));

        /* const mintAddress = new PublicKey(
            "Ay1U9DWphDgc7hq58Yj1yHabt91zTzvV2YJbAWkPNbaK"
        );
        
        const nft = await metaplex.nfts().findByMint({ mintAddress });
    
        console.log("minted nft", nft.json); */

        const owner = new PublicKey(wallet.publicKey);
        const allNFTs = await metaplex.nfts().findAllByOwner({owner});
        console.log(allNFTs);
        return;
    }

    if (isDesktop) {
        return <Box className="mb-[16px]">
            <Box className={`px-[26px] py-[18px] bg-[#111430] ${classes} grid gap-[5px] 2xl:gap-[10px]`} gridTemplateColumns={'80px 96px 30fr 20fr 40fr 40fr 20fr'} style={{minWidth : 'fit-content'}}>
                <Box className="w-[80px] h-[80px] bg-cover" style={{backgroundImage: `url(${item.img})`}} />
                <CollectionNameText className="my-auto break-all text-center">{item.name}</CollectionNameText>
                <SolanaItem value={item.floorPrice} style={{minWidth : '80px'}}/>
                <SolanaItem value={item.bestOffer} style={{minWidth : '70px'}}/>
                <Box className="flex justify-center items-center">
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] flex items-center justify-center mr-[5px] !text-[#666880]">L</InterestButton>
                    <InterestButton className="bg-[#FFBE5C] w-[32px] h-[32px] flex items-center justify-center mr-[5px]">M</InterestButton>
                    <InterestButton className="bg-[#EB5757] w-[32px] h-[32px] flex items-center justify-center mr-[5px]">H</InterestButton>
                </Box>
                <Box className="flex justify-center items-center">
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] flex items-center justify-center mr-[5px] !text-[#5C84FF]">1</InterestButton>
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] flex items-center justify-center mr-[5px] !text-[#5C84FF]">7</InterestButton>
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] flex items-center justify-center mr-[5px] !text-[#666880]">14</InterestButton>
                    <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] flex items-center justify-center mr-[5px] !text-[#666880]">30</InterestButton>
                </Box>
                <CollectionButton className="my-auto" onClick={() => setOpen(!open)}>Borrow</CollectionButton>
            </Box>
            {(open && 
            <Box className="pt-[40px] pb-[30px] px-[25px] bg-[#1B1E3D] rounded-b-[12px] grid gap-x-[20px] 2xl:gap-x-[60px] gap-y-[20px]" gridTemplateColumns={'1fr 2fr'}>
                <CollectionNameText className="mr-[36px] pl-[25px] ">Choose NFT</CollectionNameText>
                <Box className="flex flex-row justify-between cursor-pointer relative">
                    <CollectionNameText className="mr-[36px] pl-[25px] ">Choose Offer</CollectionNameText>
                    <Box className="right-[0px] top-[-12px] absolute bg-[#1B1E3D] py-[10px] pl-[22px] pr-[10px] text-[14px] text-[#666880] border border-[#666880] rounded-[12px] flex flex-col"
                    onClick={() => setDropDown(!isDropdown)}>
                        <Box className="flex items-center">
                            {value}
                            {!isDropdown ? <KeyboardArrowDownIcon fontSize="small"/> : <KeyboardArrowUpIcon fontSize="small"/>}
                        </Box>
                        <Box className="flex flex-col">
                            {
                                isDropdown &&
                                options.map((item, key) => {
                                    if(item != value)
                                        return <Box className="text-[#666880] py-[10px]" key={key} onClick={() => setValue(item)}>{item}</Box>
                                })
                            }
                        </Box>
                    </Box>
                </Box>
                <Box className="grid grid-cols-3 2xl:grid-cols-5">
                    <Box className="cursor-pointer w-auto h-auto bg-cover rounded-[6px] m-[5px] bg-center" style={{backgroundImage: `url(${item.img})`, aspectRatio : 1}} />
                    <Box className="cursor-pointer w-auto h-auto bg-cover rounded-[6px] m-[5px] bg-center" style={{backgroundImage: `url(${item.img})`, aspectRatio : 1}} />
                    <Box className="cursor-pointer w-auto h-auto bg-cover rounded-[6px] m-[5px] bg-center" style={{backgroundImage: `url(${item.img})`, aspectRatio : 1}} />
                    <Box className="cursor-pointer w-auto h-auto bg-cover rounded-[6px] m-[5px] bg-center" style={{backgroundImage: `url(${item.img})`, aspectRatio : 1}} />
                    <Box className="cursor-pointer w-auto h-auto bg-cover rounded-[6px] m-[5px] bg-center" style={{backgroundImage: `url(${item.img})`, aspectRatio : 1}} />
                    <Box className="cursor-pointer w-auto h-auto bg-cover rounded-[6px] m-[5px] bg-center" style={{backgroundImage: `url(${item.img})`, aspectRatio : 1}} />
                </Box>
                <Box className="flex flex-col">
                    <Box className="grid px-[13px] py-[13px] bg-[#111430] rounded-[12px] gap-[10px] sm:gap-[25px]" gridTemplateColumns={'1fr 2fr 2fr 1fr'}>
                        <Box className="flex">
                            <img className="mr-[5px] my-auto !h-[60px] !w-[60px] rounded-[10px]" src="/images/mint/Token.png" alt="Cash" />
                            <CollectionCashText className="my-auto cursor-pointer" style={{color : '#494D73'}}>
                                <InfoNotify content={"Pool owner : user543556"}/>
                            </CollectionCashText>
                        </Box>
                        <Box className="flex items-center justify-center">
                            <InterestText color="#FFBE5C" value={2.6}/>
                            <CollectionCashText className="ml-[5px] my-auto cursor-pointer" style={{color : '#494D73'}}>
                                <InfoNotify content={"Total Interest is 2.6% or 0.029 SOL"}/>
                            </CollectionCashText>
                        </Box>
                        <Box className="flex items-center justify-center">
                            <div className="bg-[#1B1E3D] border-none flex items-center justify-center py-[9px] px-[5px] w-full font-normal text-[14px] border rounded-[6px] !h-[32px] text-[#5C84FF]" style={{whiteSpace : 'nowrap'}}>7 days</div>
                            <CollectionCashText className="ml-[5px] my-auto cursor-pointer" style={{color : '#494D73'}}>
                                <InfoNotify content={"You will have 1 day to repay the loan"}/>
                            </CollectionCashText>
                        </Box>
                        <SolanaItem value={item.floorPrice} style={{minWidth : '80px'}}/>
                    </Box>
                </Box>
                <Box/>
                <Box className="ml-auto mt-auto">
                    <CollectionColorButton className="!font-GoodTime !w-fit" onClick={() => startBorrow()}>BORROW</CollectionColorButton>
                </Box>
            </Box>
            )}
        </Box>
    }
    else {
        return <Box className="mb-[12px]">
            <Box className={`px-[10px] pt-[10px] pb-[32px] bg-[#111430] ${classes}`}>
                <Box className="flex mb-[30px]">
                    <Box className="w-[57px] h-[57px] bg-cover" style={{backgroundImage: `url(${item.img})`}} />
                    <CollectionNameText className="ml-[15px] my-auto break-all">{item.name}</CollectionNameText>
                    <CollectionButton className="ml-auto my-auto" onClick={() => setOpen(!open)}>Borrow</CollectionButton>
                </Box>
                <Box className="grid grid-cols-2">
                    <Box className="grid grid-cols-1 gap-[15px]">
                        <CollectionTitleText className="text-center !text-[#9395AA]">Floor Price</CollectionTitleText>
                        <SolanaItem value={item.floorPrice}/>
                        <CollectionTitleText className="text-center !text-[#9395AA]">Interest</CollectionTitleText>
                        <Box className="flex justify-center items-center">
                            <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] flex items-center justify-center mr-[5px] !text-[#666880]">L</InterestButton>
                            <InterestButton className="bg-[#FFBE5C] w-[32px] h-[32px] flex items-center justify-center mr-[5px]">M</InterestButton>
                            <InterestButton className="bg-[#EB5757] w-[32px] h-[32px] flex items-center justify-center mr-[5px]">H</InterestButton>
                        </Box>
                    </Box>
                    <Box className="grid grid-cols-1 gap-[15px]">
                        <CollectionTitleText className="text-center !text-[#9395AA]">Best Offer</CollectionTitleText>
                        <SolanaItem value={item.floorPrice} style={{minWidth : '80px'}}/>
                        <CollectionTitleText className="text-center !text-[#9395AA]">Duration</CollectionTitleText>
                        <Box className="flex justify-center items-center">
                            <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] flex items-center justify-center mr-[5px] !text-[#5C84FF]">1</InterestButton>
                            <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] flex items-center justify-center mr-[5px] !text-[#5C84FF]">7</InterestButton>
                            <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] flex items-center justify-center mr-[5px] !text-[#666880]">14</InterestButton>
                            <InterestButton className="bg-[#1B1E3D] w-[32px] h-[32px] flex items-center justify-center mr-[5px] !text-[#666880]">30</InterestButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {(open && 
            <Box className="pt-[40px] pb-[30px] px-[10px] bg-[#1B1E3D] rounded-b-[12px] grid">
                <CollectionNameText className="mr-[36px] pl-[10px] mb-[20px]">Choose NFT</CollectionNameText>
                <Box className="flex flex-wrap  mb-[20px]">
                    <Box className="w-[60px] h-[60px] bg-cover rounded-[6px] m-[5px]" style={{backgroundImage: `url(${item.img})`}} />
                    <Box className="w-[60px] h-[60px] bg-cover rounded-[6px] m-[5px]" style={{backgroundImage: `url(${item.img})`}} />
                    <Box className="w-[60px] h-[60px] bg-cover rounded-[6px] m-[5px]" style={{backgroundImage: `url(${item.img})`}} />
                    <Box className="w-[60px] h-[60px] bg-cover rounded-[6px] m-[5px]" style={{backgroundImage: `url(${item.img})`}} />
                    <Box className="w-[60px] h-[60px] bg-cover rounded-[6px] m-[5px]" style={{backgroundImage: `url(${item.img})`}} />
                    <Box className="w-[60px] h-[60px] bg-cover rounded-[6px] m-[5px]" style={{backgroundImage: `url(${item.img})`}} />
                </Box>
                <Box className="flex flex-row justify-between cursor-pointer relative">
                    <CollectionNameText className="mr-[36px] pl-[10px]  mb-[20px]">Choose Offer</CollectionNameText>
                    <Box className="right-[0px] top-[-6px] absolute bg-[#1B1E3D] py-[5px] pl-[10px] pr-[5px] text-[12px] text-[#666880] border border-[#666880] rounded-[12px] flex flex-col"
                    onClick={() => setDropDown(!isDropdown)}>
                        <Box className="flex items-center">
                            {value}
                            {!isDropdown ? <KeyboardArrowDownIcon fontSize="small"/> : <KeyboardArrowUpIcon fontSize="small"/>}
                        </Box>
                        <Box className="flex flex-col">
                            {
                                isDropdown &&
                                options.map((item, key) => {
                                    if(item != value)
                                        return <Box className="text-[#666880] py-[10px]" key={key} onClick={() => setValue(item)}>{item}</Box>
                                })
                            }
                        </Box>
                    </Box>
                </Box>
                <Box className="flex flex-wrap px-[13px] py-[13px] bg-[#111430] rounded-[12px] justify-between">
                        <Box className="flex">
                            <img className="mr-[5px] my-auto !h-[36px] !w-[36px] rounded-[10px]" src="/images/mint/Token.png" alt="Cash" />
                            <CollectionCashText className="my-auto cursor-pointer" style={{color : '#494D73'}}>
                                <InfoNotify content={"Pool owner : user543556"}/>
                            </CollectionCashText>
                        </Box>
                        <Box className="flex items-center justify-center">
                            <InterestMobileText color="#FFBE5C" value={2.6}/>
                            <CollectionCashText className="ml-[5px] my-auto cursor-pointer" style={{color : '#494D73'}}>
                                <InfoNotify content={"Total Interest is 2.6% or 0.029 SOL"}/>
                            </CollectionCashText>
                        </Box>
                        <Box className="flex items-center justify-center">
                            <div className="bg-[#1B1E3D] border-none flex items-center justify-center py-[9px] px-[5px] w-full font-normal text-[14px] border rounded-[6px] !h-[32px] text-[#5C84FF]" style={{whiteSpace : 'nowrap'}}>7 days</div>
                            <CollectionCashText className="ml-[5px] my-auto cursor-pointer" style={{color : '#494D73'}}>
                                <InfoNotify content={"You will have 1 day to repay the loan"}/>
                            </CollectionCashText>
                        </Box>
                    <SolanaItem value={item.floorPrice} style={{minWidth : '80px'}}/>
                </Box>
                <Box className="flex justify-center sm:justify-end mt-[30px]">
                    <CollectionColorButton className="!font-GoodTime !w-fit">BORROW</CollectionColorButton>
                </Box>
            </Box>
            )}
        </Box>
    }
}

export default function Borrow() {
    const isDesktop = useMediaQuery('(min-width:1024px)');
    const { connection } = useConnection();
    const wallet = useWallet();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getCollectionOffers = async () => {
        const metaplex = new Metaplex(connection);
        metaplex.use(walletAdapterIdentity(wallet));

        const owner = new PublicKey(metaplex.identity().publicKey);
        const allNFTs = await metaplex.nfts().findAllByOwner({owner});
        console.log(allNFTs);

        const candyMachine = new PublicKey('7a9eMKQqRNnq4bVBurN6yYBEct9Di6Xt7beqmUKnXzTc');
        const nfts = await metaplex
        .candyMachinesV2()
        .findMintedNfts({ candyMachine });

    // const mintAddress = nfts.map(nft =>
    //   nft.name + ': ' + nft.address.toString()
    // );

        const mintAddress = nfts.map(nft => {
            if (nft.model == 'metadata') {
            return nft.name + ': ' + nft.mintAddress.toString();
            }
        });

        console.log('mintAddress =>', mintAddress);
        console.log('nfts =>', nfts);
    }

    useEffect(() => {
        if(wallet?.connected && !wallet?.disconnecting && !wallet?.connecting){
            console.log("getting collection offers");
            getCollectionOffers();
        }
        if(!wallet?.connected && !wallet?.disconnecting && !wallet?.connecting){
            console.log("formatting collection offers");
            getCollectionOffers([]);
        }
    }, [wallet])

    const showAllNft = async () => {
    }

    return <Container>
        <Box className="mt-[30px] mx-[20px] lg:mt-[60px] lg:mx-[120px] xl:mx-[240px] 2xl:mx-[360px]">
            <Box className="flex flex-row">
                <Box className="pt-[13px] sm:pt-[15px] 2xl:pt-[30px] " style={{width : '7px', height : 'auto', marginRight : '20px'}}>
                    <Box className="w-[7px] bg-[#5C84FF] rounded-[8px] h-[40px] lg:h-[80px]"/>
                </Box>
                <Box className="flex flex-col">
                    <LandingHeaderText className="!font-GoodTime">
                        Borrow SOL
                    </LandingHeaderText>
                    <LandingCaptionText className="mb-[40px] lg:mb-[60px] xl:mb-[80px] 2xl:mb-[100px]" style={{color : '#9395AA'}}>
                        Use your NFTs as collateral to instantly loan SOL. <br/>
                        Your NFT will be locked in your wallet until the loans is repaid, If you fail to <br/>
                        repay your loan on time, you may lose ownership of the NFT you<br/>
                        borrowed against.
                    </LandingCaptionText>
                </Box>
            </Box>
            {
                isDesktop &&
                <Box className="hidden lg:grid px-[26px] gap-[5px] 2xl:gap-[10px]" gridTemplateColumns={'80px 96px 30fr 20fr 40fr 40fr 20fr'}>
                    <CollectionItemText className="my-auto text-center !text-[#9395AA]">Collection</CollectionItemText>
                    <CollectionNameText className="my-auto break-all !text-[#9395AA]"></CollectionNameText>
                    <CollectionItemText className="my-auto break-all text-center !text-[#9395AA]" style={{whiteSpace : 'nowrap'}}>Floor Price</CollectionItemText>
                    <CollectionItemText className="my-auto break-all text-center !text-[#9395AA]" style={{whiteSpace : 'nowrap'}}>Best Offer</CollectionItemText>
                    <CollectionItemText className="my-auto break-all text-center !text-[#9395AA]">Interest</CollectionItemText>
                    <CollectionItemText className="my-auto break-all text-center !text-[#9395AA]">Duration</CollectionItemText>
                    <CollectionButton className="invisible">Lend</CollectionButton>
                </Box>
            }
            <Box className="mb-[26px]" />
            {
                items.map((item, i) => {
                    return <BorrowItem item={item} key={i} />
                })
            }
        </Box>
    </Container>;
}