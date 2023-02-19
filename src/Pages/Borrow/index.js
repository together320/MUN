
import { Box } from "@mui/material";

import { LandingCaptionText, LandingHeaderText } from "../../Components";
import Container from "../Container";

export default function Borrow() {
    return <Container>
        <Box className="mt-[120px] mx-[360px]">
            <LandingHeaderText className="mb-[10px]">
                Borrow SOL
            </LandingHeaderText>
            <LandingCaptionText>
                Use your Nft's as collateral for short them SOL loans. <br/>
                If you fail to repay your loan, you may lose ownership on the NFT <br/>
                you borrow against.
            </LandingCaptionText>
        </Box>
    </Container>;
}