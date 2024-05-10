import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { Dispatch, SetStateAction } from "react";

interface TextAreProp {
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
}

const Textarea = styled(BaseTextareaAutosize)(
    () => `
box-sizing: border-box;
width: 320px;
font-family: 'IBM Plex Sans', sans-serif;
font-size: 0.875rem;
font-weight: 400;
line-height: 1.5;
padding: 8px 12px;
border-radius: 8px;
color: ${grey[900]};
background: ${"#fff"};
border: 1px solid ${grey[200]};
box-shadow: 0px 2px 2px ${grey[50]};

&:hover {
border-color: ${blue[400]};
}

&:focus {
border-color: ${blue[400]};
box-shadow: 0 0 0 3px ${blue[200]};
}

// firefox
&:focus-visible {
outline: 0;
}
`
);

const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
};

const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
};

export default function TextArea({ content, setContent }: TextAreProp) {
    return (
        <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ width: "100%" }}
            aria-label="post"
            minRows={10}
            placeholder="Write your post"
        />
    );
}
