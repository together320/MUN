
import { ButtonText } from "./MUNText";

import styled from "styled-components";

export const ColorButton = styled(ButtonText)`
    background: #5C84FF;
    border-radius: 40px;
    padding: 13px 20px;
    cursor: pointer;
`;

export const BorderButton = styled(ButtonText)`
    border: 1px solid #5C6AE1;
    border-radius: 40px;
    padding: 13px 20px;
    cursor: pointer;
`;

export function ShareButton(props) {
    return <ButtonText sx={{
        background: "#100B27",
        border: "1px solid #5C6AE1",
        borderRadius: "40px",
        padding: "13px 20px",
        cursor: "pointer",
        width: "fit-content",
        display: "flex",
    }}
    {...props}>
        {props.children}
        <span className="mr-[13px]" />
        <img src="/images/home/Vector.png" alt="Vector" />
    </ButtonText>
}