
import { Box } from "@mui/material";

import { LandingCaptionText, LandingHeaderText } from "../../Components";
import Container from "../Container";

export default function Profile() {
    return <Container>
        <Box className="mt-[120px] mx-[360px]">
            <LandingHeaderText className="mb-[10px]">
                Profile
            </LandingHeaderText>
            <LandingCaptionText>
                Your profile is where you can preview and manage your loans.
            </LandingCaptionText>
        </Box>
    </Container>;
}