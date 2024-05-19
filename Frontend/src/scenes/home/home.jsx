import NavBar from "../navbar/navbar";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import TextArea from "../../components/TextArea";
import { setResult } from "../../state";
import { useDispatch } from "react-redux";
import SideBar from "../../components/SideBar";
import { clearState } from "../../state";
import {Divider, InputBase } from "@mui/material";
import Dropdown from "../../components/Dropdown";

const HomePage = () => {
    const [text1, setText1] = useState('Please Input your source code here');
    const [text2, setText2] = useState('');
    const [SourceCodeLanguage, setSourceCodeLanguage] = useState('Python');
    const [TargetCodeLanguage, setTargetCodeLanguage] = useState('C++');
    const dispatch = useDispatch();
    console.log(text1);
    const Compare = async () => {
        console.log("Working")
        const response = await fetch(
            "http://127.0.0.1:8000/core/",
            //"http://localhost:8000/core/",
            {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    text1: text1,
                    text2: text2,
                    sourceLanguage: SourceCodeLanguage,
                    targetLanguage: TargetCodeLanguage
                })
            }
        )
        console.log("Waiting fnished");
        const result = await response.json();
        console.log(result);
        setText2(result["text2"])
        console.log(text2)
        if(result){
            console.log("Response is returned")
            // dispatch(
            //     setResult({
            //         result:result
            //     })
            // );
        }
        else{
            console.log("Nothing returned.")
        }
    }

    const CleanData = () => {
        dispatch(
            clearState()
        );
    };

    return(
        <Box flex="1" sx={{
            backgroundColor:"#EBEAEA"
        }}>
            <NavBar/>  
            <Box
                padding="2rem 4%"
                display="flex"
                gap="1rem"
                justifyContent="space-between"
            >
                <Box sx={{
            width:"100%",
            borderRadius:"10px",
           
            margin:"0.6rem 0.6rem",
            padding:"0.6rem 0.6rem"
        }}>
                    <Dropdown selectedOption={SourceCodeLanguage} setSelectedOption={setSourceCodeLanguage} title={"Source language"}></Dropdown>
                    
                    <TextArea flexBasis="38%" textContent={text1} setText={setText1}/>
                </Box>
                
            <p></p>

            <Box sx={{
            width:"100%",
            borderRadius:"10px",
            backgroundColor:"#F4F3F3",
            margin:"0.6rem 0.6rem",
            padding:"0.6rem 0.6rem"
        }}>
            <p></p>
            
            <Dropdown selectedOption={TargetCodeLanguage} setSelectedOption={setTargetCodeLanguage} title={"Target language"}></Dropdown>
            <p></p>
            <Divider></Divider>
            <Box sx={{backgroundColor:"#F4F3F3"}}>
            <div style={{ whiteSpace: 'pre-wrap',  textAlign: 'left', padding: '10px' }}>
      {text2}
    </div>
            </Box>
            
            </Box>

            
            </Box>
            <Box sx={{alignItems:'center'}}>
                <Button sx={{backgroundColor:"#49A33D", color:"black"}} onClick={Compare}>
                    Translate
                </Button>

                {/* <Button onClick={CleanData}>
                    clean
                </Button> */}
            </Box>
            <p></p>
        </Box>
    )
};
//<Box sx={{ whiteSpace: 'pre-wrap', textAlign: 'left'}}>Generated Code</Box>
export default HomePage;