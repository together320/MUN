
import { Box } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Container(props) {
    return <Box className="bg-no-repeat bg-contain" style={{backgroundImage: `url(/images/vector.png)`}}>
        <Header />
        <Sidebar />
        {props.children}
        <div className="mb-[128px]" />
        <Footer />
    </Box>;
}