import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function Board({ board }) {
  const navigate = useNavigate();
  const handleboardNavigate = () => {
    navigate(`/boards/${board.id}`, { state: { boardName: board.name } });
  };

  return (
    <Card
      onClick={handleboardNavigate}
      sx={{ minWidth: 250, margin: "1rem", cursor: "pointer" }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={
          board.prefs.backgroundImage ||
          "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698019200&semt=sph"
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {board.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
