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
} from "@solana/spl-token";

import MintMunNft from '../../Utility/Idl/mint_mun_nft.json';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { LandingCaptionText, MintHeaderText, SolanaItem, LandingHeaderText, MintPriceText, MintPriceValue, MintTotalValue, ShareItemHeader, MUNInput, AmountButton, ColorButton } from "../../Components";
import Container from "../Container";
import Teaser from '../../Assets/videos/Teaser.mp4';

const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const MUN_PROGRAM_ID = new anchor.web3.PublicKey(
    "9UqhCRhbAFtSd1MJhPWTHywQNQqik79qLKrJjesMKyYz"
);

const NFT_SYMBOL = "mun-nft";

const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https',apiPath: '/ipfs/api/v0' }) 

let connection = new anchor.web3.Connection(anchor.web3.clusterApiUrl("devnet"), "confirmed");

export default function Mint() {
    const [amount, setAmount] = useState("5");
    const [balance, setBalance] = useState(0);
    const [ImageFileBuffer, setImageFileBuffer] = useState(null);
    // const wallet = useAnchorWallet();

    useEffect(() => {
        if (amount === "")
            setAmount(0)
        else
            setAmount(parseInt(amount));
    }, [amount])
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const readFile = e => {
      const file = e.target.files[0]
      let reader = new FileReader();
    
      reader.onload = function(e) {
        setImageFileBuffer(Buffer(reader.result));
        console.log(reader.result);
      }
    
      reader.readAsArrayBuffer(file);
    }

    const handlePlus = () => {
        setAmount(parseInt(amount) + 1);
    }

    const handleMinus = () => {
        const intAmount = parseInt(amount);
        setAmount(intAmount > 0 ? intAmount - 1 : 0);
    }

    const { connection } = useConnection();
    const wallet = useWallet();

    const onCreate = async (values) => {
      console.log("Connection: ", connection);
      console.log("Wallet: ", wallet);
  
      let {
        name,
        description,
      } = values;
  
      let uploadedImageUrl = await uploadImageToIpfs();
      console.log(uploadedImageUrl);
      if (uploadImageToIpfs == null){
        return;
      }
      console.log("Uploaded Image url: ", uploadedImageUrl);
  
      let uploadedMetatdataUrl = await uploadMetadataToIpfs(
        name,
        NFT_SYMBOL,
        description,
        uploadedImageUrl
      );
      if (uploadedMetatdataUrl == null) return;
      console.log("Uploaded meta data url: ", uploadedMetatdataUrl);
  
      // setMinting(true);
      const result = await mint(name, NFT_SYMBOL, uploadedMetatdataUrl);
      // setMinting(false);
      // setMintSuccess(result);
    };
  
    const uploadImageToIpfs = async () => {
      // setUploading(true);
      console.log("uploading Image started");
      let uploadedImage = await ipfs.add("asdf", (error, result) => {
        console.log("IPFS result: ", result)
        if(error){
          console.log("error: ", error)
          return
        }
      })
      console.log("uploading Image finished");
      // setUploading(false);
  
      if (!uploadedImage) {
        // notification["error"]({
        //   message: "Error",
        //   description: "Something went wrong when updloading the file",
        // });
        console.log("upload Image failed");
        return null;
      }
  
      return `https://ipfs.infura.io/ipfs/${uploadedImage.path}`;
    };
  
    const uploadMetadataToIpfs = async (
      name,
      symbol,
      description,
      uploadedImage,
    ) => {
      const metadata = {
        name,
        symbol,
        description,
        Image: uploadedImage,
      };
  
      // setUploading(true);
      const uploadedMetadata = await ipfs.add(JSON.stringify(metadata));
      // setUploading(false);
  
      if (uploadedMetadata == null) {
        console.log("upload metadata failed");
        return null;
      } else {
        return `https://ipfs.infura.io/ipfs/${uploadedMetadata.path}`;
      }
    };

    const mint = async (name, symbol, metadataUrl) => {
      const accountInfo = await connection.getAccountInfo(MUN_PROGRAM_ID);
      const accountPublicKey = accountInfo.owner.toBase58();
      console.log("smart contract", accountPublicKey);
      const provider = new anchor.AnchorProvider(connection, wallet);
      anchor.setProvider(provider);
  
      const program = new Program(
        MintMunNft,
        MUN_PROGRAM_ID,
        provider
      );
      console.log("Program Id: ", program.programId.toBase58());
      console.log("Mint Size: ", MINT_SIZE);
      const lamports =
        await program.provider.connection.getMinimumBalanceForRentExemption(
          MINT_SIZE
        );
      console.log("Mint Account Lamports: ", lamports);
  
      const getMetadata = async (mint) => {
        return (
          await anchor.web3.PublicKey.findProgramAddress(
            [
              Buffer.from("metadata"),
              TOKEN_METADATA_PROGRAM_ID.toBuffer(),
              mint.toBuffer(),
            ],
            TOKEN_METADATA_PROGRAM_ID
          )
        )[0];
      };
  
      const mintKey = anchor.web3.Keypair.generate();
  
      const nftTokenAccount = await getAssociatedTokenAddress(
        mintKey.publicKey,
        provider.wallet.publicKey
      );
      console.log("NFT Account: ", nftTokenAccount.toBase58());
  
      const mint_tx = new anchor.web3.Transaction().add(
        anchor.web3.SystemProgram.createAccount({
          fromPubkey: provider.wallet.publicKey,
          newAccountPubkey: mintKey.publicKey,
          space: MINT_SIZE,
          programId: TOKEN_PROGRAM_ID,
          lamports,
        }),
        createInitializeMintInstruction(
          mintKey.publicKey,
          0,
          provider.wallet.publicKey,
          provider.wallet.publicKey
        ),
        createAssociatedTokenAccountInstruction(
          provider.wallet.publicKey,
          nftTokenAccount,
          provider.wallet.publicKey,
          mintKey.publicKey
        )
      );
      let blockhashObj = await connection.getLatestBlockhash();
      console.log("blockhashObj", blockhashObj);
      mint_tx.recentBlockhash = blockhashObj.blockhash;
  
      try {
        const signature = await wallet.sendTransaction(mint_tx, connection, {
          signers: [mintKey],
        });
        await connection.confirmTransaction(signature, "confirmed");
      } catch {
        return false;
      }
  
      console.log("Mint key: ", mintKey.publicKey.toString());
      console.log("User: ", provider.wallet.publicKey.toString());
  
      const metadataAddress = await getMetadata(mintKey.publicKey);
      console.log("Metadata address: ", metadataAddress.toBase58());
  
      try {
        const tx = program.transaction.mintNft(
          mintKey.publicKey,
          name,
          symbol,
          metadataUrl,
          {
            accounts: {
              mintAuthority: provider.wallet.publicKey,
              mint: mintKey.publicKey,
              tokenAccount: nftTokenAccount,
              tokenProgram: TOKEN_PROGRAM_ID,
              metadata: metadataAddress,
              tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
              payer: provider.wallet.publicKey,
              systemProgram: anchor.web3.SystemProgram.programId,
              rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            },
          }
        );
  
        const signature = await wallet.sendTransaction(tx, connection);
        await connection.confirmTransaction(signature, "confirmed");
        console.log("Mint Success!");
        return true;
      } catch {
        return false;
      }
    }; 

    const mintButtonClicked = (name, symbol) => {

        console.log("mint button clicked");
        try {
            // `publicKey` will be null if the wallet isn't connected
            // if (!wallet.publicKey) throw new Error('Wallet not connected!');
            // const SOL = connection.getAccountInfo(wallet.publicKey);
            // SOL.then((res) => {
                
            //     setBalance(res.lamports / LAMPORTS_PER_SOL)
            // });
          } catch (error) {
            console.log(`Signing failed: ${error?.message}`);
        }
    }
  
    return <Container>
        <Box className="mt-[30px] mx-[20px] lg:mt-[60px] lg:mx-[120px] xl:mx-[240px] 2xl:mx-[360px]">
            <Box className="flex flex-row">
                <Box className="pt-[13px] sm:pt-[15px] 2xl:pt-[30px] " style={{width : '7px', height : 'auto', marginRight : '20px'}}>
                    <Box className="w-[7px] bg-[#5C84FF] rounded-[8px] h-[60px] lg:h-[100px]"/>
                </Box>
                <Box className="flex flex-col">
                    <LandingHeaderText className="!font-GoodTime">
                        Mint
                    </LandingHeaderText>
                    <LandingCaptionText className="mb-[40px] lg:mb-[100px]" style={{color : '#9395AA'}}>
                        Join MUN by getting our NFT! <br/>
                        Please make sure you are visiting mun.tools
                    </LandingCaptionText>
                </Box>
            </Box>
            <Box className="bg-[#0B0E27] rounded-[12px] py-[10px] sm:py-[50px] text-center">
                <MintHeaderText>
                    17,448 / 22,222 Minted
                </MintHeaderText>
                <Box className="mt-[15px] xl:mt-[30px] mx-[26px] rounded-[10px] lg:mx-[180px] h-[20px] xl:h-[40px] lg:rounded-[20px] bg-[#191E46]">
                     <Box className="rounded-[20px] w-[60%] h-full" sx={{background: "linear-gradient(0deg, #A8B5E0, #A8B5E0), linear-gradient(0deg, #A8B5E0, #A8B5E0), #A8B5E0;"}} />
                </Box>
                <Box className="mx-[72px] mt-[20px] xl:mt-[40px] flex justify-center">
                    <video className={`object-cover w-[180px] lg:w-[240px] xl:w-[360px] rounded-[20px]`} loop autoPlay muted>
                      <source
                        src={Teaser}
                        type="video/mp4"
                        className={`object-cover w-full h-full rounded`}
                      />
                    </video>
                </Box>
                <Box className="mt-[20px] xl:mt-[40px] mb-[16px] lg:mb-[24px] xl:mb-[32px] flex justify-center">
                    <MintPriceText className="my-auto mr-[14px]">Mint Price</MintPriceText>
                    <SolanaItem value={1}/>
                </Box>
                <Box className="mb-[16px] lg:mb-[24px] xl:mb-[32px] flex justify-center">
                    <MintPriceText className="my-auto mr-[32px]">Choose Amount</MintPriceText>
                    <MUNInput value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <AmountButton className="ml-[11px] my-auto" onClick={handleMinus}>-</AmountButton>
                    <AmountButton className="ml-[11px] my-auto" onClick={handlePlus}>+</AmountButton>
                </Box>
                <MintTotalValue className="mb-[16px] lg:mb-[24px] xl:mb-[32px]">
                    Total: <span className="text-[#38D39C]">{amount}</span> SOL
                </MintTotalValue>
                <Box className="flex justify-center">
                    <ColorButton className="w-fit" onClick={() => /* onCreate({name : "Mun NFT", description : "This is mun nft"}) */ mint("MUN NFT", NFT_SYMBOL, "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/spl-token.json")}>
                        Mint Now
                    </ColorButton>
                </Box>
            </Box>
        </Box>
    </Container>;
}