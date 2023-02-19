
import { Box } from "@mui/material";

import styled from "styled-components";

export const ButtonText = styled(Box)`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    /* identical to box height, or 78% */

    @media (max-width: 1535px) {
        font-size: 10px;
        line-height: 10px;
    }

    color: #FFFFFF;
`

export const NavText = styled('div')`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 14px;
    /* identical to box height, or 78% */

    color: #FFFFFF;

    @media (max-width: 1535px) {
        font-size: 12px;
        line-height: 10px;
    }
    
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const NavTextActive = styled(NavText)`
    font-weight: 700;
`

export const LandingHeaderText = styled('div')`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 100px;
    line-height: 120px;
    /* or 120% */

    @media (max-width: 1535px) {
        font-size: 67px;
        line-height: 80px;
    }

    @media (max-width: 768px) {
        font-size: 44px;
        line-height: 55px;
    }

    color: #FFFFFF;
`

export const LandingCaptionText = styled('div')`
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 29px;

    @media (max-width: 1535px) {
        font-size: 14px;
        line-height: 22px;
    }

    color: #FFFFFF;
`

export const OperateHeaderText = styled('div')`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 85px;
    /* identical to box height, or 304% */

    @media (max-width: 768px) {
        font-size: 14px;
        line-height: 85px;
    }

    color: #D9D9D9;
`;

export const OperateCaptionText = styled('div')`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    /* identical to box height */

    @media (max-width: 1535px) {
        font-size: 14px;
        line-height: 20px;
    }

    text-align: center;


    color: #FFFFFF;
`;

export const ShareJoinText = styled('div')`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 42px;
    /* identical to box height */

    text-transform: uppercase;

    @media (max-width: 1535px) {
        font-size: 18px;
        line-height: 27px;
    }

    color: #5C6AE1;
`;

export const ShareHeaderText = styled('div')`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 68px;
    line-height: 85px;
    /* or 125% */

    @media (max-width: 1535px) {
        font-size: 44px;
        line-height: 55px;
    }


    color: #FFFFFF;
`;

export const ShareCaptionText = styled('div')`
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;

    @media (max-width: 1535px) {
        font-size: 14px;
        line-height: 22px;
    }

    color: #C2C2C2;
`;

export const ShareItemTitle = styled('div')`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    /* identical to box height, or 14px */

    text-transform: uppercase;

    @media (max-width: 1535px) {
        font-size: 10px;
    }

    color: #5C6AE1;
`;

export const ShareItemHeader = styled('div')`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 42px;
    /* identical to box height */

    font-feature-settings: 'calt' off;

    @media (max-width: 1535px) {
        font-size: 18px;
        line-height: 28px;
    }

    color: #FFFFFF;
`;

export const ShareItemCaption = styled('div')`
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    font-feature-settings: 'calt' off;

    @media (max-width: 1535px) {
        font-size: 10px;
        line-height: 14px;
    }

    color: #C2C2C2;
`;

export const FooterCaption = styled('div')`
    font-family: 'Axiforma';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 32px;
    /* or 229% */

    @media (max-width: 1535px) {
        font-size: 10px;
        line-height: 22px;
    }

    letter-spacing: 0.05em;

    color: #FFFFFF;
`;

export const FooterTitle = styled('div')`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    /* identical to box height, or 14px */

    @media (max-width: 1535px) {
        font-size: 10px;
    }

    text-transform: capitalize;

    color: #5C6AE1;
`;

export const MintPriceText = styled('div')`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height */

    font-feature-settings: 'calt' off;

    @media (max-width: 1535px) {
        font-size: 10px;
        line-height: 16px;
    }

    color: #FFFFFF;
`;

export const MintPriceValue = styled('div')`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 21px;
    line-height: 32px;
    /* identical to box height */

    @media (max-width: 1535px) {
        font-size: 14px;
        line-height: 22px;
    }

    font-feature-settings: 'calt' off;

    color: #FFFFFF;
`;

export const MintTotalValue = styled('div')`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 42px;
    /* identical to box height */

    @media (max-width: 1535px) {
        font-size: 18px;
        line-height: 28px;
    }

    font-feature-settings: 'calt' off;

    color: #FFFFFF;
`;