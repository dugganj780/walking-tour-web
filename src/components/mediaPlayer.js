import React, { useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ReactAudioPlayer from "react-audio-player";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Slider from "@mui/material/Slider";

export default function MediaPlayer(props) {
  const { title, city, recording } = props.props.props.props;
  const [isPlaying, setIsPlaying] = useState(false);
  const theme = useTheme();
  const player = useRef();

  const playAudio = () => {
    const audio = player.current;
    setIsPlaying(true);
    audio.volume = 1;
    audio.play();
  };

  const pauseAudio = () => {
    const audio = player.current;
    setIsPlaying(false);
    audio.pause();
  };

  const audioFunction = () => {
    if (!isPlaying) {
      playAudio();
    } else {
      pauseAudio();
    }
  };

  function PlayPauseIcon(props) {
    if (!isPlaying) {
      return <PlayArrowIcon sx={{ height: 38, width: 38 }} />;
    } else {
      return <PauseIcon sx={{ height: 38, width: 38 }} />;
    }
  }

  console.log(recording);

  return (
    <>
      <ReactAudioPlayer
        preload="metadata"
        src={recording}
        onPlay={(e) => console.log("OnPlay")}
      ></ReactAudioPlayer>
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {city}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="previous">
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton aria-label="play/pause" onClick={audioFunction}>
              <PlayPauseIcon />
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>

            <audio src={recording} ref={player}></audio>
          </Box>
          <Slider size="small" aria-label="Small" valueLabelDisplay="auto" />
        </Box>
      </Card>
    </>
  );
}
