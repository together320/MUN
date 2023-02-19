
import { Box } from "@mui/material";

import { LandingCaptionText, LandingHeaderText } from "../../Components";
import Container from "../Container";

export default function Lend() {
    return <Container>
        <Box className="mt-[30px] mx-[20px] lg:mt-[120px] lg:mx-[240px] 2xl:mx-[360px]">
            <LandingHeaderText className="mb-[10px]">
                Lend SOL
            </LandingHeaderText>
            <LandingCaptionText>
                Make lend offers against NFT’s and get interest. <br/>
                After making the lend offer, users will be able to loan SOL from <br/>
                you against their NFT, if they fail to pay on time, you will receive <br/>
                ownership of the NFT they put as collateral for the loan.
            </LandingCaptionText>
        </Box>
    </Container>;
}